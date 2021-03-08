<template>
  <view class="staion-list">
    <gd-header-filter-picker
      wx:model="{{filter}}"
      wx:model-prop="filtersValue"
      wx:model-event="changeFilter"
      filters="{{stationFilterParams}}"
    ></gd-header-filter-picker>
    <view class="statios-list-wrap">
      <gas-station-list
        params="{{stationListParams}}"
        no-authorize-class="stations-loading"
      ></gas-station-list>
    </view>
  </view>
</template>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '油站列表',
  backgroundColor: '#F8F8F8',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#ffffff',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {
    'gd-header-filter-picker': '../../components/gd-header-filter-picker',
    'gas-station-list': '@/components/stations/gas-station-list',
  },
};
</script>

<script>
import { getLocation } from '@/services/location.service';
import { AuthorizeError } from '@/errors';
import stationServices from '@/services/station.services';

const stationFilterParams = [
  {
    key: 'oilNo',
    rang: ['92#', '95#', '98#', '0#'],
    value: [92, 95, 98, 0],
  },
  {
    key: 'precision',
    rang: ['5km', '15km', '30km', '60km'],
    value: [5, 15, 30, 60],
  },
  {
    key: 'sort',
    rang: ['距离优先', '价格优先'],
    value: [1, 2],
  },
];

mpx.createPage({
  data: {
    stationLoading: true,
    locationAuthorize: true,
    filter: {
      oilNo: 0,
      precision: 1,
      sort: 0,
    },
    stationList: [],
  },
  methods: {},
  created() {
    this.setData({
      stationFilterParams,
    });
  },
  computed: {
    stationListParams() {
      const result = {};
      Object.keys(this.filter).forEach(key => {
        stationFilterParams.every(param => {
          if (param.key === key) {
            result[key] = param.value[this.filter[key]];
            return false;
          }
          return true;
        });
      });
      return result;
    },
  },
});
</script>

<style lang="less">
page {
  background: #f8f8f8;
}
.statios-list-wrap {
  padding: 0 40px;
  .stations-loading {
    padding-top: 20vh;
  }
}
</style>
