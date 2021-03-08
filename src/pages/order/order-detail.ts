import { Status } from '@/const';
import Reciprocal from '@/utils/reciprocalUtils';
import orderServices from '@/services/order.services';
import padStart from 'lodash/padStart';
import router from '@/router';
import { normalizeDoRequest } from '@/utils/common';
import { GasOrderDetailResponse } from '@/types/models';
import eventBus from '@/utils/eventBus';
import { delay } from '@/utils/common';

const STATUS_TIPS: Record<number, string> = {
  [Status.OrderStatus.WAIT_FOR_PAY]: '支付剩余时间',
  [Status.OrderStatus.PAY_SUCCESS]: '支付成功',
  [Status.OrderStatus.FAILURE]: '超过订单支付时间',
  [Status.OrderStatus.CANCEL]: '用户或加油员主动取消订单',
};

mpx.createPage({
  data: {
    isShowCancelReason: false,
    pageLoading: true,
    error: '',
    order: null as GasOrderDetailResponse | null,
    leaveTimes: '',
    showCancelPopup: false,
    showFeedBackPopup: false,
  },
  methods: {
    onTapFeedbackBtn() {
      this.showFeedBackPopup = true;
    },
    onFeedBackPopupClose() {
      this.showFeedBackPopup = false;
    },
    async onFeedBackPopupComfirm(e: any) {
      if (!this.order) return;
      const reason = e.detail;
      await normalizeDoRequest(
        orderServices.feedbackOrder.bind(this, this.order.orderSn, reason),
      );
      mpx.toast('反馈成功');
      this.onFeedBackPopupClose();
    },
    onTapCancelBtn() {
      this.showCancelPopup = true;
    },
    onCacncelPopupClose() {
      this.showCancelPopup = false;
    },
    async onTapPayBtn() {
      try {
        await orderServices.payOrder(this.order);
        mpx.showLoading({
          title: '刷新订单',
        });
        eventBus.emit(
          'orderStatusUpdate',
          this.order?.orderSn,
          Status.OrderStatus.PAY_SUCCESS,
        );
        await this.getOrderDetail();
      } finally {
        mpx.hideLoading();
      }
    },
    async onCacncelPopupComfirm() {
      eventBus.emit(
        'orderStatusUpdate',
        this.order?.orderSn,
        Status.OrderStatus.CANCEL,
      );
      this.showCancelPopup = false;
      mpx.toast('取消成功');
      await delay(1000);
      router.navigateBack();
    },
    // 倒计时
    reciprocalPayTime(order: any) {
      const { systemTimestamp, expireTimestamp } = order;

      // const expireTimestamp = 1587990931631;
      const leaveTimes = expireTimestamp - systemTimestamp;
      if (leaveTimes < 0) {
        logger.error('订单已过期，但状态未更改');
        return;
      }

      order.showReciprocalTime = true;
      const amountSeconds = Math.max(leaveTimes, 1000) / 1000;

      const payReciprocal = (this._data.payReciprocal = new Reciprocal(
        amountSeconds,
        systemTimestamp,
      ));
      payReciprocal.on((t: number) => {
        if (t <= 0) {
          this.getOrderDetail();
        }
        const seconds = Math.floor(t % 60);
        const minutes = Math.floor((t / 60) % 60);
        const hours = Math.floor((t / (60 * 60)) % 24);
        this.leaveTimes = `${padStart(String(hours), 2, '0')}:${padStart(
          String(minutes),
          2,
          '0',
        )}:${padStart(String(seconds), 2, '0')}`;
      });
      payReciprocal.run();
    },
    // 处理订单数据
    transformOrderDetail(order: any) {
      const orderStatus = parseInt(order.orderStatus);

      order.buttons = {};

      // 订单状态的图标
      switch (orderStatus) {
        case Status.OrderStatus.PAY_SUCCESS:
        case Status.OrderStatus.COMPLETE:
        case Status.OrderStatus.REFUND_SUCCESS:
          order.statusIcon = 'icon-status-success.svg';
          break;
        case Status.OrderStatus.FAILURE:
        case Status.OrderStatus.CANCEL:
        case Status.OrderStatus.REFUND_END:
          order.statusIcon = 'icon-status-failure.svg';
          break;
        default:
          order.statusIcon = 'icon-status-wait-for-pay.svg';
      }
      // 订单状态提示
      order.statusTips = STATUS_TIPS[orderStatus] || '';

      // 处理按钮
      orderServices.resolveOrderButtons(order);

      if (orderStatus === Status.OrderStatus.WAIT_FOR_PAY) {
        this.reciprocalPayTime(order);
      }

      return order;
    },
    // 获取订单
    async getOrderDetail() {
      this.pageLoading = true;
      try {
        const orderRes = await orderServices.getOrderDetail(this._data.orderSn);

        this.order = this.transformOrderDetail(orderRes);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.pageLoading = false;
      }
    },
  },
  onLoad({ orderSn }) {
    this._data.orderSn = orderSn;
    this.getOrderDetail();
  },
  onHide() {
    this._data.payReciprocal?.pause();
  },
  onShow() {
    this._data.payReciprocal?.remuse();
  },
});
