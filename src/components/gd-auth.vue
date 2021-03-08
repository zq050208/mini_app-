<template>
  <block>
    <button
      capture-catch="noop"
      open-type="getUserInfo"
      bindgetuserinfo="onGetUserInfo"
      class="auth-btn"
      wx:if="{{!isAuth}}"
    ></button>
    <slot></slot>
  </block>
</template>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {},
};
</script>

<script>
import store from '@/store';
mpx.createComponent({
  externalClasses: ['class'],
  methods: {
    async onGetUserInfo(e) {
      try {
        await this.$store.dispatch('auth', e.detail);
      } catch (error) {
        mpx.showToast({
          title: error.message,
        });
      }
    },
    noop() {},
  },
  computed: {
    ...store.mapState({
      isAuth: state => state.auth.isAuth,
    }),
  },
});
</script>

<style lang="less">
:host {
  position: relative;
}
.auth-btn {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: none;
  display: block;
  width: 100%;
  line-height: 1.5;
  padding: 0;
  background-color: inherit;
  z-index: 10;
  // line-height: inherit;
  font-size: inherit;
  &::after {
    border: none;
  }
  &.button-hover {
    background-color: transparent;
  }
}
</style>
