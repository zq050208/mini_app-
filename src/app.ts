import 'regenerator-runtime/runtime';
import mpx from '@mpxjs/core';

import apiProxy from '@mpxjs/api-proxy';

import store, { install as installStore } from './store';
import { checkStorageEnv } from './utils/guard';
import './utils/extendMpx';
import biService from '@/services/bi.services';

// promiseify
mpx.use(apiProxy, {
  usePromise: true,
  blackList: ['getMenuButtonBoundingClientRect'],
});

// 定义 store
mpx.use(installStore, store);

// 定义私有属性
mpx.mixin({
  created(this: IAnyObject) {
    this._data = {};
  },
});

// 埋点
mpx.use(biService);

// 初始化store
store.dispatch('init');

App({
  onLaunch() {
    // 检查缓存的环境是否一致
    checkStorageEnv();
    biService.stat({ event_id: 1000000, action_id: 203, event_type_id: 2 });
  },
  onHide() {
    biService.stat({ event_id: 1000000, action_id: 214, event_type_id: 2 });
  },
  // onShow(res) {
  //   if (res.scene === 1038) { // 场景值1038：从被打开的小程序返回
  //     const { appId, extraData } = res.referrerInfo
  //     if (appId == 'wxbd687630cd02ce1d') { // appId为wxbd687630cd02ce1d：从签约小程序跳转回来
  //         if (typeof extraData == 'undefined'){
  //             // TODO
  //             // 客户端小程序不确定签约结果，需要向商户侧后台请求确定签约结果
  //             return;
  //         }
  //         if(extraData.return_code == 'SUCCESS'){
  //           console.log("SUCCESS")
  //             // TODO
  //             // 客户端小程序签约成功，需要向商户侧后台请求确认签约结果
  //             var contract_id = extraData.contract_id
  //             return;
  //         } else {
  //             console.log("签约失败")
  //             // TODO
  //             // 签约失败
  //             return;
  //         }
  //     }
  // }
// }
});

export function getStore() {
  return store;
}
