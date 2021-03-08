<template>
  <view class="header-filter-picker">
    <view class="header header-class">
      <view wx:for="{{filters}}" wx:key="{{item.key}}" class="header-item">
        <view catchtap="onTapFilterItem(item.key)" class="header-item-inner">
          {{ item.rang[value[item.key]] }}
        </view>
      </view>
    </view>
    <view class="header-picker">
      <view
        hidden="{{!showPicker}}"
        bindtap="closePicker"
        class="header-picker-overlay"
      ></view>
      <transition
        custom-class="header-picker-list"
        name="none"
        enter-class="header-picker-list-enter"
        leave-to-class="header-picker-list-leave-to"
        show="{{showPicker}}"
      >
        <view
          wx:for="{{pickerRang}}"
          wx:key="{{item}}"
          class="header-picker-item"
          wx:class="{{ {active:value[currentFocusKey] === index} }}"
          catchtap="onTapPickerItem(index)"
        >
          {{ item }}
        </view>
      </transition>
    </view>
  </view>
</template>

<script>
mpx.createComponent({
  externalClasses: ['header-class'],
  properties: {
    /**
     * 数组，过滤器选择数据
     [{
          key: 'oliType',
          rang: ['92#', '95#', '98#']
        },
        {
          key: 'distance',
          rang: ['5km', '15km', '30km', '60km']
        },
        {
          key: 'sort',
          rang: ['距离优先', '价格优先']
        }]
     */
    filters: Array,
    /**
     * 值对象
     * {filter_item_key:rang_index}
     */
    filtersValue: Object,
  },
  data: {
    showPicker: false,
    pickerRang: [],
    value: {},
    currentFocusKey: '',
  },
  methods: {
    onTapFilterItem(key) {
      this.currentFocusKey = key;
      this.pickerRang = this.pickerRangMaps[key];
      this.showPicker = true;
    },
    onTapPickerItem(index) {
      const { currentFocusKey } = this;
      this.value[currentFocusKey] = index;
      this.triggerEvent('changeFilter', {
        value: {
          ...this.value,
        },
      });
      this.closePicker();
    },
    closePicker() {
      this.showPicker = false;
    },
  },
  created() {
    this.pickerRangMaps = {};
    this.filters.forEach(filter => {
      const { key } = filter;
      this.value[key] = (this.filtersValue?.[key] ?? filter.default) || 0;
      this.pickerRangMaps[key] = filter.rang;
    });
  },
});
</script>

<script name="json">
module.exports = {
  component: true,
  usingComponents: {
    transition: './transition',
  },
};
</script>

<style lang="less">
@import '../styles/utils';
.header {
  height: 88px;
  background: #fff;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  &-item {
    text-align: center;
    flex: 1;
    &-inner {
      display: inline-block;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;
      padding: 14px;
      &:after {
        content: '';
        position: relative;
        top: -2px;
        margin-left: 12px;
        .triangle(10px, #666666, top);
      }
    }
  }

  &-picker {
    &-overlay {
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    &-list {
      position: fixed;
      top: 88px;
      left: 0;
      width: 100%;
      z-index: 11;
      background: #fff;
      transition: transform opacity;
      z-index: 2;
      &-enter,
      &-leave-to {
        opacity: 0;
        transform: translate3d(0, -40%, 0);
      }
    }
    &-item {
      // border-top: 1px solid #ddd;
      .border-1px(#ddd, top);
      height: 112px;
      line-height: 112px;
      text-align: center;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      &.active {
        color: #16c88b;
      }
    }
  }
}
</style>
