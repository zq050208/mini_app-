/* eslint-disable no-undef */
/* eslint-disable no-redeclare */

import Mpx, { createStore } from '@mpxjs/core';
import Logger from '@/logger';

export type PageMixinOption = Parameters<typeof Mpx.createPage>[0];

declare global {
  const mpx: typeof Mpx;
  const logger: typeof Logger;
}

declare module '@mpxjs/core/@types/index' {
  interface MpxComponentIns {
    $store: ReturnType<typeof createStore>;
    _data: IAnyObject; // 不响应的数据
  }
  interface Mpx {
    toast(message: string): Promise<any>;
    loading(message: string): Promise<any>;
  }
}
