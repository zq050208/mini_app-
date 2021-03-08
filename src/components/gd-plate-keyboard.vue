<template>
  <view class="plate {{showInput ? 'palte_show-input' : ''}}">
    <view class="plate-container">
      <view class="plate-input" bindtap="closeInput">
        <view class="plate-view">
          <block wx:for="{{ maxPlateLength }}" wx:key="index">
            <view wx:if="{{index === 2}}" class="plate-point"></view>
            <view
              catchtap="changeFocus(index)"
              class="plate-no-input {{focus === index && showInput ? 'focus' : ''}}"
            >
              <view
                hidden="{{index <  7 || plateNumberArr[7]}}"
                class="new-plate"
              >
                <view class="add">+</view>
                <view>新能源</view>
              </view>
              <text>{{ plateNumberArr[index] }}</text>
            </view>
          </block>
        </view>
        <transition
          custom-class="input-slide-up"
          enter-class="input-slide-up-enter"
          leave-to-class="input-slide-up-leave-to"
          name="no"
          show="{{showInput}}"
        >
          <view class="input-view" catchtap="doNothing">
            <view class="input-list">
              <block wx:key="item" wx:for="{{ keyList }}">
                <view
                  class="input-item {{focus === 1 && !item.isLetter ? 'no-val' : ''}}"
                  catchtap="handleInput(item)"
                >
                  {{ item.value || item }}
                </view>
              </block>
              <view class="input-item delete-button" catchtap="deleteInput">
                <image
                  src="https://webcos.golcer.cn/components/plateInput/delete.png"
                ></image>
              </view>
              <view class="input-item confirm-button" catchtap="closeInput">
                确定
              </view>
            </view>
          </view>
        </transition>
        <view class="input-overlay" hidden="{{!showInput}}"></view>
      </view>
    </view>
  </view>
</template>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {
    transition: '../components/transition',
  },
};
</script>

<script lang="ts" src="./gd-plate-keyboard.ts"></script>

<style lang="less">
@import '../styles/utils';

.plate-input {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .plate-title {
    padding: 40rpx 40rpx 0;
    text-align: center;
    color: #333;
    line-height: 45rpx;
    font-size: 32rpx;
  }
  .plate-desc {
    position: relative;
    padding: 30rpx 40rpx 0 40rpx;
    color: #333;
    font-weight: 500;
    line-height: 45rpx;
    font-size: 32rpx;
  }
  .plate-view {
    position: relative;
    height: 84rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .palte_show-input & {
      z-index: 210;
    }

    .plate-point {
      width: 12rpx;
      height: 12rpx;
      // margin-right: 16rpx;
      border-radius: 50%;
      background-color: #999;
    }
    .plate-no-input {
      position: relative;
      box-sizing: border-box;
      width: 66rpx;
      height: 84rpx;
      line-height: 80rpx;
      text-align: center;
      border: 2rpx solid #999;
      border-radius: 8rpx;
      &.focus {
        &:after {
          content: '';
          position: absolute;
          box-sizing: border-box;
          top: -2rpx;
          left: -2rpx;
          height: 84rpx;
          width: 66rpx;
          border: 2rpx solid #16c88b;
          border-radius: 8rpx;
          animation: blink 1s infinite;
        }
        border-color: transparent;
        color: #16c88b;
      }
      &:last-of-type {
        border-style: dashed;
        &.focus {
          .new-plate {
            color: #16c88b;
          }
          border-style: solid;
        }
      }
      .new-plate {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        line-height: 22rpx;
        padding-top: 10rpx;
        color: #999;
        font-size: 16rpx;
        .add {
          font-size: 36rpx;
          line-height: 40rpx;
        }
      }
    }
  }
  .plate-color-view {
    .plate-color-title {
      position: relative;
      padding: 10rpx 40rpx 0 40rpx;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 45rpx;
      color: #333;
    }
    .plate-color-list {
      padding: 20rpx 40rpx 50rpx;
      display: flex;
    }
    .plate-color-item {
      margin-right: 30rpx;
      position: relative;
      box-sizing: border-box;
      border-radius: 8rpx;
      width: 230rpx;
      height: 78rpx;
      text-align: center;
      line-height: 78rpx;
      font-size: 32rpx;
      .item-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .item-text {
        position: absolute;
        z-index: 2;
        width: 100%;
        left: 0;
        top: 0rpx;
        text-align: center;
        font-size: 28rpx;
      }
      .plate-color-selected {
        display: none;
      }
      &.active {
        font-weight: bold;
        .plate-color-selected {
          display: block;
          position: absolute;
          width: 36rpx;
          height: 36rpx;
          right: -18rpx;
          bottom: -10rpx;
        }
      }
      &.blue {
        color: #fff;
      }
      &.green {
        color: #333;
      }
      &.other {
        color: #999;
      }
    }
    .plate-color-tips {
      padding: 0 40rpx;
      font-size: 24rpx;
      line-height: 33rpx;
      color: #999999;
    }
  }
  .submit-button {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 108rpx;
    line-height: 108rpx;
    font-size: 30rpx;
    color: #fff;
    background: #ddd;
    text-align: center;
    &.active {
      color: #fff;
      background: #16c88b;
    }
    &.rich-man {
      margin-bottom: 30rpx;
    }
  }
  .input-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 190;
  }
  .input-view {
    background-color: #dadada;
    .x-padding-bottom();
    &.phonex {
      padding-bottom: 68rpx;
    }
    .input-header {
      height: 100rpx;
      line-height: 100rpx;
      text-align: right;
    }
    .input-list {
      background-color: #dadada;
      padding-top: 24rpx;
      padding-left: 14rpx;
      padding-right: 14rpx;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      box-sizing: border-box;
      &:after {
        content: ' ';
        flex: auto;
      }
      .input-item {
        background-color: #fff;
        position: relative;
        margin: 0 5rpx 20rpx;
        height: 84rpx;
        line-height: 84rpx;
        width: 64rpx;
        font-size: 40rpx;
        color: #333;
        text-align: center;
        box-shadow: 0 1px 0 0 #999999;
        border-radius: 8rpx;
        &.no-val {
          color: #999999;
          background-color: #eee;
        }
        &.delete-button {
          width: 90rpx;
          position: absolute;
          right: 162rpx;
          bottom: 20rpx;
          bottom: calc(20px + constant(safe-area-inset-bottom));
          bottom: calc(20px + env(safe-area-inset-bottom));
          margin: 0;
          &.rich-man {
            bottom: 88rpx;
          }
        }
        &.confirm-button {
          position: absolute;
          margin: 0;
          width: 138rpx;
          height: 84rpx;
          right: 18rpx;
          bottom: 20rpx;
          bottom: calc(20px + constant(safe-area-inset-bottom));
          bottom: calc(20px + env(safe-area-inset-bottom));
          border-radius: 8rpx;
          &.rich-man {
            bottom: 88rpx;
          }
        }
        image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 46rpx;
          height: 32rpx;
        }
      }
      .input-item:active {
        background: #eee;
      }
      &.province-list {
        display: block;
        position: relative;
        .province-list-group {
          // padding-left: 14rpx;
          display: flex;
          // justify-content: center;
          flex-wrap: wrap;
        }
        .delete-button {
          width: 90rpx;
          position: absolute;
          right: 162rpx;
          bottom: 20rpx;
          margin: 0;
          &.rich-man {
            bottom: 78rpx;
          }
        }
      }
    }
  }
}

.input-slide-up {
  position: fixed;
  z-index: 200;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #dadada;
  transition-property: transform opacity;
  opacity: 1;
  transform: translate3d(0, 0%, 0);
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
