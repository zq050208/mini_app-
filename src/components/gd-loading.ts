import router from '@/router';

const MIN_WAIT_TIME = 500;

mpx.createComponent({
  externalClasses: ['loading-image-class', 'loading-class'],
  data: {
    showLoading: true,
    onHide: false,
  },
  properties: {
    loading: {
      type: Boolean,
      default: true,
    },
    loadingMsg: String, // 加载提示
    loadingImage: String, // 加载图片
    inList: Boolean, // 是否在列表中
    error: Boolean,
    errorMsg: {
      type: String,
      value: '网络繁忙，请稍后再试',
    },
    errorBackBtn: Boolean, // 如果发生错误则显示返回按钮
    fullscreen: Boolean, // 是否全屏
  },
  watch: {
    loading(v): void {
      if (this._data.hideTimer) {
        clearTimeout(this._data.hideTimer);
      }
      if (v === true) {
        this._data.startTime = Date.now();
        this.showLoading = true;
        this.onHide = false;
      } else {
        const waitTime = Date.now() - this._data.startTime;
        if (waitTime < MIN_WAIT_TIME) {
          this._data.hideTimer = setTimeout(() => {
            this.onHide = true;
          }, MIN_WAIT_TIME - waitTime);
        } else {
          this.onHide = true;
        }
      }
    },
  },
  computed: {
    bodyWrapShow() {
      const { showLoading, error, inList } = this;
      return inList || (!showLoading && !error);
    },
  },
  methods: {
    transitionend() {
      if (this.onHide) {
        this.showLoading = false;
      }
    },
    onTapRetryBtn() {
      if (!this.errorBackBtn) {
        this.triggerEvent('retry');
      } else {
        router.navigateBack();
      }
    },
  },
  attached() {
    if (!this.loading) {
      this.showLoading = false;
    }
    this._data.startTime = Date.now();
  },
  detached() {
    if (this._data.hideTimer) {
      clearTimeout(this._data.hideTimer);
    }
  },
});
