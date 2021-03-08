import { PageMixinOption } from '@/types/shim-mpx';

const PageInfiiniteScrollLoadMixin: PageMixinOption = {
  data: {
    loading: true, // 是否正加载中（用于判断显示loading和请求开关）
    list: null, // list 数据
    errorMsg: '',
  },
  methods: {
    async doFetchListData() {
      try {
        if (this.loading || !this._data.hasNext) return;
        this.loading = true;
        if (!this.fetchListData) {
          throw new Error(
            'PageInfiiniteScrollLoadMixin 需要在页面实现 fetchListData(pageNo) 方法，并返回页面数据',
          );
        }
        const apiRes = await this.fetchListData(this._data.pageNo);

        if (!this.list) {
          this.list = apiRes.data;
        } else {
          this.list.push(...apiRes.data);
        }

        if (apiRes.pageNum >= apiRes.totalPages) {
          this._data.hasNext = false;
          this.loading = false;
        }
      } catch (error) {
        this.errorMsg = error.message;
        logger.error(error);
      } finally {
        this.loading = false;
      }
    },
    doReload() {
      this._data.pageNo = 1;
      this._data.hasNext = true;
      this.list = null;
      this.loading = false;
      return this.doFetchListData();
    },
  },
  onLoad() {
    this._data.pageNo = 1;
    this._data.hasNext = true;
    this.loading = false;
    this.doFetchListData();
  },
  async onPullDownRefresh() {
    this.doReload();
    mpx.stopPullDownRefresh();
  },
  onReachBottom() {
    if (!this._data.hasNext) return;
    this._data.pageNo++;
    this.doFetchListData();
  },
};

export default PageInfiiniteScrollLoadMixin;
