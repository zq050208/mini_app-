<script lang="ts" src="./app.ts"></script>

<script lang="ts" name="json">
module.exports = {
  pages: [
    './pages/home', // 首页
    './pages/profile', // 个人中心
    './pages/user/login', // 登录
    './pages/apply/apply', // 申请
    './pages/sign/sign', // 去添加车牌
    './pages/sign/toSign', // 去签约
    './pages/apply/apply-certification.vue', // ETC认证
    './pages/station/station-list', // 油站列表
    './pages/station/station-detail', // 油站详情
    './pages/order/order-list', // 订单列表
    './pages/order/order-detail', // 订单详情
    './pages/pay/pay-manager', // 免密管理
    './pages/plates/plate-list', // 车辆管理
    './pages/webview', // webview
    './pages/debug', // debug
  ],
  tabBar: {
    backgroundColor: '#FFF',
    color: '#666',
    selectedColor: '#16C88B',
    list: [
      {
        pagePath: 'pages/home',
        text: '首页',
        iconPath: './assets/images/tabicon-home.png',
        selectedIconPath: './assets/images/tabicon-home_selected.png',
      },
      {
        pagePath: 'pages/profile',
        text: '我的',
        iconPath: './assets/images/tabicon-profile.png',
        selectedIconPath: './assets/images/tabicon-profile_selected.png',
      },
    ],
  },
  usingComponents: {
    'gd-loading': './components/gd-loading',
  },
  permission: {
    'scope.userLocation': {
      desc: '您的位置信息将用于获取最近的油站信息',
    },
  },
  navigateToMiniProgramAppIdList: ['wxb17f5d5d01db8949','wx1ed5f152443c917c'],
};
</script>

<style lang="less" src="./styles/app.less"></style>
