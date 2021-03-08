<template>
  <gd-loading
    fullscreen
    loading-class="{{pageLoadingClass}}"
    loading="{{pageCfg.loading}}"
    loading-image-class="{{loadingLogo?'logo-loading-img':''}}"
    loading-image="{{loadingLogo?'https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/logo.png':''}}"
  >
    <block wx:if="{{pageCfg.networkErr}}">
      <view class="">网络错误</view>
    </block>
    <slot wx:else></slot>
  </gd-loading>
</template>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {},
};
</script>

<script>
mpx.createComponent({
  properties: {
    loadingLogo: Boolean,
    pageCfg: {
      type: Object,
      value: {
        loading: true,
        networkErr: false,
      },
    },
  },
  data: {
    pageLoadingClass: 'page-loading-class',
  },
});
</script>

<style lang="less">
.page-loading-class {
  background: rgba(255, 255, 255, 0.3);
}
.logo-loading-img {
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
