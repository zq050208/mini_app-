<template>
  <view class="statios">
    <gd-loading
      loading-class="stations-loading"
      loading="{{stationLoading}}"
      loading-msg="正在获取附近加油站"
      error="{{!!networkError}}"
      errorMsg="{{networkError}}"
      bindretry="initStationList"
    >
      <block wx:if="{{locationAuthorize  && stationList.length}}">
        <gas-station-item
          wx:for="{{stationList}}"
          wx:key="id"
          station="{{item}}"
        ></gas-station-item>
      </block>
      <block wx:else>
        <view class="no-authorize no-authorize-class">
          <image
            class="placehoder-image"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/stations/staions-empty.png"
          ></image>
          <view class="tips">
            {{
              locationAuthorize
                ? '附近还没有合作油站 更多的油站即将上线'
                : '您未打授权地理位置 无法展示相关油站信息'
            }}
          </view>
          <button
            wx:if="{{!locationAuthorize}}"
            bindopensetting="initStationList"
            open-type="openSetting"
            class="btn-authorize"
          >
            立即授权
          </button>
        </view>
      </block>
    </gd-loading>
  </view>
</template>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {
    'gas-station-item': './gas-station-item',
  },
};
</script>

<script>
import { getLocation } from '@/services/location.service';
import { AuthorizeError } from '@/errors';
import stationServices from '@/services/station.services';

import { checkStoreAuthSetting, Scopes } from '@/utils/permissions';

mpx.createComponent({
  externalClasses: ['no-authorize-class'],
  properties: {
    params: {
      type: Object,
      value: {
        //油号
        oilNo: 92,
        // 1距离优先2价格优先
        sort: 1,
        // 精度
        precision: 15,
      },
    },
  },
  data: {
    stationLoading: false,
    locationAuthorize: true,
    stationList: [],
    networkError: false,
  },
  methods: {
    async initStationList() {
      if (this.stationLoading) return;
      try {
        this.stationLoading = true;
        this.locationAuthorize = true;
        this.networkError = false;
        const location = await getLocation();
        if (process.env.NODE_ENV === 'development') {
          location.latitude = '44.500000';
          location.longitude = '52.100000';
        }
        const stationListRes = await stationServices.getStationList({
          latitude: location.latitude,
          longitude: location.longitude,
          oilNo: this.params?.oilNo ?? 92,
          sort: this.params?.sort ?? 1,
          precision: this.params?.precision ?? 15,
        });
        this.stationList = stationListRes || [];
      } catch (error) {
        if (error instanceof AuthorizeError) {
          this.locationAuthorize = false;
          return;
        }
        this.networkError = '网络错误：' + error.message;
        throw error;
      } finally {
        this.stationLoading = false;
      }
    },
  },
  ready() {
    this.initStationList();
  },
  watch: {
    params(nv, ov) {
      this.initStationList();
    },
    '$store.state.auth.authSetting'(nv) {
      if (checkStoreAuthSetting(Scopes.userLocation)) {
        this.initStationList();
      }
    },
  },
});
</script>

<style lang="less">
.no-authorize {
  margin-top: 32px;
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
    width: 10em;
    margin: auto;
  }
  .btn-authorize {
    width: 168px;
    height: 64px;
    line-height: 64px;
    background: rgba(14, 212, 155, 1);
    border-radius: 75px;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-top: 48px;
  }
}
</style>
