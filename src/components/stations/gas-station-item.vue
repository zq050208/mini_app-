<template>
  <view bindtap="toDetail" class="gas-station-item station">
    <wxs src="../../wxs/utils.wxs" module="utils"></wxs>
    <view class="station-name">
      {{ station.name }}
    </view>
    <view class="station-address">
      {{ station.address }}
    </view>
    <view class="station-price">
      <text class="symbol">￥</text>
      <text class="pirce">{{ station.actualUnitPrice }}</text>
      <text class="unit">/升</text>
      <view class="station-price-discount">
        <view class="station-price-discount-label">
          优惠
        </view>
        ￥{{
          utils.priceAdd(station.stationUnitPrice, -station.actualUnitPrice)
        }}/L
      </view>
      <view class="station-price-origin">
        挂牌价￥{{ station.stationUnitPrice }}
      </view>
    </view>
    <view catchtap="onTapNavigation" class="station-navigation">
      <image
        class="station-navigation-icon"
        mode="widthFix"
        src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/gas-station-item/icon-navigation.png"
      ></image>
      <view class="station-navigation-distance">{{ station.distance }}km</view>
    </view>
  </view>
</template>

<script lang="ts" name="json">
module.exports = {
  component: true,
};
</script>

<script src="./gas-station-item.ts" lang="ts"></script>

<style lang="less">
.gas-station-item {
  background: #fff;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(238, 238, 238, 0.7);
  padding: 24px 32px;
  margin: 24px 0;
  padding-right: 20%;
}
.station {
  position: relative;
  &:before {
    position: absolute;
    display: block;
    content: ' ';
    width: 8px;
    height: 32px;
    background: #16c88b;
    top: 32px;
    left: 0;
  }
  &-name {
    height: 48px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }
  &-price {
    margin-top: 16px;
    color: #16c88b;
    font-size: 48px;
    font-family: SFProDisplay-Medium, SFProDisplay;
    font-weight: 500;
    white-space: nowrap;
    // vertical-align: text-bottom;
    .symbol {
      font-size: 32px;
      font-weight: 400;
    }
    .unit {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
    }

    &-discount {
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
      vertical-align: middle;
      overflow: hidden;
      padding: 5px 6px;
      padding-left: 62px;
      line-height: 1.2;
      transform: scale(0.83);
      transform-origin: bottom center;
      position: relative;
      &-label {
        position: absolute;
        background: #5f6664;
        color: #fff;
        display: block;
        left: -1px;
        top: -1px;
        bottom: -1px;
        box-sizing: border-box;
        padding: 4px;
        line-height: 1.4;
        // float: right;
      }
    }
    &-origin {
      display: inline;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(204, 204, 204, 1);
      text-decoration: line-through;
    }
  }
  &-address {
    margin-top: 12px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    padding-left: 40px;
    background: url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/gas-station-item/icon-loction.png)
      no-repeat;
    background-size: 26px 26px;
    background-position: left 4px;
  }
  &-name,
  &-address,
  &-price {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-navigation {
    position: absolute;
    right: 20px;
    top: 40px;
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
</style>
