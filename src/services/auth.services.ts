import { Keys } from '@/const';
import gasAPIs from '@/apis/gas.apis';
import { getStorage, setStorage } from '@/utils/storage';
import { validPhoneNumber } from '@/utils/valid';
import assert from 'assert';

export default {
  /**
   * 发送手机号码
   * @param phone 手机号码
   */
  async sendPhoneValidCode(phone: string) {
    assert(validPhoneNumber(phone), '手机号码格式不正确');
    gasAPIs.sendValidCode({ phone });
  },
  /**
   * 解密用户手机号码信息
   */
  async decodeUserPhoneNumberEncryptedData(data: any) {
    /*  const loginRes = await mpx.login();
    const { code } = loginRes;
    data.code = code; */
    const apiRes = await gasAPIs.getWeixinPhone(data);
    return apiRes;
  },
  /**
   * 授权用户信息
   */
  async accreditUserInfo(userInfo: any) {
    return gasAPIs.auth(userInfo);
  },
  /**
   * 获取Token
   */
  async getTokenAndUserInfo(): Promise<any> {
    const loginRes = await mpx.login();
    const { code } = loginRes;
    const apiRes = await gasAPIs.login({
      code,
    });
    return apiRes;
  },
  getTokenStorage(sync?: boolean) {
    return getStorage(Keys.StorageKeys.Token, sync);
  },
  getIsAuthStorage(sync?: boolean) {
    return getStorage(Keys.StorageKeys.IsAuth, sync);
  },
  getOpenIdStorage(sync?: boolean) {
    return getStorage(Keys.StorageKeys.OpenId, sync);
  },
  saveTokenStorage(token: string | undefined) {
    return setStorage(Keys.StorageKeys.Token, token);
  },
  saveIsAuthStorage(isAuth: boolean | undefined) {
    return setStorage(Keys.StorageKeys.IsAuth, isAuth);
  },
  saveOpenIdStorage(openId: string | undefined) {
    return setStorage(Keys.StorageKeys.OpenId, openId);
  },
};
