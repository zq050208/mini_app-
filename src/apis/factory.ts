export type APIObjectValueType =
  | string
  | {
      url: string;
      method?: WechatMiniprogram.RequestOption['method'];
      option?: RequestTypes.RequestOption;
    };
export type APIObject = Record<string, APIObjectValueType>;

type RequestOptionData = WechatMiniprogram.RequestOption['data'];

type APIFactoryResult<APIS extends APIObject> = {
  [k in keyof APIS]: (R?: RequestOptionData) => Promise<any>;
};

export default function apiFactory<S extends APIObject>(
  request: RequestTypes.RequestType,
  APIS: S,
): APIFactoryResult<S> {
  const result: Record<string, any> = {};
  for (const apiName in APIS) {
    const api = APIS[apiName] as APIObjectValueType;

    if (typeof api === 'string') {
      result[apiName] = function(data?: RequestOptionData) {
        return request('POST', api, { data });
      };
    } else if (typeof api === 'object') {
      result[apiName] = function(data?: RequestOptionData) {
        const option = Object.assign({}, api.option);
        if (data) {
          option.data = data;
        }
        return request(api.method || 'POST', api.url, option);
      };
    }
  }

  return result as APIFactoryResult<S>;
}
