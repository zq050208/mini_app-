import gasAPIs from '@/apis/gas.apis';
import { Status, Decide } from '@/const';
import { GasOrderDetailResponse } from '@/types';

type GasOrderDetailRenderDTO = GasOrderDetailResponse & {
  buttons?: {
    pay: boolean;
    cancel: boolean;
    remove: boolean;
    feedback: boolean;
  };
  hasButtons?: boolean;
  statusHightlight?: boolean;
};

export default {
  /**
   * 获取待支付订单
   */
  getWaitForPayOrderList() {
    return gasAPIs.unPaidOrderList();
  },

  /**
   * 获取所有订单
   */
  getAllOrderList(params: {
    pageNo: number;
    pageSize?: number;
    plateNo?: string;
  }) {
    return gasAPIs.orderList(params);
  },

  /**
   * 用于组件显示，增加额外数据
   * @param params
   */
  async getAllOrderListForOrderItemComponent(params: {
    pageNo: number;
    pageSize?: number;
    plateNo?: string;
  }): Promise<GasOrderDetailRenderDTO[]> {
    const allOrdersData = await this.getAllOrderList(params);
    allOrdersData?.data?.forEach((order: any) => {
      this.resolveOrderRenderData(order);
      this.resolveOrderButtons(order);
    });
    return allOrdersData;
  },

  /**
   * 将订单状态设置为取消
   * @param order
   */
  changeOrderStatusToCancel(order: GasOrderDetailRenderDTO) {
    order.orderStatusStr = '已取消';
    order.orderStatus = Status.OrderStatus.CANCEL;
    this.resolveOrderRenderData(order);
    this.resolveOrderButtons(order);
  },

  /**
   * 将订单状态设置为已支付
   * @param order
   */
  changeOrderStatusToPaySuccess(order: GasOrderDetailRenderDTO) {
    order.orderStatusStr = '已支付';
    order.orderStatus = Status.OrderStatus.PAY_SUCCESS;
    this.resolveOrderRenderData(order);
    this.resolveOrderButtons(order);
  },

  /**
   * 解决 订单 在组件上的显示数据
   * @param order
   */
  resolveOrderRenderData(order: GasOrderDetailRenderDTO) {
    const { OrderStatus } = Status;
    const orderStatus = order.orderStatus;
    // 如果状态是未支付则高亮
    if (orderStatus === OrderStatus.WAIT_FOR_PAY) {
      order.statusHightlight = true;
    } else {
      order.statusHightlight = false;
    }
  },

  /**
   * 解决 订单 的按钮组显示逻辑
   * @param order
   */
  resolveOrderButtons(order: GasOrderDetailRenderDTO) {
    order.buttons = {
      pay: false,
      cancel: false,
      feedback: false,
      remove: false,
    };
    const orderStatus = order.orderStatus;
    const orderStatusBin = 1 << orderStatus;

    order.buttons.pay = !!(Decide.OrderButtonsFlags.PAY & orderStatusBin);
    order.buttons.cancel = !!(Decide.OrderButtonsFlags.CANCEL & orderStatusBin);
    order.buttons.remove = !!(Decide.OrderButtonsFlags.REMOVE & orderStatusBin);
    order.buttons.feedback = !!(
      Decide.OrderButtonsFlags.FEEDBACK & orderStatusBin
    );

    /* // 显示支付取消按钮
    if (orderStatus === OrderStatus.WAIT_FOR_PAY) {
      order.buttons.pay = true;
      order.buttons.cancel = true;
    }
    // 显示删除按钮
    if (
      [OrderStatus.CANCEL, OrderStatus.COMPLETE, OrderStatus.FAILURE].includes(
        orderStatus,
      )
    ) {
      order.buttons.remove = true;
    } 

    if (OrderStatus.FAILURE === orderStatus) {
      order.buttons.feedback = true;
    }*/

    order.hasButtons = !!Object.keys(order.buttons).length;

    return order;
  },

  feedbackOrder(orderSn: string, remark: string) {
    return gasAPIs.orderFeedback({
      remark,
      orderSn,
    });
  },

  cancelOrder(orderSn: string, remark: string) {
    return gasAPIs.orderCancel({
      orderSn,
      remark,
    });
  },

  getOrderDetail(orderSn: string) {
    return gasAPIs.orderDetail({
      orderSn,
    });
  },

  async getOrderPayInfo(orderSn: string) {
    const res = await gasAPIs.orderPay({
      orderSn,
    });
    return res;
  },

  async payOrder(order: any) {
    if (order) {
      try {
        mpx.showLoading({
          title: '发起支付',
        });
        const paySignInfo = await this.getOrderPayInfo(order.orderSn);
        mpx.hideLoading();
        await mpx.requestPayment(paySignInfo);
      } catch (e) {
        logger.error(e);
        if (~e.message?.indexOf('cancel')) {
          mpx.toast('取消支付');
        } else {
          mpx.showModal({
            content: e.message,
          });
        }
        throw e;
      } finally {
        mpx.hideLoading();
      }
    }
  },

  removeOrder(orderSn: string) {
    return gasAPIs.orderDelete({
      orderSn,
    });
  },
};
