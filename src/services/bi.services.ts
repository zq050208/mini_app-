/* eslint-disable @typescript-eslint/camelcase */
import { biRequest } from '@/utils/request';
import { GAS_BI } from '@/types';
import { getSystemInfo } from '@/utils/system';
import { singletonPromiseCurry } from '@/utils/singletonGet';
import Store from '@/store';
import { watch } from '@mpxjs/core/src/observer/watch';

let installed = false;

let basicInfo: GAS_BI.BIStateSystemInfo | undefined;
let networkType: string | undefined;
let sessionId: string | undefined;

let isWatchStore = false;

const PendingQueue: GAS_BI.BIStatParam[] = [];
const DataQueue: GAS_BI.BIPostData[] = [];

const COMMON_PARAMS = {
  mina_version: process.env.VERSION,
};

/**
 * 获取系统信息
 */
function resolveSystemInfo(): GAS_BI.BIStateSystemInfo {
  const systemInfo = getSystemInfo();
  return {
    brand: systemInfo.brand,
    phone_model: systemInfo.model,
    weixin_version: systemInfo.version,
    system: systemInfo.system,
    platform: systemInfo.platform,
    sdk_version: systemInfo.SDKVersion,
    network_type: 'unknown',
  };
}

/**
 * 监听网络变化
 */
const handlerNetworkChange = function(res: { networkType: string }) {
  networkType = res.networkType || 'unknown';
};

/**
 * 获取网络
 */
const resolveNetworkType = singletonPromiseCurry(async function() {
  const networkTypeRes = await mpx.getNetworkType();
  networkType = networkTypeRes.networkType || 'unknown';
  mpx.onNetworkStatusChange(handlerNetworkChange);
  return networkType;
});

/**
 * 获取埋点基本信息
 */
async function resolveBasicInfo() {
  if (basicInfo && basicInfo.network_type !== 'unknown') return basicInfo;
  const info = resolveSystemInfo();
  const networkTYpe = await resolveNetworkType();
  info.network_type = networkTYpe;
  basicInfo = info;
  return basicInfo;
}

/**
 * 监听Store的Token值变化
 */
function watchStore() {
  if (isWatchStore) return;
  isWatchStore = true;
  const unwatch = watch(
    () => {
      return Store.state.auth!.openId;
    },
    () => {
      if (Store.state.auth!.openId) {
        unwatch();
        const queue = PendingQueue.slice();
        PendingQueue.length = 0;
        isWatchStore = false;
        queue.map(param => {
          postBIData(param);
        });
      }
    },
  );
}

/**
 * 上报埋点
 */
async function postBIData(param: GAS_BI.BIStatParam) {
  const userOpenId = Store.state.auth?.openId;

  // 如果未初始化到openId，
  // 将参数暂存到 Pending 队列
  // 监听 store的变化
  if (!userOpenId) {
    watchStore();
    PendingQueue.push(param);
    return;
  }

  if (!basicInfo) {
    await resolveBasicInfo();
  }
  if (!sessionId) {
    sessionId = userOpenId + '' + new Date().getTime();
  }

  const data: GAS_BI.BIPostData = {
    ...param,
    ...basicInfo,
    open_id: userOpenId,
    session_id: sessionId,
  };

  DataQueue.push(data);
  if (
    (data.action_id == 214 && data.event_id == 1000000) ||
    DataQueue.length >= 10
  ) {
    const dataArray = DataQueue.slice();
    DataQueue.length = 0;

    biRequest('POST', '/', {
      data: {
        data: dataArray,
        common_args: {},
      },
    });
  }
}

function stat(param: GAS_BI.BIStatParam, pages = '/') {
  // biRequest.post();
  param['event_type_id'] = param['event_type_id'] || 3;
  param['action_id'] = param['action_id'] || 202;

  const data = {
    ...COMMON_PARAMS,
    pages,
    pages_timestamp: new Date().getTime() + '',
    ...param,
  };
  postBIData(data);
}

const DEBUG_MODE = true;

export default {
  stat,
  install(target: typeof mpx) {
    if (installed) return;
    installed = true;
    target.mixin(
      {
        onShow() {
          stat({
            pages: (this as any).__route__,
            event_type_id: 2,
            action_id: 201,
          });
          if (DEBUG_MODE) {
            logger.log(`BILOG 进入：${(this as any).__route__}`);
          }
        },
        onHide() {
          stat({
            pages: (this as any).__route__,
            event_type_id: 2,
            action_id: 214,
          });
          if (DEBUG_MODE) {
            logger.log(`BILOG 离开：${(this as any).__route__}`);
          }
        },
      },
      'page',
    );
  },
};
