import mpxFetch, { xfetch } from '@mpxjs/fetch';
import Url from '@/utils/url';
import { NetWorkError, ApiResponseError } from '../errors';
import store from '@/store';
import { Keys } from '@/const';
import { hasKeys } from '@/utils/types';
import { delay } from '@/utils/common';
const Fetch = mpxFetch.XFetch;

const baseFetchInstance = (new Fetch({}) as unknown) as xfetch;

function fetchFactory(baseUrl = '') {
  const fetchInstance = baseFetchInstance.create();

  function handlerRequest(config: RequestTypes.FetchOption) {
    if (config.requestTimes && config.requestTimes > 5) {
      throw new Error('请求重试超过上限，系统不可用或登录失败');
    }
    config.requestTimes = (config.requestTimes || 0) + 1;
    if (baseUrl && !Url.isAbsoluteUrl(config.url)) {
      config.url = Url.join(baseUrl, config.url);
    }
    config.header = config.header || {};
    config.header['X-APP-TOKEN'] =
      store.state.auth?.token || mpx.getStorageSync(Keys.StorageKeys.Token);
    return config;
  }

  async function haddlerResponse(response: RequestTypes.ResponseType) {
    const { data, statusCode, errMsg, requestConfig } = response;
    if (process.env.NODE_ENV !== 'production') {
      logger.log(
        `请求：${requestConfig.url}\n`,
        `返回：[${statusCode}]\n`,
        data,
        requestConfig,
      );
    }
    if (statusCode >= 400) {
      throw new NetWorkError(errMsg);
    }

    if (typeof data === 'string') {
      return data;
    }

    if (data.code === 0) {
      // 如果存在分页数据
      if (hasKeys(data, 'pageNum', 'pageSize')) {
        return data;
      } else {
        return data.data;
      }
    } else if (data.code === -1000) {
      await store.dispatch('reLogin');
      // 如果禁止重试
      if (requestConfig.disabledRetry) {
        return Promise.reject(new ApiResponseError(response));
      }
      await delay(1000);
      return fetchInstance.fetch(requestConfig);
    } else {
      return Promise.reject(new ApiResponseError(response));
    }
  }

  fetchInstance.interceptors.request.use(handlerRequest);
  fetchInstance.interceptors.response.use(haddlerResponse);

  return fetchInstance;
}

function requestFactory(baseUrl = ''): RequestTypes.RequestType {
  const fetchInstance = fetchFactory(baseUrl);

  function request(
    method: RequestTypes.FetchOption['method'],
    url: string,
    option: RequestTypes.RequestOption,
  ) {
    const _option: RequestTypes.FetchOption = {
      url,
      method,
      ...option,
    };

    if (!_option.method) {
      _option.method = 'POST';
    }

    if (
      _option.method.toLocaleUpperCase() === 'GET' &&
      !_option.params &&
      _option.data &&
      typeof _option.data === 'object'
    ) {
      _option.params = _option.data;
    }

    // const cancelToken = new fetchInstance.CancelToken();
    // option.cancelToken = cancelToken.token;

    const prom = fetchInstance.fetch(_option).catch(error => {
      logger.error(error);
      if (error instanceof ApiResponseError) {
        throw error;
      } else {
        throw new NetWorkError(error);
      }
    });
    // prom.cancel = function cancelRequest(msg: string) {
    //   cancelToken.exec(msg);
    // };
    return prom;
  }

  request.post = request.bind(request, 'POST');

  request.formPost = function requestFormPost(
    url: string,
    option: RequestTypes.RequestOption = {},
  ) {
    return request('POST', url, {
      ...option,
      emulateJSON: true,
    });
  };

  request.get = request.bind(request, 'GET');

  return request;
}

export const gasRequest = requestFactory(process.env.GAS_BASE_URL);
export const biRequest = requestFactory(process.env.BI_BASE_URL);
