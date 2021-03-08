export enum OrderStatus {
  // 等待支付
  WAIT_FOR_PAY = 1,
  // 取消
  CANCEL = 2, // !用户主动取消
  // 失效
  FAILURE = 3, // !过期未付款
  // 支付中
  PAYING = 4,
  // 支付成功
  PAY_SUCCESS = 5,
  // 退款中
  REFUNDING = 7,
  // 退款成功
  REFUND_SUCCESS = 8,
  // 退款结束
  REFUND_END = 9,
  // 已完成
  COMPLETE = 10,
}
