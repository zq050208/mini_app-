import store from '@/store';
import router from '@/router';
import orderServices from '@/services/order.services';

mpx.createPage({
  data: {
    stationLoading: true,
    locationAuthorize: true,
    pageLoading: true,
    // plateList: [],
    stationList: [],
    orderList: [],
    cancelOrderSn: '',
    showCancelPopup: false,
    currentCancelOrderIndex: -1,
    pageError: '',
  },
  methods: {
    onTapMenuItem(e: any) {
      const {
        currentTarget: {
          dataset: { key, openType },
        },
      } = e;

      if (openType === 'getUserInfo' && !this.isAuth) {
        this._data.postGetUserInfo = this.onTapMenuItem.bind(this, e);
        return;
      }

      switch (key) {
        case 'rightsCenter':
          router.toRightsCenter();
          break;
        case 'invoice':
          mpx.showModal({
            content: '即将上线',
            showCancel: false,
          });
          break;
        case 'customer-services':
          router.toCustomerServices();
          break;
      }
    },
    async onCancelPopupComfirm() {
      this.showCancelPopup = false;
      this.watchWaitForPayOrders();
      mpx.toast('取消成功');
    },
    /**
     * 取消订单理由弹窗关闭
     */
    onCancelPopupClose() {
      this.showCancelPopup = false;
    },
    /**
     * order-item 取消订单按钮事件
     * @param index
     * @param e
     */
    onOrderCancel(index: number, e: any) {
      const order = e.detail;
      this.cancelOrderSn = order.orderSn;
      this.showCancelPopup = true;
      this.currentCancelOrderIndex = index;
    },
    async onOrderPay() {
      logger.debug('有订单支付了');
      mpx.showLoading({ title: '刷新订单中' });
      try {
        await this.watchWaitForPayOrders();
      } finally {
        mpx.hideLoading();
      }
    },
    /**
     * 点击申请按钮
     */
    onTapApplyBtn() {
      if (!this.isAuth) {
        this._data.postGetUserInfo = this.onTapApplyBtn.bind(this);
        return;
      }
      router.toApply();
    },
    /**
     * 点击更多油站
     */
    onTapMoreStations() {
      router.toStationList();
    },
    /**
     * 轮询待支付订单
     */
    async watchWaitForPayOrders() {
      if (
        this._data.watchOrderTimer === false || // onHide 时候会设置成false，防止请求
        this.plateList?.length < 1 // 没有车牌也肯定不会有新的订单
      ) {
        return;
      }
      try {
        if (this._data.watchOrderTimer)
          clearTimeout(this._data.watchOrderTimer);
        const apiRes = await orderServices.getWaitForPayOrderList();
        apiRes?.forEach(orderServices.resolveOrderButtons);
        this.orderList = apiRes || [];
      } finally {
        if (process.env.NODE_ENV !== 'development') {
          this._data.watchOrderTimer = setTimeout(() => {
            this.watchWaitForPayOrders();
          }, 5000);
        }
      }
    },
    async onGetUserInfo(e: any) {
      try {
        await this.$store.dispatch('auth', e.detail);
        this._data.postGetUserInfo?.();
      } catch (error) {
        mpx.showToast({
          title: error.message,
        });
      }
    },
    async getCarPlateList() {
      this.pageLoading = true;
      try {
        await this.$store.dispatch('loadUserCarPlateList');
        // this.plateList = res || [];
      } catch (error) {
        this.pageError = error.message;
      } finally {
        this.pageLoading = false;
      }
    },
  },
  async onReady() {
    await this.getCarPlateList();
  },
  onShow() {
    this._data.watchOrderTimer = void 0;
    this.watchWaitForPayOrders();
  },
  onHide() {
    if (this._data.watchOrderTimer) clearTimeout(this._data.watchOrderTimer);
    this._data.watchOrderTimer = false;
  },
  computed: {
    ...store.mapState({
      isAuth: (state: any) => state.auth.isAuth,
      plateList: (state: any) => state.plates.userPlates,
    }),
  },
  watch: {
    plateList() {
      this.watchWaitForPayOrders();
    },
  },
  onShareAppMessage() {
    return {
      title: '便捷加油，畅享优惠',
      imageUrl:
        'https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/share.png',
    };
  },
});
