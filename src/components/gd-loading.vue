<template>
  <block>
    <view class="body-wrap" wx:class="{{ {show:bodyWrapShow} }}">
      <slot></slot>
    </view>
    <view
      hidden="{{!showLoading}}"
      class="gd-loading loading-class"
      wx:class="{{ {onHide:onHide,fullscreen:fullscreen} }}"
      bindtransitionend="transitionend"
    >
      <image
        mode="widthFix"
        class="loading-image-class loading-img"
        src="{{loadingImage || 'https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/loading.gif'}}"
      ></image>
      <view wx:if="{{loadingMsg}}" class="loading-text">
        {{ loadingMsg }}
      </view>
    </view>
    <view
      class="error"
      wx:class="{{ {fullscreen:fullscreen} }}"
      hidden="{{showLoading || !error}}"
    >
      <view class="error-message">{{ errorMsg }}</view>
      <view class="error-button">
        <button bindtap="onTapRetryBtn" class="btn btn-green-white">
          {{ errorBackBtn ? '返回' : '重试' }}
        </button>
      </view>
    </view>
  </block>
</template>

<script src="./gd-loading.ts" lang="ts"></script>

<style lang="less">
@import '../styles/_buttons';

.gd-loading {
  text-align: center;
  padding: 50px 0;
  height: 120px;
  transition: opacity 0.3s ease;
}

.body-wrap {
  width: 0px;
  height: 0px;
  overflow: hidden;
}
.body-wrap.show {
  width: auto;
  height: auto;
  overflow: visible;
}

.onHide {
  opacity: 0;
}
.loading-img {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
}
.loading-text {
  font-size: 28px;
  color: #999;
  position: relative;
  top: -10px;
  text-align: center;
}

.error {
  text-align: center;
  padding: 50px 0;
  height: 120px;
  font-size: 28px;
  color: #999;
  .error-button {
    margin-top: 20px;
  }
  .btn {
    width: 170px;
    height: 70px;
    line-height: 70px;
    font-size: 28px;
  }
}

.fullscreen {
  height: 100vh;
  width: 100vw;
  margin-top: -10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<script lang="ts" name="json">
module.exports = {
  component: true,
};
</script>
