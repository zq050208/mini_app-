<template>
  <view class="pay-manager">
    <view class="list">
      <view class="item">
        <view class="info">
          <view class="plate">
            粤A·12498
          </view>
          <view class="type">免密扣款卡 工商银行（5547）</view>
        </view>
        <switch color="#5CC590" class="switch" checked="{{switch1Checked}}" />
      </view>
      <view class="item">
        <view class="info">
          <view class="plate">
            粤A·12498
          </view>
          <view class="type">免密扣款卡 工商银行（5547）</view>
        </view>
        <switch color="#5CC590" class="switch" checked="{{switch1Checked}}" />
      </view>
    </view>
  </view>
</template>

<script>
mpx.createPage({
  data: {
    switch1Checked: true,
  },
});
</script>

<style lang="less">
page {
  background: #f8f8f8;
}
.pay-manager {
  padding: 40px;
}
.list {
  .item {
    height: 212px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .info {
      flex: 1;
    }
    .plate {
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 60px;
      margin-bottom: 16px;
    }
    .type {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(22, 200, 139, 1);
    }
  }
}
</style>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '免密管理',
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
