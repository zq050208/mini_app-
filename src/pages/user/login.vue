<template>
  <view class="login">
    <image
      class="logo"
      src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/logo.png"
    ></image>
    <view class="tips">
      申请获取您的公开信息（昵称、头像等）
    </view>
    <view class="btn-wrap">
      <button
        open-type="getUserInfo"
        bindgetuserinfo="onGetUserInfo"
        class="btn"
      >
        微信授权
      </button>
    </view>
  </view>
</template>

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

<script>
import router from '@/router';
mpx.createPage({
  methods: {
    async onGetUserInfo(e) {
      try {
        mpx.loading('登录中');
        const token = this.$store.state.auth.token;
        await this.$store.dispatch('auth', e.detail);
        if (this._data.redirect) {
          mpx.redirectTo({
            url: this._data.redirect,
          });
        } else {
          router.navigateBack();
        }
      } catch (error) {
        mpx.showToast({
          title: error.message,
        });
      } finally {
        mpx.hideLoading();
      }
    },
    noop() {},
  },
  onLoad({ redirect }) {
    this._data.redirect = redirect;
  },
});
</script>

<style lang="less">
.logo {
  width: 200px;
  height: 206px;
  display: block;
  margin: 160px auto 40px;
}
.tips {
  height: 48px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: rgba(102, 102, 102, 1);
  line-height: 48px;
  text-align: center;
  margin-bottom: 80px;
}
.btn-wrap {
  text-align: center;
  .btn {
    width: 640px;
    height: 90px;
    background: linear-gradient(
      180deg,
      rgba(13, 226, 164, 1) 0%,
      rgba(21, 195, 195, 1) 100%
    );
    border-radius: 75px;
    font-size: 36px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
