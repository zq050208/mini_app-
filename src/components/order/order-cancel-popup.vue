<template>
  <block>
    <!-- 取消原因 -->
    <view hidden="{{!show}}" class="cancel-reason-overlay"></view>
    <view class="cancel-reason-wrap">
      <transition custom-class="reason-inner" name="slide-up" show="{{show}}">
        <view class="reason-inner__hd">
          {{ title }}
          <view bindtap="onTapCloseCancelReasonBtn" class="close">
            <image
              class="close-image"
              src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/order/icon-close.svg"
            ></image>
          </view>
        </view>
        <view class="reason-inner__bd">
          <radio-group wx:model="{{radioValue}}" wx:model-event="change">
            <view wx:for="{{reasonOptions}}" class="cell">
              <label for="options_{{index}}" class="label">{{ item }}</label>
              <view class="radio">
                <radio
                  checked="{{radioValue === item}}"
                  value="{{item}}"
                  id="options_{{index}}"
                ></radio>
              </view>
            </view>
            <!-- <view class="cell">
              <label for="notMyOrder" class="label">我没有去加油</label>
              <view class="radio">
                <radio value="我没有去加油" id="notMyOrder"></radio>
              </view>
            </view> -->
            <view class="cell">
              <label for="other" class="label">其他</label>
              <view class="radio">
                <radio value="其他" id="other"></radio>
              </view>
              <textarea
                wx:model="{{otherReason}}"
                name=""
                id=""
                cols="10"
                rows="2"
                placeholder="请输入"
                placeholder-style="color:#999;"
                class="textarea"
                maxlength="60"
                cursor-spacing="100"
                disable-default-padding
              ></textarea>
              <view class="text-count">{{ otherReason.length }}/60</view>
            </view>
          </radio-group>
        </view>
        <button bindtap="onTapComfirmBtn" class="btn btn-red-white">
          确认取消
        </button>
      </transition>
    </view>
  </block>
</template>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {
    transition: '../transition',
  },
};
</script>

<script>
import orderServices from '@/services/order.services';
mpx.createComponent({
  properties: {
    show: Boolean,
    orderSn: String,
    reasonOptions: {
      type: Array,
      // value: ['这个车牌不是我的', '我没有去加油'],
      value: ['已在油站支付', '我没有去加油'],
    },
    title: {
      type: String,
      vlaue: '取消原因',
    },
  },
  data: {
    radioValue: '',
    otherReason: '',
  },
  methods: {
    async onTapComfirmBtn() {
      const reason = this.radioValue;
      if (reason === '其他' && this.otherReason) {
        reason = '其他：' + this.otherReason;
      }
      if (this.orderSn) {
        try {
          mpx.showLoading();
          await orderServices.cancelOrder(this.orderSn, reason);
        } finally {
          mpx.hideLoading();
        }
      }
      this.triggerEvent('comfirm', reason);
    },
    onTapCloseCancelReasonBtn() {
      this.triggerEvent('cancel');
    },
  },
  watch: {
    show(nv) {
      if (!nv) {
        this.radioValue = '';
        this.otherReason = '';
      }
    },
  },
});
</script>

<style lang="less">
@import '../../styles/utils';
@import '../../styles/_buttons';
.cancel-reason {
  &-wrap {
    transition: transform 0.3s ease;
    position: absolute;
    .reason-inner {
      background: rgba(255, 255, 255, 1);
      border-radius: 32px 32px 0px 0px;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      .x-padding-bottom(40px);
      &__hd {
        padding: 40px;
        height: 54px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 54px;
        text-align: center;
        position: relative;
        .close {
          position: absolute;
          top: 43px;
          left: 40px;
          .close-image {
            width: 48px;
            height: 48px;
            display: block;
          }
        }
      }

      &__bd {
        padding: 0 40px;
        .cell {
          padding: 32px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          position: relative;
          .border-1px(#ddd, bottom);
          .label {
            height: 48px;
            font-size: 32px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 48px;
            flex: 1;
            position: relative;
            &:after {
              content: '';
              position: absolute;
              top: -10px;
              left: -4px;
              right: -50px;
              bottom: -10px;
              z-index: 10;
            }
          }
          .textarea {
            margin-top: 12px;
            width: 100%;
            height: 150px;
            font-size: 28px;
            color: #999;
          }
          .text-count {
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            position: absolute;
            bottom: 24px;
            right: 0px;
          }
        }
      }

      .btn {
        margin-top: 40px;
      }
    }
  }
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
