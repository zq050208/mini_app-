<template>
  <view class="certification">
    <view 
      class="popup" 
      wx:if="{{showPopUp}}"
      bindtap="hidePop"
    >

    </view>
    <button
        bindtap="onTapSubmitTo"
        class="btn-linear-green"
        style="width:50%;margin-top:50px;"
      >
        立即开通
      </button>

  </view>
</template>

<script>
import store from '@/store';
// import mpx from '@mpxjs/core'
// import mpxFetch from '@mpxjs/fetch'
// mpx.use(mpxFetch)
import md5 from 'js-md5'
mpx.createPage({
  data: {
    showPopUp: false
  },
  methods: {
    onTapSubmitTo(event) {
      console.log("openId:",store.state.auth.openId)
      // this.showPopUp = true
      const timeStamp = new Date().getTime()
      const stringA="appid=wx1ed5f152443c917c&contract_code=122&contract_display_account=18680315902&mch_id=1587821231&notify_url=https://www.qq.com/test/papay&plan_id=106&request_serial=123&timestamp="+timeStamp+"";
      const stringSignTemp=stringA+"&key=192006250b4c09247ec02edce69f6a2d" //注：key为商户平台设置的密钥key  key设置路径：微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
      let sign=md5(stringSignTemp).toUpperCase()
      console.log("sign",sign)
      console.log("timeStamp",new Date().getTime())
      // mpx.xfetch.fetch({
      //     url: 'http://dev.refuel.gplqdb.com:8086/platformManage/antennaManage/queryPageList',
      //     method: 'POST',
      //     params: {
      //       current: 1,
      //       size: 10
      //     },
      // }).then(res => {
      //     console.log("api",res.data)
      // })
      mpx.navigateToMiniProgram({
        appId:'wxbd687630cd02ce1d',  //微信签约小程序appid 固定值
        path:'pages/index/index',  // 打开小程序的页面路径 固定值
        extraData:{
            appid:'wx1ed5f152443c917c', // 发起签约的小程序appid
            contract_code:'122', //商户侧的签约协议号，由商户生成，商户侧须唯一
            contract_display_account:'18680315902', //签约用户的名称，可填用户手机号，用于页面展示,不需要对值进行urlencode，参数值不支持UTF8非3字节编码的字符，例如表情符号，所以请勿传微信昵称到该字段
            mch_id:'1587821231', //微信支付分配的商户号
            notify_url:'https://www.qq.com/test/papay', //HTTP或者HTTPS开头的回调通知url ,不需要对值进行urlencode
            plan_id:'106', //协议模板id
            request_serial:'123', //商户请求签约时的序列号，要求唯一性。序列号主要用于排序，不作为查询条件，纯数字,范围不能超过Int64的范围（9223372036854775807）
            timestamp: timeStamp, //系统当前时间，定义规则详见时间戳
            sign: sign //是对extraData内所有参数按照签名生成算法做签名，所有参数都是encode前的值参与签名
        },
        success(res) {
            // 成功跳转到签约小程序
            console.log("成功跳转:",res)
        },
        fail(res) {
          console.log("未成功跳转:",res)
            // 未成功跳转到签约小程序
        }
      })
    },
    hidePop() {
      this.showPopUp = false
    },
  },
  computed: {
    
  },
  onShow() {
    
  },
  onLoad() {
    
  },
  onUnload() {
    
  },
});
</script>

<style lang="less">
.popup{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
</style>

<script name="json">
module.exports = {
  navigationBarBackgroundColor: '#fff',
  navigationBarTextStyle: 'black', // black / white
  navigationBarTitleText: '免密签约',
  backgroundColor: '#ffffff',
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
