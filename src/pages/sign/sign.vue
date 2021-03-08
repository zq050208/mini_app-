<template>
  <view class="apply">
    <view class="plate-field">
      <view class="label">车牌</view>
      <gd-plate-keyboard
        wx:model="{{plateNo}}"
        wx:model-prop="plateNo"
        wx:model-event="changePlateNo"
      ></gd-plate-keyboard>
    </view>
    <view class="field">
      <view class="field__hd">手机号</view>
      <view class="field__bd">
        <input
          placeholder-class="placeholder-input"
          placeholder="输入手机号"
          type="number"
          class="input"
          maxlength="11"
          bindinput="onPhoneInput"
          value="{{phoneNumber}}"
        />
      </view>
      <!-- <button
        bindgetphonenumber="onGetPhoneNumber"
        bindtap="onTapGetPhoneNumber"
        open-type="{{weixinPhoneNumber?'':'getPhoneNumber'}}"
        class="field__ft"
      >
        自动填写
      </button> -->
    </view>
    <!-- <view hidden="{{!isShowValidCode}}" class="field">
      <view class="field__hd">验证码</view>
      <view class="field__bd">
        <input
          placeholder-class="placeholder-input"
          placeholder="输入验证码"
          type="text"
          class="input"
          wx:model="{{validCode}}"
          maxlength="4"
        />
      </view>
      <view
        bindtap="onTapSendPhoneValidCode"
        wx:class="{{ {disabled:sendPhoneCodeDelayTimes} }}"
        class="field__ft field__ft_blue"
      >
        {{
          sendPhoneCodeDelayTimes > 0
            ? '已发送(' + sendPhoneCodeDelayTimes + '秒后再试）'
            : '获取验证码'
        }}
      </view>
    </view> -->
    <view class="rule-wrap">
      <checkbox class="checkbox" id="agree"></checkbox>
      <label for="agree">
        已阅读并同意
      </label>
      <navigator url="{{agreementUserUrl}}" class="nav">用户服务协议</navigator>
      |
      <!-- display:inline -->
      <navigator url="{{agreementPrivacyUrl}}" class="nav"
        >隐私保护协议</navigator
      >
    </view>
    <view class="btn-wrap">
      <button
        bindtap="onTapSubmit"
        disabled="{{!isAllowSubmit}}"
        class="btn-linear-green"
      >
        确定
      </button>
    </view>
  </view>
</template>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '开通ETC加油',
  backgroundColor: '#ffffff',
  backgroundTextStyle: 'dark', // dark / light
  backgroundColorTop: '#ffffff',
  backgroundColorBottom: '#ffffff',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  pageOrientation: 'portrait', // auto / portrait / landscape
  disableScroll: false,
  usingComponents: {
    'gd-plate-keyboard': '../../components/gd-plate-keyboard',
  },
};
</script>

<script>
import authServices from '@/services/auth.services';
import { validPhoneNumber } from '@/utils/valid';
import Reciprocal from '@/utils/reciprocalUtils';
import plateServices from '@/services/plate.services';
import router, { webviewPath } from '../../router';
import store from '@/store';
mpx.createPage({
  data: {
    sendPhoneCodeDelayTimes: 0,
    plateNo: '吉PE3555',
    phoneNumber: '18680315902',
    weixinPhoneNumber: '',
    validCode: '',
    agreementPrivacyUrl: webviewPath(
      'https://apex.golcer.cn/gas/agreement-privacy.html',
    ),
    agreementUserUrl: webviewPath(
      'https://apex.golcer.cn/gas/agreement-user.html',
    ),
  },
  methods: {
    /**
     * 获取用户手机号码
     */
    // async onGetPhoneNumber(event) {
    //   if (this.weixinPhoneNumber) {
    //     this.weixinPhoneNumber = this.phoneNumber;
    //     return;
    //   }
    //   const {
    //     phoneSign,
    //     phone,
    //   } = await authServices.decodeUserPhoneNumberEncryptedData(event.detail);
    //   this._data.phoneSign = phoneSign;
    //   this.weixinPhoneNumber = this.phoneNumber = phone;
    // },
    /**
     * 如果已经获取重复点击
     */
    // onTapGetPhoneNumber() {
    //   if (this.weixinPhoneNumber) {
    //     this.phoneNumber = this.weixinPhoneNumber;
    //     return;
    //   }
    // },
    // /**
    //  * 发送验证码
    //  */
    // async onTapSendPhoneValidCode() {
    //   if (this.sendPhoneCodeDelayTimes > 0) return;
    //   try {
    //     await authServices.sendPhoneValidCode(this.phoneNumber);
    //     const reciprocal = (this._data.reciprocal = new Reciprocal(60));
    //     reciprocal.on(delayTimes => {
    //       this.sendPhoneCodeDelayTimes = delayTimes;
    //     });
    //     reciprocal.run();
    //   } catch (error) {
    //     mpx.toast(error.message);
    //   }
    // },
    /**
     * 输入手机号码时
     */
    onPhoneInput(e) {
      const value = e.detail.value;
      this.phoneNumber = value.replace(/[^\d]/gi, '');
    },
    // 提交
    async onTapSubmit(e) {
      try {
       let data = {
          licensePlate: this.plateNo,
          tel: this.phoneNumber,
          openid: store.state.auth.openId,
          appid:'wx1ed5f152443c917c',
          requestSerial:"12312312312312"
        }
        const paramData = JSON.stringify(data)
        wx.request({
          url: 'http://dev.refuel.gplqdb.com:8087/miniApp/signContract/add', //路由
          data: paramData,
          method:"POST",//请求方法
          header:{ //请求头
            "content-type":"application/json"
          },
          success(e){ //回调
              //e为后台返回的值
            if(e.data === true){
              mpx.toast("添加成功");
            }else{
              mpx.toast(e.data.msg);
            }
          }
        })
        // router.navigateBack();
      } catch (error) {
        mpx.toast(error.message);
      }
    },
  },
  computed: {
    isShowValidCode() {
      return (
        this.phoneNumber.length && this.phoneNumber !== this.weixinPhoneNumber
      );
    },
    isAllowSubmit() {
      return (
        this.plateNo.length >= 7 && // 车牌长度 7,8
        this.phoneNumber.length === 11// 手机号码长度 11
        // (!this.isShowValidCode || this.validCode.length === 4) // 不需要验证码，否则验证码长度4
      );
    },
  },
  onLoad() {},
  onHide() {
    this._data.reciprocal?.pause();
  },
  onShow() {
    this._data.reciprocal?.remuse();
  },
});
</script>

<style lang="less">
.apply {
  padding: 68px 40px;
}

.plate-field {
  margin-bottom: 60px;
}
.label {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  align-items: center;
  height: 112px;
  border-bottom: 1px solid #dddddd;
  &__hd {
    height: 48px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }
  &__bd {
    padding-left: 1em;
    flex: 1;
  }
  .input {
    width: 100%;
    font-size: 32px;
    border: none;
    margin: 0;
    padding: 0;
    height: 48px;
    line-height: 48px;
  }
  .placeholder-input {
    font-size: 32px;
    color: #cccccc;
  }
  &__ft {
    height: 48px;
    line-height: 48px;
    background: url(https://etc-gas-1259440055.cos.ap-shanghai.myqcloud.com/assets/images/profile/icon-wx.png)
      no-repeat;
    background-size: 40px 40px;
    background-position: center left;
    padding-left: 50px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(22, 200, 139, 1);
  }
  &__ft_blue {
    text-align: right;
    width: 10em;
    background: none;
    color: #0094ee;
  }
  .disabled {
    color: #999;
  }
}
.btn-wrap {
  margin-top: 32px;
}

.rule-wrap {
  margin-top: 80px;
  text-align: center;
  font-size: 24px;
  color: #666666;
  .checkbox {
    transform: scale(0.7);
    position: relative;
    top: -3px;
  }
  .nav {
    color: #0094ee;
    display: inline;
    margin: 0 10px;
  }
}
</style>
