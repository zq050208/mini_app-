<template>
  <view class="plate-list">
    <gd-loading loading="{{loading}}" loading-msg="数据加载中">
      <view wx:for="{{plateList}}" wx:key="id" class="plate">
        <view class="plate-icon">
          <image
            class="icon-image"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/plates/icon-plate-list-item.svg"
          ></image>
        </view>
        <view class="plate-info">
          <view class="plate-no">
            {{ item.plateNo }}
          </view>
          <view wx:class="{{ {green:item.isEtcUser} }}" class="plate-status">
            {{ item.isEtcUser ? '已成功认证ETC车辆' : '未认证ETC车辆' }}
          </view>
        </view>
        <view bindtap="onTapDelete(index)" class="plate-trash">
          <image
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/plates/icon-trash.svg"
            class="icon-trash"
          ></image>
        </view>
      </view>

      <view bindtap="goToApply" class="add-plate">
        <image
          class="icon"
          src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/plates/icon-plate-add.svg"
        ></image>
        添加车辆
      </view>
    </gd-loading>
  </view>
</template>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '车辆管理',
  backgroundColor: '#F8F8F8',
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

<script>
import router from '@/router';
import plateServices from '../../services/plate.services';
import store from '@/store';

mpx.createPage({
  data: {
    loading: false,
    // plateList: [],
  },
  methods: {
    async onTapDelete(index) {
      const plate = this.plateList[index];
      const confirmRes = await mpx.showModal({
        content: '你确定要删除车牌号：' + plate.plateNo + '？',
      });
      if (confirmRes.confirm) {
        /* await plateServices.deletePlate({
          id: plate.id,
        });
        this.plateList.splice(index, 1); */
        await this.$store.dispatch('removeUserCarPlate', plate.id);
        mpx.toast('删除成功');
      }
    },
    async fetchPlateList() {
      /* const datas = await plateServices.getPlateList();
      this.plateList = datas; */
      await this.$store.dispatch('loadUserCarPlateList');
      this.loading = false;
    },
    goToApply() {
      router.toApply();
    },
  },
  onReady() {
    this.fetchPlateList();
  },
  computed: {
    ...store.mapState({
      plateList: state => state.plates.userPlates,
    }),
  },
});
</script>

<style lang="less">
page {
  background: #f8f8f8;
}
.plate-list {
  padding: 24px 40px;
}

.plate {
  background: #fff;
  border-radius: 12px;
  padding: 48px 32px;
  display: flex;
  align-items: top;
  margin-bottom: 24px;
  .plate-icon {
    .icon-image {
      width: 60px;
      height: 60px;
      display: block;
    }
  }
  .plate-info {
    margin-left: 32px;
    flex: 1;
    .plate-no {
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 60px;
    }
  }
  .plate-status {
    margin-top: 16px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 36px;
    &.green {
      color: #16c88b;
    }
  }
  .plate-trash {
    .icon-trash {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
}

.add-plate {
  width: 100%;
  height: 112px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 112px;
  text-align: center;
  .icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    position: relative;
    top: 10px;
  }
}
</style>
