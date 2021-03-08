import { Scopes, checkAndAuthorizeScope } from '@/utils/permissions';
import { AuthorizeError } from '@/errors';

/**
 * 获取ww
 */
export async function getLocation() {
  const hasScope = await checkAndAuthorizeScope(Scopes.userLocation, true);
  if (hasScope) {
    const res = await mpx.getLocation({});
    return res;
  } else {
    return Promise.reject(new AuthorizeError(Scopes.address));
  }
}
