<template>
  <gd-loading
    error="{{pageError}}"
    error-msg="{{pageError}}"
    error-back-btn="{{true}}"
    loading-msg="加油马上到…"
    fullscreen
    loading="{{pageLoading}}"
  >
    <wxs src="../../wxs/utils.wxs" module="utils"></wxs>
    <view wx:if="{{station}}" class="staion-detail">
      <gd-navigation
        bindback="navigateBack"
        show-back="{{true}}"
        show-home="{{true}}"
        no-placeholder="{{true}}"
        navigation-bar-background-color="none"
        navigation-bar-text-style="white"
      ></gd-navigation>
      <image
        mode="aspectFill"
        class="station-image"
        src="{{station.logo}}"
      ></image>
      <view class="header">
        <view class="station-name">{{ station.name }}</view>
        <view class="station-address">{{ station.address }}</view>
        <view bindtap="onTapNavigation" class="station-navigation">
          <image
            class="station-navigation-icon"
            mode="widthFix"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/gas-station-item/icon-navigation.png"
          ></image>
          <view class="station-navigation-distance">
            {{ distance ? distance + 'km' : '定位中' }}
          </view>
        </view>
      </view>

      <view class="table">
        <view class="table-title">当前油价</view>
        <view class="table-body table-body__oil">
          <template name="table-item">
            <view class="item">
              <view class="oil-type">
                <image
                  src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/stations/oil-type_{{oilCode}}.jpg"
                  class="oil-type-image"
                ></image>
              </view>
              <view class="oil-price">￥{{ actualPrice }}/L</view>
              <view class="oil-discount">
                <view class="oil-discount-label">
                  优惠
                </view>
                ￥{{ utils.priceAdd(stationPrice, -actualPrice) }}/L
              </view>
            </view>
          </template>
          <template
            wx:for="{{station.oilList}}"
            data="{{...item}}"
            is="table-item"
          ></template>
        </view>
      </view>

      <view class="table">
        <view class="table-title">油站权益</view>
        <view class="table-body table-body__rights">
          <template name="rights-item">
            <view class="rights">
              <view class="rights-name">
                ETC基础权益
              </view>
              <view class="rights-status-wrap">
                <view class="rights-status rights-status__active">
                  可使用
                </view>
              </view>
              <view class="rights-detail">
                <view class="rights-detail-item">
                  <text class="label">优惠</text>
                  <text class="value">{{ discount }}</text>
                </view>
                <view class="rights-detail-item">
                  <text class="label">剩余</text>
                  <text class="value">无限制</text>
                </view>
              </view>
            </view>
          </template>
          <template
            data="{{discount:baseRightsDiscount}}"
            is="rights-item"
          ></template>
        </view>
      </view>
    </view>
  </gd-loading>
</template>

<script>
import router from '@/router';
import { getLocation } from '@/services/location.service';
import stationServices from '@/services/station.services';
mpx.createPage({
  data: {
    pageLoading: true,
    pageError: '',
    station: null,
    distance: '',
  },
  methods: {
    async getStationDetailInfo(id) {
      try {
        const apiRes = await stationServices.getStationDetail(id);
        this.station = apiRes;
      } catch (error) {
        this.throwError('抱歉：' + error.message);
      } finally {
        this.pageLoading = false;
      }
    },
    async getStationDistance(id) {
      const location = await getLocation();
      const distanceRes = await stationServices.getStationDistance({
        latitude: location.latitude,
        longitude: location.longitude,
        stationId: id,
      });
      this.distance = distanceRes.distance;
    },
    async onTapNavigation() {
      const { latitude, longitude, name, address } = this.station;
      mpx.openLocation({
        latitude,
        longitude,
        name,
        address,
      });
    },
    navigateBack(e) {
      const {
        detail: { pages },
      } = e;

      if (pages.length == 1) {
        router.toStationList();
      }
    },
    throwError(message) {
      this.pageError = message;
      this.pageLoading = false;
      logger.error(message);
    },
  },
  onLoad({ id }) {
    if (!id) {
      this.throwError('ID 不能为空');
    }
    this.getStationDetailInfo(id);
    this.getStationDistance(id);
  },
  computed: {
    baseRightsDiscount() {
      let result = 0;
      let isSame = true;
      this.station?.oilList?.map(oil => {
        const disount = oil.stationPrice - oil.actualPrice;
        if (result === 0) {
          result = disount;
        } else if (disount > result) {
          isSame = false;
        } else if (disount < result) {
          isSame = false;
          result = disount;
        }
      });
      return result.toFixed(2) + '/L' + (isSame ? '' : ' 起');
    },
  },
});
</script>

<style lang="less">
@import '../../styles/utils';
page {
  background: #f8f8f8;
}
.station {
  &-image {
    width: 100%;
    height: 420px;
    display: block;
  }
  &-name {
    height: 48px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }

  &-address {
    margin-top: 12px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    padding-left: 30px;
    background: url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/gas-station-item/icon-loction.png)
      no-repeat;
    background-size: 26px 26px;
    background-position: left 4px;
  }
  &-name,
  &-address {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-navigation {
    position: absolute;
    right: 20px;
    top: 0px;
    width: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-icon {
      width: 68px;
      height: 68px;
      display: block;
      margin: auto;
    }
    &-distance {
      margin-top: 12px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;
    }
  }
}

.header {
  background: #fff;
  padding: 40px 34px;
  padding-right: 140px;
  position: relative;
}

.table {
  margin-top: 20px;
  padding: 40px 28px;
  background: #fff;
  &-title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px;
  }
}

.table-body__oil {
  display: flex;
  .item {
    flex: 1;
    text-align: center;
  }
  .oil {
    &-type-image {
      width: 92px;
      height: 92px;
      display: block;
      margin: auto;
    }
    &-price {
      margin-top: 20px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(22, 200, 139, 1);
    }
    &-discount {
      margin-top: 10px;
      background: #fff;
      color: #5f6664;
      border-radius: 4px;
      border: 1px solid rgba(95, 102, 100, 1);
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      white-space: nowrap;
      position: relative;
      display: inline-block;
      overflow: hidden;
      padding: 5px 6px;
      padding-left: 62px;
      line-height: 1.2;

      transform: scale(0.83);
      transform-origin: center center;

      &-label {
        position: absolute;
        background: #5f6664;
        color: #fff;
        display: block;
        left: 0;
        top: 0;
        padding: 4px;
        box-sizing: border-box;
        top: 0;
        bottom: 0;
      }
    }
  }
}

.table-body__rights {
  .rights {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(100, 104, 106, 0.15);
    border-radius: 12px;
    height: 128px;
    padding: 0 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .border-1px(#e7e7e7);

    &-name {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 1.3;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &-status-wrap {
      flex: 1;
    }
    &-status {
      width: 104px;
      height: 40px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 20px;
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 40px;
      text-align: center;
      margin: 0 16px;
      &__active {
        background: #ecfaf5;
        color: #16c88b;
      }
    }
    &-detail {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 42px;
      color: rgba(102, 102, 102, 1);
      white-space: nowrap;
      .value {
        color: rgba(51, 51, 51, 1);
        margin-left: 8px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }
    }
  }
}
</style>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#F8F8F8',
  navigationBarTitleText: '油站详情',
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white',
  usingComponents: {
    'gd-navigation': '@/components/gd-navigation',
  },
};
</script>
