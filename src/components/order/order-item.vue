<template lang="wxml">
  <view bindtap="goDetail" class="order">
    <view class="order-header">
      {{order.stationName}}
      <text class="order-header-status {{order.statusHightlight?'order-header-status_hightlight':''}}">{{order.orderStatusStr}}</text>
    </view>
    <view class="order-body order-body_oil-{{order.oilCode}}">
      <view
        style="background-image:url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/order/icon-plate-no.png)"
        class="order-info"
      >
        {{order.plateNo}}
      </view>
      <view
        style="background-image:url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/order/icon-time.png)"
        class="order-info"
      >
        {{order.createTime}}
      </view>
      <view
        style="background-image:url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/order/icon-discount.png)"
        class="order-info"
      >
        优惠提供方：
        <text wx:for="{{order.discountRight}}" wx:key="*this" class="sponsor">{{item}}</text>
      </view>
    </view>
    <view class="order-footer">
      <view class="order-price">
        已优惠：
        <text class="order-discount-price">￥{{order.discountAmount}}</text>
        实付：
        <text class="order-pay-amount">￥{{order.payAmount}}</text>
      </view>
      <view wx:if="{{order.hasButtons}}" class="order-btns">
        <button catchtap="onTapCancelBtn" wx:if="{{order.buttons.cancel}}" class="cancel-btn btn">
          取消订单
        </button>
        <button catchtap="onTapRemoveBtn" wx:if="{{order.buttons.remove}}" class="cancel-btn btn">
          删除订单
        </button>
        <button catchtap="onTapPayBtn" wx:if="{{order.buttons.pay}}" class="pay-btn btn">
          去支付
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import router from '@/router';
import orderServices from '../../services/order.services';
import { normalizeDoRequest } from '@/utils/common';
mpx.createComponent({
  properties: {
    order: {
      type: Object,
      default: {},
    },
  },
  methods: {
    onTapCancelBtn() {
      this.triggerEvent('cancel', this.order);
    },
    async onTapPayBtn() {
      await orderServices.payOrder(this.order);
      logger.debug('支付成功');
      this.triggerEvent('pay', this.order);
    },
    async onTapRemoveBtn() {
      const confirmRes = await mpx.showModal({
        content: '你确定要删除订单吗？',
      });
      if (confirmRes.confirm) {
        await normalizeDoRequest(() => {
          orderServices.removeOrder(this.order.orderSn, {
            loadingMsg: '删除中',
          });
        });
        mpx.toast('删除成功');
        this.triggerEvent('delete');
      }
    },
    goDetail() {
      const { orderSn } = this.order;
      router.toOrderDetail({
        params: {
          orderSn,
        },
      });
    },
  },
});
</script>

<style lang="less">
.order {
  margin: 20px 0 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(238, 238, 238, 1);
  overflow: hidden;
  &-header {
    height: 92px;
    background: rgba(248, 250, 250, 1);
    padding: 22px 28px;
    color: #333333;
    font-size: 32px;
    position: relative;
    box-sizing: border-box;
    padding-right: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &-status {
      color: #999999;
      position: absolute;
      font-size: 28px;
      right: 28px;
      top: 26px;
      &_hightlight {
        color: #f94e36;
      }
    }
  }
  &-body {
    @oilTypes: 0, 92, 95, 98;
    each(@oilTypes,{&_oil-@{value}{background-image: url("https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/order/oil-type_@{value}.png");
      }
    })
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 92px 92px;
    background-position: right 28px top 28px;
    padding: 28px;
    border-bottom: 1px dotted #ddd;
  }
  &-info {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
    padding-left: 40px;
    background-repeat: no-repeat;
    background-size: 28px 28px;
    background-position: left center;
    margin-bottom: 12px;

    .sponsor {
      display: inline-block;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(22, 200, 139, 1);
      padding: 0 12px;
      height: 36px;
      line-height: 36px;
      background: rgba(22, 200, 139, 0.08);
      margin-right: 8px;
      border-radius: 4px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-footer {
    padding: 16px 28px;
    background: #fff;
  }
  &-price {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    text-align: right;
  }
  &-discount-price {
    color: #f94e36;
    margin-right: 20px;
  }
  &-pay-amount {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 60px;
  }
  &-btns {
    margin-top: 14px;
    text-align: right;
    .btn {
      margin-left: 12px;
      width: 168px;
      height: 64px;
      line-height: 64px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 75px;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      display: inline-block;
    }
    .pay-btn {
      background-color: #0ed49b;
      color: #fff;
    }
  }
}
</style>

<script name="json">
module.exports = {
  component: true,
};
</script>
