import { gasRequest } from '@/utils/request';
import APIFactory from './factory';

const gasAPIs = APIFactory(gasRequest, {
  // 用户相关
  login: '/user/login', // 登录
  auth: {
    url: '/user/auth',
    option: {
      disabledRetry: true,
    },
  }, // 授权
  getWeixinPhone: '/user/get-weixin-phone', //获取微信手机号
  sendValidCode: '/user/send-valid-code', //发送验证码

  // 有关车辆
  plateList: '/user/vehicle/list', //获取用户车辆列表
  etcPlateList: '/user/vehicle/etc-plate-list', //获取用户etc车辆列表
  plateAdd: '/user/vehicle/add', //绑定/新增车牌
  plateDelete: '/user/vehicle/delete', //绑定/新增车牌
  plateSetETC: '/user/vehicle/set-etc', // 设置车牌为etc认证

  // 油站相关
  getStationList: '/gas/station/get-station-list', // 油站列表
  getStationDistance: '/gas/station/get-distance', // 获取油站距离
  getStationInfo: '/gas/station/get-info', // 油站详情

  //订单相关
  orderList: '/gas/order/page-list', // 订单列表
  unPaidOrderList: '/gas/order/get-unpaid-order', // 订单-获取未支付列表
  orderDetail: '/gas/order/detail', // 订单详情
  orderPay: '/gas/order/pay', // 订单支付
  orderCancel: '/gas/order/cancel', // 订单取消
  orderFeedback: '/gas/order/feedback', // 订单反馈
  orderDelete: '/gas/order/delete', // 订单删除
});

export default gasAPIs;
