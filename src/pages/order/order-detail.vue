<template>
  <gd-loading
    error="{{error}}"
    error-msg="{{error}}"
    error-back-btn="{{true}}"
    fullscreen
    loading-msg="订单加载中…"
    loading="{{pageLoading}}"
  >
    <wxs src="../../wxs/utils.wxs" module="utils"></wxs>
    <block wx:if="{{order}}">
      <view class="order-detail">
        <view class="header">
          <image
            class="status-big-icon"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/order/{{order.statusIcon}}"
          ></image>
          <view class="status">
            {{ order.orderStatusStr }}
          </view>
          <view wx:if="{{order.statusTips}}" class="status-tips">
            {{ order.statusTips }}
            <!-- display:inline -->
            <text
              wx:if="{{order.showReciprocalTime}}"
              class="status-tips_yellow"
              >{{ leaveTimes }}</text
            >
          </view>
        </view>
        <view class="order-body-wrap">
          <view class="order-body">
            <view class="info-title">
              {{ order.stationName }}
            </view>
            <view class="info-address">
              {{ order.stationAddress }}
            </view>
            <view class="info-detail">
              <view class="info-cell">
                <view class="info-cell__hd">加油车辆</view>
                <view class="info-cell__ft">{{ order.plateNo }}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__hd">加油型号</view>
                <view class="info-cell__ft">{{ order.oilCode }}#</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__hd">加油时间</view>
                <view class="info-cell__ft">{{ order.createTime }}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__hd">订单编号</view>
                <view class="info-cell__ft">{{ order.orderSn }}</view>
              </view>
              <!-- <view class="info-cell">
              <view class="info-cell__hd">优惠提供方</view>
              <view class="info-cell__ft">
                <view wx:for="{{order.discountList}}">
                  <view class="label">
                    {{ item.rightName }}
                  </view>
                </view>
              </view>
            </view> -->
              <!-- 分割线 -->
              <view class="division"></view>
              <view class="info-cell">
                <view class="info-cell__hd">原始价格</view>
                <view class="info-cell__ft">
                  ￥{{ utils.priceAdd(order.payAmount, order.discountAmount) }}
                </view>
              </view>
              <view class="info-cell info-cell_ml">
                <view class="info-cell__hd">优惠价格</view>
                <view class="info-cell__ft">
                  <view
                    class="label-wrap"
                    wx:key="rightName"
                    wx:for="{{order.discountList}}"
                  >
                    <view class="label">
                      {{ item.rightName }}
                    </view>
                    -￥{{ item.discountAmount }}
                  </view>
                </view>
              </view>
              <view class="info-cell">
                <view class="info-cell__hd">实付价格</view>
                <view class="info-cell__ft">
                  <text class="price">￥{{ order.payAmount }}</text>
                </view>
              </view>
            </view>
          </view>
          <view wx:if="{{order.hasButtons}}" class="buttons-wrap">
            <button
              wx:if="{{order.buttons.cancel}}"
              bindtap="onTapCancelBtn"
              class="btn btn-grey-white"
            >
              取消订单
            </button>
            <button
              bindtap="onTapPayBtn"
              wx:if="{{order.buttons.pay}}"
              class="btn btn-green"
            >
              确认支付
            </button>
          </view>
          <view wx:if="{{order.buttons.feedback}}" class="feedback-wrap">
            <view bindtap="onTapFeedbackBtn" class="feedback">异常反馈</view>
          </view>
        </view>
      </view>
      <!-- 取消 -->
      <order-cancel-popup
        bindcancel="onCacncelPopupClose"
        bindcomfirm="onCacncelPopupComfirm"
        show="{{showCancelPopup}}"
        order-sn="{{order.orderSn}}"
      ></order-cancel-popup>
      <!-- 异常反馈 -->
      <order-cancel-popup
        bindcancel="onFeedBackPopupClose"
        bindcomfirm="onFeedBackPopupComfirm"
        show="{{showFeedBackPopup}}"
        reason-options="{{ ['这个车牌不是我的', '我没有去加油'] }}"
        title="异常反馈"
      ></order-cancel-popup>
    </block>
  </gd-loading>
</template>

<script lang="ts" src="./order-detail.ts"></script>

<style lang="less">
@import '../../styles/utils';
page {
  background: #f8f8f8;
}
.order-detail {
}
.header {
  width: 100%;
  height: 200px;
  background: #fff;
  padding: 42px 60px;
  box-sizing: border-box;
}
.status {
  font-size: 48px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 18px;
  &-tips {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    &_yellow {
      color: #ffbb1d;
      margin-left: 10px;
    }
  }
  &-big-icon {
    width: 88px;
    height: 88px;
    display: block;
    float: right;
    margin-top: 14px;
  }
}
.order-body-wrap {
  padding: 32px 40px;
}
.order-body {
  background: #fff;
  padding: 40px;
  overflow: hidden;
}
.info {
  line-height: 1.5;
  &-title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 8px;
  }
  &-address {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 44px;
  }
  &-cell {
    display: flex;
    align-items: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 1.5;
    margin: 24px 0;
    &:last-child {
      margin-bottom: 0;
    }
    &__hd {
      color: rgba(102, 102, 102, 1);
      width: 5em;
    }
    &__ft {
      flex: 1;
      text-align: right;
      color: rgba(51, 51, 51, 1);
      .label-wrap {
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .label {
        padding: 0 12px;
        background: rgba(22, 200, 139, 0.08);
        // width: 96px;
        height: 36px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(22, 200, 139, 1);
        line-height: 36px;
        margin-left: 12px;
        display: inline-block;
        margin-right: 14px;
        border-radius: 4px;
      }
      .price {
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(22, 200, 139, 1);
      }
    }
  }
  &-cell_ml {
    align-items: flex-start;
  }
}
.division {
  height: 2px;
  width: 100%;
  border-bottom: 3px dashed #eeeeee;
  margin: 46px 0;
  position: relative;
  &:after,
  &:before {
    content: ' ';
    display: block;
    width: 76px;
    height: 76px;
    background: #f8f8f8;
    border-radius: 100%;
    position: absolute;
    top: (-76px/2);
    left: -86px;
  }
  &:after {
    left: auto;
    right: -86px;
  }
}
.buttons-wrap {
  display: flex;
  .btn {
    flex: 1;
    margin: 48px 16px;
  }
}

.feedback-wrap {
  text-align: center;
  margin-top: 40px;
  .feedback {
    display: inline;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 148, 238, 1);
    line-height: 42px;
  }
}
</style>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '订单详情',
  backgroundColor: '#F8F8F8',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#ffffff',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {
    transition: '@/components/transition.vue',
    'order-cancel-popup': '@/components/order/order-cancel-popup',
  },
};
</script>
