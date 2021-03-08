import { AuthorizeError } from '../errors';
import Store from '@/store';

export enum Scopes {
  'userInfo',
  'userLocation',
  'userLocationBackground',
  'address',
  'invoiceTitle',
  'invoice',
  'werun',
  'record',
  'writePhotosAlbum',
  'camera',
}
type ScopesKeys = keyof typeof Scopes;
const ScopesText: {
  [p in ScopesKeys]: string;
} = {
  userInfo: '用户信息',
  userLocation: '地理位置',
  userLocationBackground: '后台定位',
  address: '通讯地址',
  invoiceTitle: '发票抬头',
  invoice: '获取发票',
  werun: '微信运动步数',
  record: '录音功能',
  writePhotosAlbum: '保存到相册',
  camera: '摄像头',
};

/**
 * 检查授权权限
 * @param scope [Scopes] 权限
 * @return
 * 如果返回false则明确已经拒绝授权，应该绕过 authorizeScope
 */
export function checkStoreAuthSetting(scope: Scopes): boolean {
  const authSetting = Store.state.auth?.authSetting ?? {};
  return !!(authSetting as any)[`scope.${Scopes[scope]}`];
}

/**
 * 检查授权权限
 * @param scope [Scopes] 权限
 * @return
 * 如果返回false则明确已经拒绝授权，应该绕过 authorizeScope
 */
export async function checkScope(scope: Scopes): Promise<boolean | void> {
  const setting = await mpx.getSetting({});
  return (setting.authSetting as any)[`scope.${Scopes[scope]}`];
}

/**
 * 发起授权
 * @param scope [Scopes] 权限
 */
export async function authorizeScope(scope: Scopes) {
  await mpx.authorize({
    scope: `scope.${Scopes[scope]}`,
  });
  return true;
}

/**
 * 打开弹窗咨询
 * @param scope 权限
 */
export async function openSettingAuthorizeScope(
  scope: Scopes,
): Promise<boolean | void> {
  return new Promise(resolve => {
    mpx.showModal({
      title: '请求授权',
      content: `为了能获得更好的体验，请打开【${
        ScopesText[Scopes[scope] as ScopesKeys]
      }】`,
      async success(res) {
        if (res.confirm) {
          const setting = await mpx.openSetting({});
          resolve((setting.authSetting as any)[`scope.${Scopes[scope]}`]);
        } else {
          resolve(false);
        }
      },
    });
  });
}

/**
 * 检查授权，如果未授权则发起授权
 * @param scope [Scopes] 权限
 */
export async function checkAndAuthorizeScope(scope: Scopes, needAsk = false) {
  let scopeStatus = await checkScope(scope);

  if (scopeStatus === false && needAsk) {
    scopeStatus = await openSettingAuthorizeScope(scope);
  }

  if (scopeStatus === false) {
    throw new AuthorizeError(scope);
  }

  if (scopeStatus === true) {
    Store.dispatch('updateAuthSetting');
    return true;
  }
  try {
    return await authorizeScope(scope);
  } catch (error) {
    if (error.errMsg?.includes('authorize:fail')) {
      if (needAsk) {
        await openSettingAuthorizeScope(scope);
      }
      throw new AuthorizeError(scope);
    } else {
      throw error;
    }
  }
}
