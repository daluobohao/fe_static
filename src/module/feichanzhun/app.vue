<template>
  <div class="container">
    <div class="banner">
      <img src="../../assets/feichanzhun/51-banner.jpg" />
    </div>
    <section class="page1"> 
      <p v-for="line in note" v-html="line"> </p>
    </section>
    <div class="line"></div>
    <section class="page2">
      <div class="group" v-for='msg in messages'>
        <h3>{{ msg.title }}</h3>
        <div v-if="msg.text.length > 1">
          <ol>
            <li v-for="t in msg.text" v-html="t"></li>
          </ol>
        </div>
        <p v-else>{{ msg.text[0] }}</p>
      </div>
      
    </section>
    <section class="page3">
      <div class="group">
        <h3>{{ others.title }}</h3>
        <p v-for="other in others.text" v-html="other"></p>  
      </div>
    </section>
    <section class="logo-group">
      <div class="logo-group-img"></div>
      <p class="logo-text">联合出品</p>
    </section>
    <section class="footer" v-if="hasFooter">
      <a class="footer-btn" :href="XMmanyuoApp">启动小米漫游</a>
    </section>
  </div>
</template>

<script>
require('../../utils/support_rem.js');
import * as utils from '../../utils';
import superagent from 'superagent';

const { location, formatParams } = utils;

// 金卡链接
const GOLD_CARD_LINK = 'http://app.veryzhun.com/activity/get3mGoldCard?channel=xiaomimy';
// 打开小米漫游app
const OPEN_XMmanyou_APP = 'com.miui.virtualsim://main?launchfrom=new_activities';


const ENV = (() => {
  const envObj = location.getParam('env')
  if (envObj) {
    return envObj.value;
  }
  return '';
})();

// 数据打点统计
const DATA_COUNT = () => {
  const ORIGIN = 'https://service.10046.mi.com';
  const URL = '/boss_log/page_view_log';

  const url = ORIGIN + URL;

  const env = ENV;

  const params = {
    miid: 0,
    page: 'variflight',
    value: env,
    timestamp: +new Date()
  }

  return superagent.post(url).send( formatParams(params) );
}

DATA_COUNT()
  .then(res => {
    console.info('数据打点：', res)
  });

const checkXMmanyou = () => {
  // 根据URL参数判断，带有参数'env=XMmanyou'
  return ENV === 'XMmanyou';
}
console.info('checkXMmanyou: ', checkXMmanyou());

const checkMIUI = () => {
  // 根据ua判断，ua string中有‘MIUI’
  const ua = window.navigator.userAgent;
  return ua.indexOf('MIUI') > -1;
}
console.info('checkMIUI: ', checkMIUI());

const Feichanzhun = {
  name: 'Feichanzhun',
  data() {
    return {
      XMmanyuoApp: OPEN_XMmanyou_APP,
      // page1
      note: [
        '亲爱的小米用户：',
        '说走就走的旅行，从一张免费机票开始---',
        '小米漫游联手飞常准，为你的任性买单。',
        '活动期间购买任一小米漫游产品，即有机会赢取',
        '<span class="color-red">飞常准金卡和一张价值1000元内的国内机票</span>（',
        '港澳台除外），手慢无!'
      ],
      // page2
      messages: [
        {
          title: '中奖规则',
          text: ['活动期间订单号12~16位的五位数与2017年5月8日体育彩票排列五号码做减法，结果最小的三位用户中奖。如结果相等，则下单时间较早者得。']
        },
        {
          title: '兑奖细则',
          text: [
            '奖品说明：共三张国内机票，每张价值不超过1000元（包含机建、燃油和税费等在内的实际支付金额，机票价格以飞常准App展示为准），不包括港澳台地区。',
            '活动时间：2017年4月26日---2017年5月7 日。',
            `抽奖资格：在活动期间购买任一小米漫游产品并领取飞常准金卡的用户<a class="gold-card color-brown" href="${ GOLD_CARD_LINK }">点击立即领取金卡>></a>`,
            '兑换规则：在2017年 5 月9 日，小米移动官方微博（@小米移动）发榜，公布三名中奖者的订单号。中奖用户请于2017年5月11日前凭借订单截图私信微博（@小米移动），配合工作人员进行身份验证。逾期作废。',
            '请中奖用户于2017年5月31日前确认所兑换航班。逾期作废。'
          ]
        },
        {
          title: '免责声明：',
          text: [
            '同一台设备、同一MIID视为一个独立账户。同一账户仅有一次机会参加本次活动。免费兑换码订单不参与此次活动。',
            '如对本次活动有任何问题，请随时联系微博：小米移动。飞常准金卡领取或后续使用有任何问题，请联系飞常准客服400-138-0787。',
            '仅限活动期间购买小米漫游、领取飞常准金卡的用户参与机票抽奖。',
            '本活动最终解释权归小米公司所有。'
          ]
        }
      ],
      // page3
      others: {
        title: '其他说明',
        text: [
          '截至2017年3月20日，小米漫游支持的机型有：小米3联通版/电信版、小米4、小米4c、小米4s、小米5、小米5s、小米5Plus、小米5s Plus、小米Max、小米Note标准版、小米Note顶配版、小米Note2、小米MIX、红米Note2、红米Note3、红米Note4、、红米Pro、红米3S、红米4、红米4A、红米4X，更多机型正在陆续适配中。（小米4移动版仅可使用2G网络）',
          '找不到小米漫游？点击小米手机<span class="color-brown">系统设置</span>—<span class="color-brown">双卡和移动网络</span>—<span class="color-brown">小米漫游</span>，开启你的无限流量之旅！'
        ]
      }
    };
  }, // endof data
  computed: {
    hasFooter() {
      /*
        底部按钮显示
        - 显示：
          小米漫游 且 MIUI系统
      */
      const isXMmanyou = checkXMmanyou();
      const isMIUI = checkMIUI();

      return isXMmanyou && isMIUI;
    }
  }
};

export default Feichanzhun;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../../assets/style/reset.css';

  body {
    position: relative;
    color: white;
    font-size: 14px;
    font-family: 'MI LANTING_GB OUTSIDE YS', 'FZLanTingHei-M-GBK', Arial, Verdana, Sans-serif;
    background: #162c5b;
  }

  li {
    list-style-position: inside;
  }

  .container {
    position: relative; 
    overflow: auto;
    height: 100%;
    width: 100%;
    background: #162c5b;
  }

  .banner, .banner img {
    width: 100%;
  }
/*70 132*/
  /* page */
  section {
    position: relative;
    overflow: auto;
    padding: 0 0.46rem;
    box-sizing: border-box;
  }

  .group {
    /*margin-bottom: 50px;*/
  }

  

  section.page1 {
    height: 3.96rem;
    padding-top: 0.88rem;
    font-size: 15px;
    font-family: 'Adobi Heiti Std';
  }

  section.page2 {
  }

  section.page3 {
    
  }

  .line {
    height: 3px;
    background: url('../../assets/feichanzhun/line.png') repeat-x center center;
    background-size: 100%;
  }
  
  section > .group {
    margin-top: 57px;
  }

  h3 {
    font-size: 16px;
    font-family: 'MI LANTINGBOLD GBKI BOLD';
    margin-bottom: 17px;
  }

  .page3 .group p,
  li {
    margin-bottom: 20px;
  }

  section:last-child,
  .group:last-child,
  .page3 .group p:last-child,
  li:last-child {
    margin-bottom: 0;
  }

  .color-red {
    color: #ce3f63;
  }

  .color-brown {
    color: #f6e0bd;
  }

  .gold-card {
    text-decoration: underline;
  }
  
  .logo-group {
    /*position: relative;*/
    width: 100%;
    height: 3.64rem;
    text-align: center;
    line-height: 1;
  }

  .logo-group-img {
    /*position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);*/
    display: inline-block;
    width: 2.34rem;
    height: 1.04rem;
    margin-top: 0.88rem;
    background: url('../../assets/feichanzhun/logo-group.png') no-repeat top center;
    background-size: 100%;
  }

  .logo-text {
    margin-top: 1em;
    text-align: center;
  }
  
  .footer {
    height: 2.04rem;
    text-align: center;
    background: url('../../assets/feichanzhun/bottom-line.png') repeat-x bottom center;
    background-size: 100% 0.14rem;
  }

  .footer-btn {
    overflow: hidden;
    display: inline-block;
    width: 307px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    color: white;
    background-color: #33b4ff;
    font-size: 12px;
  }

</style>