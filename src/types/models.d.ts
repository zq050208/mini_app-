/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取微信手机号↗](http://yapi.golcer.cn/project/182/interface/api/3856) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/get-weixin-phone`
 * @更新时间 `2020-04-23 15:40:33`
 */
export interface UserGetWeixinPhoneRequest {
  rawData: string
  /**
   * wx.login()返回code
   */
  code: string
  encryptedData: string
  iv: string
  signature: string
}

/**
 * 接口 [获取微信手机号↗](http://yapi.golcer.cn/project/182/interface/api/3856) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/get-weixin-phone`
 * @更新时间 `2020-04-23 15:40:33`
 */
export interface UserGetWeixinPhoneResponse {
  /**
   * 手机号
   */
  phone: string
  /**
   * 手机号签名
   */
  phoneSign: string
}

/**
 * 接口 [发送验证码↗](http://yapi.golcer.cn/project/182/interface/api/3850) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/send-valid-code`
 * @更新时间 `2020-04-21 16:47:22`
 */
export interface UserSendValidCodeRequest {
  /**
   * 手机号
   */
  phone: string
}

/**
 * 接口 [发送验证码↗](http://yapi.golcer.cn/project/182/interface/api/3850) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/send-valid-code`
 * @更新时间 `2020-04-21 16:47:22`
 */
export interface UserSendValidCodeResponse {
  code?: number
  msg?: string
}

/**
 * 接口 [权益-使用明细↗](http://yapi.golcer.cn/project/182/interface/api/4015) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/use-detail`
 * @更新时间 `2020-04-24 10:57:23`
 */
export interface GasRightUseDetailRequest {
  /**
   * 车牌号
   */
  plateNo: string
  /**
   * 权益id
   */
  rightId: number
  pageNo?: string
  pageSize?: string
}

/**
 * 接口 [权益-使用明细↗](http://yapi.golcer.cn/project/182/interface/api/4015) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/use-detail`
 * @更新时间 `2020-04-24 10:57:23`
 */
export type GasRightUseDetailResponse = {
  /**
   * 油站名称
   */
  stationName: string
  /**
   * 使用时间
   */
  createTime: string
  /**
   * 使用量
   */
  useCapacity: number
  /**
   * 剩余量（-1为不限量，隐藏）
   */
  availableCapacity: number
}[]

/**
 * 接口 [权益-列表↗](http://yapi.golcer.cn/project/182/interface/api/4006) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/list`
 * @更新时间 `2020-04-24 10:57:19`
 */
export interface GasRightListRequest {
  /**
   * 车牌号
   */
  plateNo: string
}

/**
 * 接口 [权益-列表↗](http://yapi.golcer.cn/project/182/interface/api/4006) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/list`
 * @更新时间 `2020-04-24 10:57:19`
 */
export interface GasRightListResponse {
  /**
   * 基础权益
   */
  baseRight: {
    /**
     * 权益id
     */
    rightId?: number
    /**
     * 权益名称
     */
    rightName?: string
    /**
     * 是否已领取
     */
    status?: number
    /**
     * 累积使用
     */
    usedCapacity?: number
    /**
     * 累积节省
     */
    discountAmount?: number
  }
  /**
   * 已领取权益（暂未实现）
   */
  ownedRight?: null
  /**
   * 待领取权益（暂未实现）
   */
  unclaimedRight?: null
}

/**
 * 接口 [权益-详情↗](http://yapi.golcer.cn/project/182/interface/api/4009) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/detail`
 * @更新时间 `2020-04-24 10:57:20`
 */
export interface GasRightDetailRequest {
  /**
   * 车牌
   */
  plateNo: string
  /**
   * 权益id
   */
  rightId: number
}

/**
 * 接口 [权益-详情↗](http://yapi.golcer.cn/project/182/interface/api/4009) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/detail`
 * @更新时间 `2020-04-24 10:57:20`
 */
export interface GasRightDetailResponse {
  id?: number
  /**
   * 权益名称
   */
  rightName?: string
  /**
   * 权益图片
   */
  rightImg?: null
  /**
   * 权益banner图
   */
  rightBanner?: null
  /**
   * 权益描述
   */
  description?: null
  /**
   * 是否领取
   */
  hasClaimed?: number
}

/**
 * 接口 [权益-领取↗](http://yapi.golcer.cn/project/182/interface/api/4012) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/get`
 * @更新时间 `2020-04-24 10:57:21`
 */
export interface GasRightGetRequest {
  /**
   * 车牌
   */
  plateNo: string
  /**
   * 权益id
   */
  rightId: number
}

/**
 * 接口 [权益-领取↗](http://yapi.golcer.cn/project/182/interface/api/4012) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/right/get`
 * @更新时间 `2020-04-24 10:57:21`
 */
export type GasRightGetResponse = string

/**
 * 接口 [油站列表↗](http://yapi.golcer.cn/project/182/interface/api/3994) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/station/get-station-list`
 * @更新时间 `2020-04-23 18:02:00`
 */
export interface GasStationGetStationListRequest {
  /**
   * 纬度
   */
  latitude: number
  /**
   * 经度
   */
  longitude: number
  /**
   * 油号 example: 92
   */
  oilNo: string
  /**
   * 1距离优先2价格优先
   */
  sort?: string
  /**
   * 精度 公里
   */
  precision?: string
}

/**
 * 接口 [油站列表↗](http://yapi.golcer.cn/project/182/interface/api/3994) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/station/get-station-list`
 * @更新时间 `2020-04-23 18:02:00`
 */
export type GasStationGetStationListResponse = {
  id: number
  address: string
  distance: number
  city: string
  actualUnitPrice: number
  latitude: number
  oilName: string
  province: string
  countryUnitPrice: number
  stationUnitPrice: number
  name: string
  logo: string
  oilNo: string
  longitude: number
}[]

/**
 * 接口 [油站详情↗](http://yapi.golcer.cn/project/182/interface/api/4000) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/station/get-info`
 * @更新时间 `2020-04-23 18:07:26`
 */
export interface GasStationGetInfoRequest {
  stationId?: number
}

/**
 * 接口 [油站详情↗](http://yapi.golcer.cn/project/182/interface/api/4000) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/station/get-info`
 * @更新时间 `2020-04-23 18:07:26`
 */
export interface GasStationGetInfoResponse {
  /**
   * 油站id
   */
  id?: number
  longitude?: number
  latitude?: number
  geoCode?: string
  /**
   * 油站名称
   */
  name?: string
  /**
   * 油站图片
   */
  logo?: string
  /**
   * 省份
   */
  province?: string
  /**
   * 城市
   */
  city?: string
  /**
   * 地址
   */
  address?: string
  /**
   * 油号列表
   */
  oilList?: {
    /**
     * 油号
     */
    oilCode: string
    /**
     * 国标价
     */
    countryPrice: number
    /**
     * 挂牌价
     */
    stationPrice: number
    /**
     * 优惠价
     */
    actualPrice: number
  }[]
}

/**
 * 接口 [登录↗](http://yapi.golcer.cn/project/182/interface/api/3841) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/login`
 * @更新时间 `2020-04-21 16:47:19`
 */
export interface UserLoginRequest {
  /**
   * 微信wx.login()返回code
   */
  code: string
}

/**
 * 接口 [登录↗](http://yapi.golcer.cn/project/182/interface/api/3841) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/login`
 * @更新时间 `2020-04-21 16:47:19`
 */
export interface UserLoginResponse {
  /**
   * 登录标识
   */
  token: string
  /**
   * 是否需要授权（0否 1是）
   */
  auth: number
}

/**
 * 接口 [绑定\/新增车牌↗](http://yapi.golcer.cn/project/182/interface/api/3865) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/add`
 * @更新时间 `2020-04-23 15:41:35`
 */
export interface UserVehicleAddRequest {
  /**
   * 车牌号
   */
  plateNo: string
  /**
   * 验证码
   */
  validCode?: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 手机号签名
   */
  phoneSign?: string
}

/**
 * 接口 [绑定\/新增车牌↗](http://yapi.golcer.cn/project/182/interface/api/3865) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/add`
 * @更新时间 `2020-04-23 15:41:35`
 */
export interface UserVehicleAddResponse {
  code?: number
  msg?: string
}

/**
 * 接口 [获取当前登录用户信息↗](http://yapi.golcer.cn/project/182/interface/api/3847) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/user-info`
 * @更新时间 `2020-04-21 16:47:21`
 */
export interface UserUserInfoRequest {}

/**
 * 接口 [获取当前登录用户信息↗](http://yapi.golcer.cn/project/182/interface/api/3847) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/user-info`
 * @更新时间 `2020-04-21 16:47:21`
 */
export interface UserUserInfoResponse {
  id: string
  nickName: string
  phone: string
  gender: string
  avatarUrl: string
}

/**
 * 接口 [授权↗](http://yapi.golcer.cn/project/182/interface/api/3844) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/auth`
 * @更新时间 `2020-04-21 16:47:20`
 */
export interface UserAuthRequest {
  rawData: string
  encryptedData: string
  iv: string
  signature: string
}

/**
 * 接口 [授权↗](http://yapi.golcer.cn/project/182/interface/api/3844) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/auth`
 * @更新时间 `2020-04-21 16:47:20`
 */
export interface UserAuthResponse {
  id: string
  nickName: string
  phone: string
  gender: string
  avatarUrl: string
}

/**
 * 接口 [获取油站距离↗](http://yapi.golcer.cn/project/182/interface/api/3997) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/station/get-distance`
 * @更新时间 `2020-04-23 18:03:31`
 */
export interface GasStationGetDistanceRequest {
  latitude: number
  longitude: number
  /**
   * 油站id
   */
  stationId: number
}

/**
 * 接口 [获取油站距离↗](http://yapi.golcer.cn/project/182/interface/api/3997) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/station/get-distance`
 * @更新时间 `2020-04-23 18:03:31`
 */
export interface GasStationGetDistanceResponse {
  /**
   * 距离 公里
   */
  distance?: number
}

/**
 * 接口 [获取用户etc车辆列表↗](http://yapi.golcer.cn/project/182/interface/api/3862) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/etc-plate-list`
 * @更新时间 `2020-04-21 17:49:33`
 */
export interface UserVehicleEtcPlateListRequest {}

/**
 * 接口 [获取用户etc车辆列表↗](http://yapi.golcer.cn/project/182/interface/api/3862) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/etc-plate-list`
 * @更新时间 `2020-04-21 17:49:33`
 */
/**
 * 车牌列表
 */
export type UserVehicleEtcPlateListResponse = string[]

/**
 * 接口 [订单-列表↗](http://yapi.golcer.cn/project/182/interface/api/4018) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/page-list`
 * @更新时间 `2020-04-26 14:04:06`
 */
export interface GasOrderPageListRequest {
  /**
   * 车牌号
   */
  plateNo?: string
  pageNo?: number
  pageSize?: number
}

/**
 * 接口 [订单-列表↗](http://yapi.golcer.cn/project/182/interface/api/4018) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/page-list`
 * @更新时间 `2020-04-26 14:04:06`
 */
export type GasOrderPageListResponse = {
  /**
   * 订单号
   */
  orderSn: string
  /**
   * 车牌号
   */
  plateNo: string
  /**
   * 油站名
   */
  stationName: string
  /**
   * 油号
   */
  oilCode: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 创建时间戳
   */
  createTimestamp: number
  /**
   * 订单状态
   */
  orderStatus: string
  /**
   * 订单状态说明
   */
  orderStatusStr: string
  /**
   * 优惠金额
   */
  discountAmount: string
  /**
   * 实付金额
   */
  payAmount: string
  /**
   * 优惠提供方集合
   */
  discountRight: string[]
}[]

/**
 * 接口 [订单-删除↗](http://yapi.golcer.cn/project/182/interface/api/4045) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/delete`
 * @更新时间 `2020-04-24 14:57:07`
 */
export interface GasOrderDeleteRequest {
  /**
   * 订单号
   */
  orderSn: string
}

/**
 * 接口 [订单-删除↗](http://yapi.golcer.cn/project/182/interface/api/4045) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/delete`
 * @更新时间 `2020-04-24 14:57:07`
 */
export interface GasOrderDeleteResponse {
  code: number
  msg: string
}

/**
 * 接口 [订单-反馈↗](http://yapi.golcer.cn/project/182/interface/api/4042) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/feedback`
 * @更新时间 `2020-04-24 14:57:13`
 */
export interface GasOrderFeedbackRequest {
  /**
   * 订单号
   */
  orderSn: string
  /**
   * 反馈内容
   */
  remark: string
}

/**
 * 接口 [订单-反馈↗](http://yapi.golcer.cn/project/182/interface/api/4042) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/feedback`
 * @更新时间 `2020-04-24 14:57:13`
 */
export interface GasOrderFeedbackResponse {
  code: number
  msg: string
}

/**
 * 接口 [订单-取消↗](http://yapi.golcer.cn/project/182/interface/api/4030) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/cancel`
 * @更新时间 `2020-04-24 11:51:51`
 */
export interface GasOrderCancelRequest {
  /**
   * 订单号
   */
  orderSn: string
  /**
   * 取消原因
   */
  remark?: string
}

/**
 * 接口 [订单-取消↗](http://yapi.golcer.cn/project/182/interface/api/4030) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/cancel`
 * @更新时间 `2020-04-24 11:51:51`
 */
export type GasOrderCancelResponse = string

/**
 * 接口 [订单-支付↗](http://yapi.golcer.cn/project/182/interface/api/4027) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/pay`
 * @更新时间 `2020-04-24 11:51:45`
 */
export interface GasOrderPayRequest {
  /**
   * 订单号
   */
  orderSn: string
}

/**
 * 接口 [订单-支付↗](http://yapi.golcer.cn/project/182/interface/api/4027) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/pay`
 * @更新时间 `2020-04-24 11:51:45`
 */
export interface GasOrderPayResponse {
  package: string
  paySign: string
  signType: string
  appId: string
  nonceStr: string
  timeStamp: string
}

/**
 * 接口 [订单-获取未支付列表↗](http://yapi.golcer.cn/project/182/interface/api/4021) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/get-unpaid-order`
 * @更新时间 `2020-04-24 19:56:53`
 */
export interface GasOrderGetUnpaidOrderRequest {}

/**
 * 接口 [订单-获取未支付列表↗](http://yapi.golcer.cn/project/182/interface/api/4021) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/get-unpaid-order`
 * @更新时间 `2020-04-24 19:56:53`
 */
export type GasOrderGetUnpaidOrderResponse = {
  orderSn: string
  plateNo: string
  stationName: string
  oilCode: string
  createTime: string
  createTimestamp: number
  orderStatus: string
  orderStatusStr: string
  discountAmount: string
  payAmount: string
  discountRight: string[]
}[]

/**
 * 接口 [订单-详情↗](http://yapi.golcer.cn/project/182/interface/api/4024) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/detail`
 * @更新时间 `2020-04-24 11:51:42`
 */
export interface GasOrderDetailRequest {
  /**
   * 订单号
   */
  orderSn: string
}

/**
 * 接口 [订单-详情↗](http://yapi.golcer.cn/project/182/interface/api/4024) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /gas/order/detail`
 * @更新时间 `2020-04-24 11:51:42`
 */
/**
 * 参考订单列表
 */
export interface GasOrderDetailResponse {
  orderSn: string
  plateNo: string
  stationName: string
  oilCode: string
  createTime: string
  createTimestamp: number
  orderStatus: number
  orderStatusStr: string
  discountAmount: string
  payAmount: string
  /**
   * 油站地址
   */
  stationAddress: string
  /**
   * 订单失效时间戳
   */
  expireTimestamp: number
  /**
   * 系统时间戳
   */
  systemTimestamp: number
  /**
   * 优惠列表
   */
  discountList: {
    /**
     * 权益名称
     */
    rightName: string
    /**
     * 优惠金额
     */
    discountAmount: string
  }[]
}

/**
 * 接口 [车辆管理-列表↗](http://yapi.golcer.cn/project/182/interface/api/3868) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/list`
 * @更新时间 `2020-04-21 18:04:36`
 */
export interface UserVehicleListRequest {}

/**
 * 接口 [车辆管理-列表↗](http://yapi.golcer.cn/project/182/interface/api/3868) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/list`
 * @更新时间 `2020-04-21 18:04:36`
 */
export interface UserVehicleListResponse {
  /**
   * 车辆id
   */
  id: number
  /**
   * 是否etc认证
   */
  isEtcUser: number
  /**
   * 车牌号
   */
  plateNo: string
}

/**
 * 接口 [车辆管理-删除↗](http://yapi.golcer.cn/project/182/interface/api/3871) 的 **请求类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/delete`
 * @更新时间 `2020-04-21 18:04:33`
 */
export interface UserVehicleDeleteRequest {
  /**
   * 车辆id
   */
  id: number
}

/**
 * 接口 [车辆管理-删除↗](http://yapi.golcer.cn/project/182/interface/api/3871) 的 **返回类型**
 *
 * @分类 [小程序接口↗](http://yapi.golcer.cn/project/182/interface/api/cat_1981)
 * @请求头 `POST /user/vehicle/delete`
 * @更新时间 `2020-04-21 18:04:33`
 */
export interface UserVehicleDeleteResponse {
  code?: number
  msg?: string
}

/* prettier-ignore-end */
