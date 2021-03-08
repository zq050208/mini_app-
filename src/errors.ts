import { Scopes } from './utils/permissions';

/**
 * 接口错误
 */
export class ApiResponseError extends Error {
  requestConfig: any;
  constructor(response: any) {
    const { data } = response;
    super(data.msg);
    this.requestConfig = response.requestConfig;
  }
}

/**
 * 网络错误
 */
export class NetWorkError extends Error {
  requestConfig: any;
  constructor(error: any) {
    super(error.errMsg || error.message);
    this.requestConfig = error.requestConfig;
  }
}

/**
 * 授权错误
 */
export class AuthorizeError extends Error {
  constructor(private scope: Scopes) {
    super(`获取授权 [scope.${Scopes[scope]}] 失败`);
  }
}
