import routerFactory, { NavigateTypes, typeGuard } from './utils/routerFactory';
import Url from '@/utils/url';

export function webviewPath(path: string): string {
  const webviewPath = '/pages/webview';
  // const h5Url = Url.join('http://127.0.0.1:8080', path);

  const h5Url = /^https:\/\/.*/.test(path)
    ? path
    : Url.join(process.env.APEX_H5_BASE_URL, path);
  return webviewPath + '?src=' + encodeURIComponent(h5Url);
}

const route = typeGuard({
  // 首页
  toHome: {
    url: '/pages/home',
    type: NavigateTypes.switch,
  },
  toStationList: '/pages/station/station-list', // 油站列表
  toStationDetail: '/pages/station/station-detail', // 油站详情
  toApply: '/pages/apply/apply', // 开通车辆 or 新增车辆
  toApplyCertification: '/pages/apply/apply-certification', // 认证
  toAddPlate: '/pages/sign/sign', //已经开通免密支付 去添加车牌
  toSignNoPwdPay: '/pages/sign/toSign', //已经开通免密支付 去添加车牌
  toPlateList: '/pages/plates/plate-list', // 车辆管理
  toOrderList: '/pages/order/order-list', // 订单列表
  toOrderDetail: '/pages/order/order-detail', // 订单列表
  toLogin: '/pages/user/login', // 登录
  toDebug: '/pages/debug', // debug配置
  toRightsCenter: webviewPath('/gas/right-center.html'), // 权益中心
  toCustomerServices: webviewPath('/gas/customer-services.html#/'), // 客服中心
});

const router = routerFactory(route);

export default router;
