import url from '@/utils/url';
import store from '@/store';
import router from '@/router';
mpx.createPage({
  data: {
    src: '',
  },
  onLoad(params) {
    const { src } = params;
    if (src) {
      const query: Record<string, string> = {};
      if (store.state?.auth?.token) {
        query.token = store.state.auth.token;
      } else {
        query.loginPath = '/pages/user/login';
      }
      this.src = url.addQuery(query, decodeURIComponent(src));
    }
  },
  methods: {
    onError(err: any) {
      logger.error(err);
    },
    onMessage(event: any) {
      this._data.message = event.detail.data;
      this.messageHandler();
    },
    messageHandler() {
      while (this._data.message.length) {
        const message: {
          topic: string;
          data: any;
        } = this._data.message.pop();

        switch (message.topic) {
          case 'login':
            router.toLogin();
            break;
        }
      }
    },
    postMessageToWV(data: any) {
      if (!data) return;
      this.src = url.replaceHash(
        this.src,
        '#/__message/' + encodeURIComponent(JSON.stringify(data)),
      );
    },
  },
  watch: {
    '$store.state.auth.token'(nv) {
      if (nv) {
        this.postMessageToWV({
          topic: 'login',
          data: {
            token: nv,
          },
        });
      }
    },
  },
});
