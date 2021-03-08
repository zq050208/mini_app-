<template>
  <view class="certification">
    <view class="header">
      <view class="to-certification">
        <view class="tips">
          跳转至"ETC助手"小程序进行认证，提高车牌安全性
        </view>
        <view class="button-wrap">
          <button bindtap="toETCAssistant" class="btn btn-linear-green">
            去认证
          </button>
        </view>
      </view>
    </view>
    <view wx:if="{{ETCPlateList}}" class="plates">
      <view class="title">
        已认证车辆
      </view>
      <view hidden="{{!ETCPlateList.length}}" class="list">
        <view wx:for="{{ETCPlateList}}" wx:key="*this" class="item">
          {{ item.plateNo }}
        </view>
      </view>
      <view class="empty" hidden="{{ETCPlateList.length}}">
        暂无认证车辆
      </view>
    </view>
  </view>
</template>

<script>
import plateService from '@/services/plate.services';
import { normalizeDoRequest } from '@/utils/common';
import store from '@/store';
mpx.createPage({
  methods: {
    async getEtcPlateList() {
      /*  const apiRes = await plateService.getETCPlateList();
      this.etcPlateList = apiRes; */
    },
    toETCAssistant() {
      mpx.navigateToMiniProgram({
        appId: 'wxb17f5d5d01db8949',
        path: '/piaogen/pages/cue?for=certification&fromApp=gas_app',
        envVersion: 'develop',
      });
    },
    async handerAppShow(data) {
      const { referrerInfo } = data;
      if (referrerInfo.appId && referrerInfo.extraData) {
        const {
          extraData: { plateList },
        } = referrerInfo;

        if (!plateList || plateList.length < 1) return;
        normalizeDoRequest(
          async () => {
            await plateService.setPlatesETC(plateList);
            await this.$store.dispatch('loadUserCarPlateList');
          },
          {
            loadingMsg: '认证中',
          },
        );
      }
    },
  },
  computed: {
    ...store.mapState({
      ETCPlateList: state =>
        state.plates.userPlates.filter(plate => plate.isEtcUser),
    }),
  },
  onShow() {
    this.getEtcPlateList();
  },
  onLoad() {
    this.handerAppShow = this.handerAppShow.bind(this);
    mpx.onAppShow(this.handerAppShow);
  },
  onUnload() {
    mpx.offAppShow(this.handerAppShow);
  },
});
</script>

<style lang="less">
.header {
  background: #f5f5f5;
  padding: 20px;
}
.to-certification {
  width: 100%;
  height: 272px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  padding: 40px 60px;
  box-sizing: border-box;
  .tips {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    text-align: center;
    margin-bottom: 40px;
  }
  .btn {
    width: 280px;
    height: 72px;
    line-height: 72px;
  }
}

.plates {
  padding: 40px;
  .title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px -12px;
    padding: 28px 0;
    .item {
      margin: 12px;
      width: 208px;
      height: 76px;
      line-height: 72px;
      background: rgba(249, 250, 252, 1);
      border-radius: 10px;
      border: 2px solid rgba(221, 221, 221, 1);
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      box-sizing: border-box;
      text-align: center;
    }
  }
}
.empty {
  padding: 50px;
  text-align: center;
  font-size: 28px;
  color: #666;
}
</style>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: 'ETC认证',
  backgroundColor: '#ffffff',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#ffffff',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {},
};
</script>
