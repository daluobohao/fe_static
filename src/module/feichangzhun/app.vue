<template>
  <div class="container">
    <div class="banner">
      <img src="../../assets/feichangzhun/51-banner.jpg" />
    </div>
    <section class="page1">
      <div class="table">
        <table>
          <tbody>
            <tr>
              <th>中奖日期</th>
              <th>中奖订单号</th>
              <!-- <th>MIID</th> -->
              <th>激活时间</th>
            </tr>
            <tr v-for="data in tableSource">
              <td v-for="d in data">{{ d }}</td>
            </tr>
          </tbody>
  
        </table>
      </div>
      <p v-for="line in note" v-html="line"> </p>
    </section>
    <div class="line"></div>
    <section class="page2">
      <p style="text-align: center;margin-top: 3em; font-size: 18px;">
        限时福利，漫游用户
        <a class="gold-card color-brown"> 领飞常准金卡>></a>
      </p>
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
  
    <div class="bottom-line"></div>
  
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
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
  const envObj = location.getParam('env');
  if (envObj) {
    return envObj.value;
  }
  return '';
})();

// pageview统计
const DATA_COUNT = () => {
  const ORIGIN = 'https://netroam.mihome.xiaomi.net';
  const URL = '/activity/bossLog/logPageView';

  const url = ORIGIN + URL;

  const env = ENV;

  const params = {
    id: 0,
    whichPage: 'variflight',
    value: env,
    source: +new Date()
  }
  console.info(params);

  return superagent.get(`${url}?${formatParams(params)}`);
}

//click统计
const clickCount = () => {
  const ORIGIN = 'https://netroam.mihome.xiaomi.net';
  const URL = '/activity/bossLog/logPageView';

  const url = ORIGIN + URL;
  const params = {
    id: 0,
    whichPage: 'goldCard',
    value: 'fczClick',
    source: +new Date()
  }

  console.info(params);

  return superagent.get(`${url}?${formatParams(params)}`);
}

DATA_COUNT()
  .then(res => {
    console.info('pageview打点：', res.text)
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

const Feichangzhun = {
  name: 'Feichangzhun',
  data() {
    return {
      XMmanyuoApp: OPEN_XMmanyou_APP,
      gold: GOLD_CARD_LINK,
      tables: null,
      // page1
      note: [
        // '亲爱的小米用户：',
        // '说走就走的旅行，从一张免费机票开始---小米漫游联手飞常准，为你的任性买单。活动期间购买任一小米漫游产品，即有机会赢取<span class="color-red">飞常准金卡和一张价值1000元内的国内机票</span>（港澳台除外），手慢无!'
      ],
      // page2
      messages: [
        {
          title: '中奖规则',
          text: ['5月28日至30日连续三天，每日上午北京时间10:00起第一位成功启用订单的用户中奖。每日一位中奖用户，共计三位。']
        },
        {
          title: '兑奖细则',
          text: [
            '奖品说明：共三张国内机票，每张价值不超过1000元（包含机建、燃油和税费等在内的实际支付金额，机票价格以飞常准App展示为准），不包括港澳台地区。',
            '活动时间：2017年5月28日---2017年5月30日。',
            `抽奖资格：在活动期间购买任一小米漫游产品并激活的用户。`,
            '兑换规则：2017年 5 月28日至30日活动期间，在本页面实时开奖。中奖用户请于2017年6月9日前凭借订单截图私信微博（@小米移动），配合工作人员进行身份验证。逾期作废。',
            '请中奖用户于2017年6月30日前确认所兑换航班。逾期作废。'
          ]
        },
        {
          title: '免责声明：',
          text: [
            '同一台设备、同一MIID视为一个独立账户。每人仅限一次兑奖机会，不可重复兑奖。',
            '如对本次活动有任何问题，请随时联系微博@小米移动。飞常准金卡领取或后续使用有任何问题，请联系飞常准客服400-138-0787。',
            '仅限活动期间购买并激活小米漫游的用户参与机票抽奖。免费兑换码订单不参与此次活动。',
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
    tableSource() {
      // console.log('tables ... : ', this.tables)

      const tables = this.tables || [];

      return tables.map((item) => {
        const { date, orderid, timestamp } = item;
        const dateString = isNaN(parseInt(date, 10)) ? date : utils.formatDateString(parseInt(date, 10));
        const timeString = isNaN(parseInt(timestamp, 10)) ? timestamp : utils.formatTimeString(parseInt(timestamp, 10));
        return { dateString, orderid, timeString };
      });
    },
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
  },
  mounted() {
    // var $container = document.querySelector('.container');
    // $container.style.height = $container.scrollHeight + 'px';
    const aBtn = document.querySelector('.gold-card');
    aBtn.addEventListener('click', () => {
      clickCount()
        .then(res => {
          console.info('click打点：', res.text)
        });;
        document.location.href = this.gold;
    }, false);
  },
  created() {
    this.variflight();
  },
  methods: {
    variflight() {
      const self = this;

      // let url = 'https://snetroam.mihome.xiaomi.net/activity/tactivity/variflight'; // test url
      let url = 'https://netroam.mihome.xiaomi.net/activity/tactivity/variflight'
      const origin = window.location.origin;
      const dateObj = location.getParam('date');
      if (dateObj) {
        url = `${url}?${dateObj.key}=${dateObj.value}`;
      }
      return superagent.get(url)
        .end((err, response) => {
          if (err) {
            console.error('variflight error: ' + err);
            return;
          }

          const body = response.body || JSON.parse(response.text)

          const { errCode, errMsg, result } = body;

          if (errCode != 0) {
            console.error(errMsg);
            return;
          }

          const { data } = result;

          self.tables = data;
        })
    }
  }
};

export default Feichangzhun;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../../assets/style/reset.css';

body {
  position: relative;
  color: white;
  font-size: 12px;
  line-height: 1.4;
  font-family: 'MI LANTING_GB OUTSIDE YS', 'FZLanTingHei-M-GBK', Arial, Verdana, Sans-serif;
  background: #162c5b;
}

.bottom-line {
  width: 100%;
  height: 0.14rem;
  background: url('../../assets/feichangzhun/bottom-line.png') repeat-x bottom center;
  background-size: 100%;
}

li {
  list-style-position: inside;
}

.table table {
  margin: 0 auto;
  font-size: 12px;
  border-collapse: initial;
  border-spacing: 15px;
}

.table td {
  color: #f6e0bd;
}

.table th,
.table td {
  text-align: center;
  /*width: 25%;*/
}

.container {
  position: relative;
  overflow: auto;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #162c5b;
}

.banner,
.banner img {
  width: 100%;
  line-height: 1;
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
  padding: 44px 10px 42px 10px;
  font-size: 14px;
  font-family: 'Adobi Heiti Std';
}

section.page2 {}

section.page3 {}

.line {
  height: 1px;
  background: url('../../assets/feichangzhun/line.png') repeat-x center center;
  background-size: 100%;
}

section>.group {
  margin-top: 41px;
}

h3 {
  line-height: 1;
  font-size: 16px;
  font-family: 'MI LANTINGBOLD GBKI BOLD';
  margin-bottom: 17px;
}

.page3 .group p,
li {
  margin-bottom: 19px;
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
  border-bottom: 1px solid #f6e0bd;
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
  background: url('../../assets/feichangzhun/logo-group.png') no-repeat top center;
  background-size: 100%;
}

.logo-text {
  margin-top: 1em;
  text-align: center;
}

.footer {
  height: 2.04rem;
  text-align: center;
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



/* cloud */

section.cloud-group {
  position: static;
}

.cloud {
  position: absolute;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
}

.cloud-1 {
  width: 49px;
  height: 32px;
  top: 202px;
  right: -30px;
  background-image: url('../../assets/feichangzhun/cloud-1.png');
}

.cloud-2 {
  width: 36px;
  height: 18px;
  top: 385px;
  left: -10px;
  background-image: url('../../assets/feichangzhun/cloud-2.png');
}

.cloud-3 {
  width: 49px;
  height: 32px;
  top: 920px;
  right: -7px;
  background-image: url('../../assets/feichangzhun/cloud-3.png');
}
</style>