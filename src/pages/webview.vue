<template lang="wxml">
  <web-view bindmessage="onMessage" binderro="onError" src="{{src}}"></web-view>
</template>

<script src="./webview.ts"></script>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '',
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

<style lang="less"></style>
