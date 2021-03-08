<template>
  <block wx:if="{{canUseCustomNavigation}}">
    <view
      style="{{barStyles}}"
      class="custom-navigation-bar custom-navigation-bar_{{navigationBarTextStyle}}"
    >
      <view class="title">
        {{ navigationBarTitleText || '' }}
      </view>
      <view
        style="{{leftButtonStyles}}"
        wx:class="{{ {twins:showGoBackButton&&showGoHomeButton} }}"
        class="left-buttons"
      >
        <view
          bindtap="onTapGobackButton"
          wx:if="{{showGoBackButton}}"
          class="button"
        >
          <image
            class="button-image"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/components/goback-{{navigationBarTextStyle}}.png?v"
          ></image>
        </view>
        <view
          wx:if="{{showGoBackButton&&showGoHomeButton}}"
          class="button-sep"
          style="background-color:{{navigationBarTextStyle}}"
        ></view>
        <view
          bindtap="onTapGoHomeButton"
          wx:if="{{showGoHomeButton}}"
          class="button"
        >
          <image
            class="button-image"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/components/gohome-{{navigationBarTextStyle}}.png?v"
          ></image>
        </view>
      </view>
    </view>
    <view
      wx:if="{{!noPlaceholder}}"
      style="{{barStyles}}"
      class="holder"
    ></view>
  </block>
</template>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {},
};
</script>

<script>
import {
  getMenuButtonBoundingClientRect,
  canIUse,
  getSystemInfo,
} from '@/utils/system';
import router from '@/router';
mpx.createComponent({
  props: {
    navigationBarTitleText: String,
    navigationBarBackgroundColor: {
      type: String,
      value: '#fff',
    },
    navigationBarTextStyle: {
      type: String,
      value: 'black',
    },
    noPlaceholder: Boolean,
    showBack: Boolean,
    customBackAction: Boolean,
    showHome: Boolean,
  },
  data: {
    height: 0,
    paddingTop: 0,
    right: 0,
    showGoBackButton: false,
    showGoHomeButton: true,
    canUseCustomNavigation: true,
  },
  methods: {
    onTapGobackButton() {
      this.triggerEvent('back', {
        pages: this.pages,
      });
      if (this.pages.length > 1 && !this.customBackAction) {
        mpx.navigateBack();
      }
    },
    onTapGoHomeButton() {
      router.toHome();
    },
  },
  async created() {
    if (!['black', 'white'].includes(this.navigationBarTextStyle)) {
      throw new Error('["navigationBarTextStyle"] 字段需为 black 或 white');
    }

    this.pages = getCurrentPages();
    if (this.pages.length > 1) {
      this.showGoBackButton = true;
    } else {
      this.showGoBackButton = this.showBack;
    }
    this.showGoHomeButton = this.showHome;

    this.canUseCustomNavigation = canIUse('getMenuButtonBoundingClientRect');
    if (!this.canUseCustomNavigation) return;
    try {
      const sysmteInfo = getSystemInfo();
      const rect = getMenuButtonBoundingClientRect();
      this.height = rect.height;
      this.paddingTop = rect.top;
      this.right = sysmteInfo.screenWidth - rect.right;
    } catch (error) {
      logger.error(error);
    }
  },
  computed: {
    barStyles() {
      return `height:${this.height}px;line-height:${this.height}px;padding-top:${this.paddingTop}px;padding-bottom:6px;
      background-color:${this.navigationBarBackgroundColor}`;
    },
    leftButtonStyles() {
      return `height:${this.height}px;top:${this.paddingTop}px;left:${this.right}px`;
    },
  },
});
</script>

<style lang="less">
.custom-navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  text-align: center;
  vertical-align: bottom;
}
.fixedTop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.custom-navigation-bar_black {
  color: #000;
}

.left-buttons {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .button {
    display: flex;
    align-items: center;
    height: 100%;
    width: 48px;
    height: 48px;
    margin-left: -10px;
    .button-image {
      display: block;
      width: 48px;
      height: 48px;
    }
  }

  &.twins {
    padding: 8px 20px;
    border-radius: 32px;
    .button {
      margin-left: 0;
    }
    .button-sep {
      margin: 0 18px;
      opacity: 0.2;
      height: 40px;
      width: 2px;
    }
    .custom-navigation-bar_white & {
      background: rgba(0, 0, 0, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
  }
}

.title {
  width: 30%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 32rpx;
}
</style>
