<template>
  <view class="profile">
    <view class="header">
      <block wx:if="{{isAuth}}">
        <open-data type="userAvatarUrl" class="avatar"></open-data>
        <open-data type="userNickName" class="nick-name"></open-data>
      </block>
      <block wx:else>
        <gd-auth class="no-auth">
          <image
            mode="widthFix"
            class="avatar"
            src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/profile/avatar-default.png"
          ></image>
          <view class="nick-name nick-name_no-login">
            登录/注册
          </view>
        </gd-auth>
      </block>
    </view>
    <view class="menus">
      <template name="menuTpl">
        <view bindtap="jump" data-link-key="{{linkKey}}" class="menu">
          <view class="menu_hd">
            <image
              mode="widthFix"
              class="menu-icon"
              src="https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/profile/{{icon}}"
            ></image>
          </view>
          <view class="menu_bd">
            {{ title }}
          </view>
        </view>
      </template>
      <template
        is="menuTpl"
        data="{{ linkKey:'toOrderList',title:'订单管理',icon:'icon-order.png' }}"
      ></template>
      <template
        is="menuTpl"
        data="{{ linkKey:'toPlateList',title:'车辆管理',icon:'icon-car.png' }}"
      ></template>
      <template
        is="menuTpl"
        data="{{ linkKey:'toApplyCertification',title:'ETC认证',icon:'icon-etc.png' }}"
      ></template>
      <gd-auth class="no-auth">
        <template
          is="menuTpl"
          data="{{ linkKey: isSign ? 'toAddPlate' : 'toSignNoPwdPay',title:'去签约',icon:'icon-etc.png' }}"
        ></template>
      </gd-auth>
      <!-- <template
        wx:if="{{isDevMode}}"
        is="menuTpl"
        data="{{ linkKey:'toDebug',title:'开发设置（非生产模式下自动显示）',icon:'icon-setting.svg' }}"
      ></template> -->
      <!-- <template
        is="menuTpl"
        data="{{ linkKey:'toPlateList',title:'免密管理',icon:'icon-free' }}"
      ></template> -->
    </view>
  </view>
</template>

<script lang="ts">
import { Env } from '@/const';
import store from '@/store';
import router from '@/router';
import { isDevMode } from '@/utils/debugUtils';

mpx.createPage({
  data: {
    isDevMode: false,
    isSign: false
  },
  methods: {
    jump(e: any) {
      console.log("jump",e.target.dataset.linkKey,this.isAuth)
      const jumpTarget = e.target.dataset.linkKey
      if((jumpTarget == 'toAddPlate' || jumpTarget == 'toSignNoPwdPay') && !this.isAuth){
        return mpx.showToast({
          title: "请先登录",
        });
      }
      const {
        currentTarget: {
          dataset: { linkKey },
        },
      } = e;
      (router as any)[linkKey]?.();
    },
    getIsSign() {
      const that = this
      console.log("state",this.$store.state)
      const dataP = {
        openid: this.openId 
      }
      const params = JSON.stringify(dataP)
      mpx.request({
        url: 'http://dev.refuel.gplqdb.com:8087/miniApp/signContract/queryByOpenid', //路由
        data: params,
        method:"POST",//请求方法
        header:{ //请求头
          "content-type":"application/json"
        },
        success(e){ //回调
          that.isSign = (e as any).data.data
        }
      })
    }
  },
  computed: {
    ...store.mapState({
      isAuth: (state: any) => state.auth.isAuth,
      openId: (state: any) => state.auth.openId,
    }),
  },
  onLoad() {
    this.getIsSign()
    this.isDevMode = isDevMode() || !Env.isProd;
  },
});
</script>

<style lang="less">
@import '../styles/utils';
page {
  background: #f8f8f8;
}
.profile {
  .header {
    height: 152px;
    background: #fff;
    padding: 26px 40px;
    box-sizing: border-box;
    &,
    .no-auth {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 12px;
      overflow: hidden;
      display: block;
    }
    .nick-name {
      font-size: 32px;
      color: #333;
      font-weight: bold;
      margin-left: 40px;
      &_no-login {
        position: relative;
        &::after {
          content: ' ';
          position: absolute;
          right: -24px;
          top: 10px;
          .arrowheads(20px, 3px, #333, 45deg);
        }
      }
    }
  }
}
.menus {
  background: #fff;
  padding: 0 40px;
  margin-top: 20px;
  .menu {
    height: 128px;
    display: flex;
    align-items: center;
    position: relative;
    &:after {
      content: ' ';
      position: absolute;
      right: 40px;
      top: 50%;
      margin-top: -12px;
      .arrowheads(20px, 3px, #333, 45deg);
    }
    &-icon {
      width: 44px;
      height: 44px;
      display: block;
      position: relative;
      top: 2px;
    }
    &_hd {
      margin-right: 20px;
    }
    &_bd {
      position: relative;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;
      &_red-dot::after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: rgba(249, 78, 54, 1);
        position: absolute;
        right: -24px;
        top: 0;
      }
    }
  }
}
.version {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 20px;
  text-align: center;
  color: #ccc;
  font-size: 24px;
}
</style>

<script lang="ts" name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '个人中心',
  backgroundColor: '#F8F8F8',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#ffffff',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {
    'gd-auth': '../components/gd-auth',
  },
};
</script>
