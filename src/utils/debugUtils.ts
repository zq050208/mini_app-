import { getStorage } from './storage';
import { Keys } from '@/const';

/**
 * 判断是否已经开启了开发者模式
 */
const DEV_MODE = false;
export function isDevMode() {
  return DEV_MODE || getStorage(Keys.StorageKeys.DevMode, true);
}
