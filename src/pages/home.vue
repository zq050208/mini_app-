<template>
  <gd-loading
    fullscreen
    error="{{!!pageError}}"
    errorMsg="{{pageError}}"
    bindretry="getCarPlateList"
    loading-image-class="logo-size"
    loading-image="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/logo.png"
    loading="{{pageLoading}}"
  >
    <view class="index-page">
      <!-- banner -->
      <view
        wx:if="{{!isAuth || !plateList || !plateList.length}}"
        class="header header_no-right"
      >
        <image
          mode="widthFix"
          class="header-banner"
          src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/home/header-banner_no-right.png"
          lazy-load
        ></image>
        <button
          open-type="{{ !isAuth ? 'getUserInfo' : '' }}"
          bindtap="onTapApplyBtn"
          bindgetuserinfo="onGetUserInfo"
          class="header-button"
        >
          添加车牌
        </button>
      </view>
      <view
        wx:else
        class="header"
        wx:class="{{ {headerSwiper:plateList.length>1} }}"
      >
        <template name="plateItem">
          <view class="header-info">
            <view class="info-item">
              <view class="info-value">
                {{ plateNo }}
              </view>
              <view class="info-label">
                车牌号码
              </view>
            </view>
            <!-- <div class="info-item-division"></div>
            <view class="info-item">
              <view class="info-value">
                1239.13
              </view>
              <view class="info-label">
                剩余权益 (L)
              </view>
            </view> -->
          </view>
        </template>
        <block wx:if="{{plateList.length === 1}}">
          <template
            is="plateItem"
            wx:for="{{plateList}}"
            data="{{...item}}"
          ></template>
        </block>
        <block wx:else>
          <swiper
            class="header-swiper"
            previous-margin="18px"
            next-margin="18px"
          >
            <swiper-item
              class="header-swiper-item"
              wx:for="{{plateList}}"
              wx:key="id"
            >
              <template is="plateItem" data="{{...item}}"></template>
            </swiper-item>
          </swiper>
        </block>
      </view>
      <!-- 待支付订单 -->
      <block>
        <order-item
          wx:for="{{orderList}}"
          wx:key="orderSn"
          order="{{item}}"
          bindcancel="onOrderCancel(index,$event)"
          bindpay="onOrderPay(index)"
        ></order-item>
      </block>
      <!-- 菜单 -->
      <view class="menus">
        <template name="menuItemTpl">
          <button
            bindtap="onTapMenuItem"
            data-key="{{data[0]}}"
            data-open-type="{{data[2]}}"
            open-type="{{data[2]==='getUserInfo'?!isAuth?'getUserInfo':'':data[2]}}"
            bindgetuserinfo="onGetUserInfo"
            class="menu-item"
          >
            <image
              src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/home/icon-{{data[0]}}.png"
              class="menu-icon"
              mode="widthFix"
            ></image>
            <view class="menu-label">{{ data[1] }}</view>
          </button>
        </template>
        <!-- ,['invoice','发票入口'] -->
        <block
          wx:key="*this"
          wx:for="{{[['rightsCenter','权益中心','getUserInfo'],['customer-services','客服中心'],['share','分享好友','share']]}}"
        >
          <template
            is="menuItemTpl"
            data="{{data:item,isAuth:isAuth}}"
          ></template>
        </block>
      </view>

      <!-- 加油站列表 -->
      <view class="block">
        <view class="block-title">
          推荐油站
          <view bindtap="onTapMoreStations" class="block-title_link">
            全部
          </view>
        </view>
        <view class="station-list-wrap">
          <gas-station-list></gas-station-list>
        </view>
      </view>
    </view>
    <order-cancel-popup
      bindcancel="onCancelPopupClose"
      bindcomfirm="onCancelPopupComfirm"
      show="{{showCancelPopup}}"
      order-sn="{{cancelOrderSn}}"
    ></order-cancel-popup>
  </gd-loading>
</template>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: 'ETC加油',
  usingComponents: {
    'gas-station-list': '@/components/stations/gas-station-list',
    'order-item': '@/components/order/order-item',
    'gd-page': '@/components/gd-page',
    'order-cancel-popup': '@/components/order/order-cancel-popup',
    'gd-auth': '@/components/gd-auth',
  },
};
</script>

<script lang="ts" src="./home.ts"></script>

<style lang="less">
.index-page {
  padding: 28px 40px;
}
.header {
  position: relative;
  &.headerSwiper {
    margin: 0 -40px;
  }
  &-swiper {
    height: 266px;
    &-item {
      // padding: 0 10px;
      // width: 680px;
      display: flex;
    }
  }
  &-info {
    background: url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/home/header-info-bg.png);
    background-size: 100% 100%;
    width: 680px;
    height: 266px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    .info {
      color: #fff;
      &-item {
        flex: 1;
        padding: 0 70px;
        position: relative;
        top: -6px;
        &-division {
          width: 2px;
          height: 80px;
          background: rgba(255, 255, 255, 0.7);
          // margin: 0 70px;
        }
      }
      &-value {
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #fff;
        text-shadow: 0px 2px 6px rgba(59, 141, 113, 0.47);
        white-space: nowrap;
      }
      &-label {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 0.75;
        margin-top: 12px;
      }
    }
  }
  .header_no-right &-banner {
    width: 100%;
    height: 640px;
    display: block;
  }
  .header_no-right &-button {
    position: absolute;
    width: 382px;
    height: 90px;
    border-radius: 100px;
    border: 3px solid #16c88b;
    background: #fff;
    bottom: 32px;
    left: 50%;
    margin-left: -191px;
    font-weight: bold;
    color: #16c88b;
    font-size: 40px;
    text-align: center;
    line-height: 90px;
  }
}

.header_no-right {
  margin-bottom: 52px;
}

.menus {
  margin-top: 20px;
  display: flex;
}
.menu-item {
  flex: 1;
  margin: 0 24px;
  text-align: center;
}
.menu-icon {
  width: 88px;
  height: 88px;
  display: block;
  margin: auto;
}
.menu-label {
  font-size: 24px;
  color: #666;
}

.block {
  margin-top: 46px;
  &-title {
    color: #333333;
    font-size: 32px;
    font-weight: bold;
    &_link {
      float: right;
      font-size: 28px;
      color: #666666;
      position: relative;
      padding-right: 28px;
      &:after {
        content: ' ';
        display: block;
        width: 18px;
        height: 18px;
        border-top: 5px solid #999699;
        border-right: 5px solid #999699;
        position: absolute;
        right: 6px;
        top: 8px;
        transform: rotate(45deg);
      }
    }
  }
}

.logo-size {
  width: 200px !important;
  height: 208px !important;
  max-width: auto !important;
  animation-name: pageLogoFloating;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes pageLogoFloating {
  from {
    opacity: 1;
    transform: translate(0, 0px);
  }
  65% {
    opacity: 0.6;
    transform: translate(0, 30px);
  }
  to {
    opacity: 1;
    transform: translate(0, -0px);
  }
}
</style>
