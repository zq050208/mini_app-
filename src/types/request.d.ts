/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { xfetch } from '@mpxjs/fetch';

declare global {
  namespace RequestTypes {
    type fetch = xfetch['fetch'];

    type APIResponseData = {
      code: number;
      data: any;
      msg: string;
    };

    export type FetchOption = Parameters<fetch>[0] & {
      requestTimes?: number; // 请求次数
      disabledRetry?: boolean; // 禁止发起重试
    };

    export type RequestOption = Omit<FetchOption, 'url' | 'method'>;

    export type RequestReturnType = ReturnType<fetch>;

    type ResponseType = WechatMiniprogram.RequestSuccessCallbackResult & {
      requestConfig: FetchOption;
      data: APIResponseData;
    };

    type RequestMethodFunctionType = (
      url: string,
      option: RequestOption,
    ) => RequestReturnType;

    interface RequestType {
      (
        method: FetchOption['method'],
        url: string,
        option?: RequestOption,
      ): RequestReturnType;
      post: RequestMethodFunctionType;
      get: RequestMethodFunctionType;
      formPost: RequestMethodFunctionType;
    }
  }
}
