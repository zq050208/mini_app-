<template>
  <view class="debug-page">
    <view class="menus">
      <view class="menu-title">
        常用功能
      </view>
      <view class="menu">
        <view class="menu__bd">版本：{{ version }}</view>
      </view>
      <view class="menu">
        <view class="menu__bd">开发者模式</view>
        <view class="menu__ft">
          <switch></switch>
        </view>
      </view>
      <view bindtap="openConsole" class="menu">
        打开调试工具
      </view>
    </view>
  </view>
</template>

<script lang="ts">
// import { Keys } from '@/const';
mpx.createPage({
  data: {
    version: process.env.VERSION,
  },
  methods: {
    openConsole() {
      mpx.setEnableDebug({
        enableDebug: true,
      });
    },
  },
  // onLoad() {},
});
</script>

<style lang="less">
page {
  background: #f8f8f8;
}
.menus {
  padding: 0 40px;
  margin-top: 20px;
  background: #fff;
  .menu-title {
    padding-bottom: 20px;
    font-size: 28px;
    color: #000;
    font-weight: bold;
    background: #f8f8f8;
    margin: 0 -40px;
    padding: 0 40px 20px;
  }
  .menu {
    height: 128px;
    display: flex;
    align-items: center;
    position: relative;
    /* &:after {
      content: ' ';
      position: absolute;
      right: 40px;
      top: 50%;
      margin-top: -12px;
      .arrowheads(20px, 3px, #333, 45deg);
    } */
    &-icon {
      width: 44px;
      height: 44px;
      display: block;
      position: relative;
      top: 2px;
    }
    &__hd {
      margin-right: 20px;
    }
    &__bd {
      position: relative;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;
      flex: 1;
    }
  }
}
</style>

<script lang="ts" name="json">
module.exports = {
  navigationBarBackgroundColor: '#000000',
  navigationBarTextStyle: 'white', // black / white
  navigationBarTitleText: '调试',
  backgroundColor: '#ffffff',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#ffffff',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {},
};
</script>
