<template>
  <view class="order-list">
    <!-- <wxs module="utils" src="../../wxs/utils.wxs"></wxs>
    <picker
      start="{{utils.dateFormat('2020-01','yyyy-MM-dd')}}"
      end="{{utils.dateFormat(0,'yyyy-MM-dd')}}"
      mode="date"
      fields="month"
      bindchange="changeMonth"
    >
      <view class="date-selecter">
        {{ utils.dateFormat(currentMonth, 'yyyy年 M月') }}
      </view>
    </picker> -->
    <gd-loading
      error="{{!!errorMsg}}"
      error-msg="{{errorMsg}}"
      loading-msg="订单加载中"
      loading="{{loading}}"
      in-list="{{list && list.length}}"
    >
      <block wx:if="{{list}}">
        <view wx:if="{{list.length}}" class="orders">
          <order-item
            wx:for="{{list}}"
            wx:key="orderSn"
            order="{{item}}"
            bindcancel="onOrderCancel(index,$event)"
            binddelete="onOrderDelete(index)"
          ></order-item>
        </view>
        <view wx:else class="empty">
          <image
            class="placehoder-image"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/stations/staions-empty.png"
          ></image>
          <view class="tips">
            您还没有订单，立即去加油吧！
          </view>
          <button bindtap="onTapNearStaions" class="btn btn-green">
            查看附近的油站
          </button>
        </view>
      </block>
    </gd-loading>
    <order-cancel-popup
      bindcancel="onCancelPopupClose"
      bindcomfirm="onCancelPopupComfirm"
      show="{{showCancelPopup}}"
      order-sn="{{cancelOrderSn}}"
    ></order-cancel-popup>
  </view>
</template>

<script>
import router from '@/router';
import orderServices from '@/services/order.services';
// import { Status } from '@/const';
import PageInfiiniteScrollLoadMixin from '@/mixins/page-infinite-scroll-load.mixin';
import eventBus from '@/utils/eventBus';
import { Status } from '@/const';

mpx.createPage({
  mixins: [PageInfiiniteScrollLoadMixin],
  data: () => {
    return {
      currentMonth: '',
      showCancelPopup: false,
      cancelOrderSn: '',
    };
  },
  methods: {
    onOrderCancel(index, e) {
      const order = e.detail;
      this.cancelOrderSn = order.orderSn;
      this.showCancelPopup = true;
      this.currentCancelOrderIndex = index;
    },
    onOrderDelete(index) {
      this.list.splice(index, 1);
    },
    async onCancelPopupComfirm() {
      this.showCancelPopup = false;
      const order = this.list[this.currentCancelOrderIndex];
      orderServices.changeOrderStatusToCancel(order);
      mpx.hideLoading();
    },
    onCancelPopupClose() {
      this.showCancelPopup = false;
    },
    changeMonth(e) {
      this.currentMonth = e.detail.value;
    },
    fetchListData(pageNo) {
      return orderServices.getAllOrderListForOrderItemComponent({
        pageNo: pageNo,
        pageSize: 10,
      });
    },
    onTapNearStaions() {
      router.toStationList();
    },
    orderEventHandler(orderSn, updateStatus) {
      this.list.every(order => {
        if (order.orderSn === orderSn) {
          if (updateStatus === Status.OrderStatus.CANCEL) {
            orderServices.changeOrderStatusToCancel(order);
          }
          if (updateStatus === Status.OrderStatus.PAY_SUCCESS) {
            orderServices.changeOrderStatusToPaySuccess(order);
          }
          return false;
        }
        return true;
      });
    },
  },
  onLoad() {
    this.orderEventHandler = this.orderEventHandler.bind(this);
    eventBus.on('orderStatusUpdate', this.orderEventHandler);
  },
  onUnload() {
    eventBus.off('orderStatusUpdate', this.orderEventHandler);
  },
});
</script>

<style lang="less">
@import '../../styles/utils.less';
page {
  background-color: #f8f8f8;
}
.order-list {
  padding: 20px 40px 1px;
}
.date-selecter {
  width: 194px;
  height: 56px;
  line-height: 36px;
  background: rgba(255, 255, 255, 1);
  border-radius: 28px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  &::after {
    content: '';
    display: block;
    .arrowheads(10px, 4px, #333, 135deg);
    position: absolute;
    right: 20px;
    top: 18px;
  }
}

.empty {
  margin-top: 64px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .placehoder-image {
    margin: auto;
    display: block;
    width: 426px;
    height: 240px;
  }
  .tips {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 42px;
    margin: 20px auto 80px;
  }
}
</style>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '订单管理',
  backgroundColor: '#F8F8F8',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#F8F8F8',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: true,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {
    'order-item': '@/components/order/order-item',
    'order-cancel-popup': '@/components/order/order-cancel-popup',
  },
};
</script>
