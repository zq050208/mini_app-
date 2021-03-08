import { Keys } from '@/const';
import { getStorage, setStorage } from './storage';
import router from '@/router';
import { NavigateTypes } from './routerFactory';
import store from '@/store';
/**
 * 检查缓存环境是否正确
 */
export async function checkStorageEnv() {
  const storageEnv = await getStorage(Keys.StorageKeys.Env);
  if (storageEnv && storageEnv !== process.env.NODE_ENV) {
    const confirmRes = await mpx.showModal({
      title: '开发者通知',
      content:
        '缓存数据的环境与当前使用的环境不一致，可能会导致出现错误，是否清空所有缓存？',
    });
    if (confirmRes.confirm) {
      await mpx.clearStorage();
      router.toHome({
        type: NavigateTypes.reLaunch,
      });
      setStorage(Keys.StorageKeys.Env, process.env.NODE_ENV);
      store.dispatch('init');
    }
  } else {
    setStorage(Keys.StorageKeys.Env, process.env.NODE_ENV);
  }
}
