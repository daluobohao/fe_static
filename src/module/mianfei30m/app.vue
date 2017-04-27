<template>
  <div class="container">
    <div class="banner">
      <img src="../../assets/mianfei30m/banner.jpg" />
    </div>
    
    <section class="page3">
      <div class="group">
        <h3>{{ tips.title }}</h3>
        <p v-for="tip in tips.text" v-html="tip"></p>  
      </div>
    </section>

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
    
  </div>
</template>

<script>
require('../../utils/support_rem.js');

const mianfei30m = {
  name: 'mianfei30m',
  data() {
    return {
      tips: {
        title: '',
        text: [
          '30MB全球流量免费领',
          '小米漫游两岁啦~',
          '欧洲41国、中国香港等热门国家和地区，“买两天赠一天，买四天赠三天”特惠进行中，全场流量包套餐低至3折起，按天付费套餐，当日流量无上限。',
          '小米漫游承诺：真正“零门槛，免费用”！ 价值49元的全球51国通用流量包（30MB）任性送~'
        ]
      },
      messages: [
        
        {
          title: '使用说明：',
          text: [
            '请前往“已购套餐”列表页查看您的30MB全球免费流量包。',
            '需到达境外目的地后，方可开启使用，启用时无需连网。',
            '中国大陆地区开启无效，非本套餐覆盖地区开启无效。',
            '本套餐自发放之日起，7日内有效，逾期作废。请及时启用。',
            '本套餐自启用时刻起，24小时内有效，逾期作废。',
            '本套餐30MB流量使用完毕后自动断网，断网后不会收取额外费用。',
            '本套餐启用时会占用一个卡槽'
          ]
        },
        {
          title: '本套餐覆盖地区：',
          text: [
            '中国香港、中国澳门、中国台湾、韩国、泰国、美国、新加坡、澳大利亚、英国、意大利、奥地利、瑞典、丹麦、印度尼西亚、爱尔兰、马来西亚、法国、德国、加拿大、菲律宾、新西兰、葡萄牙、西班牙、荷兰、捷克、罗马尼亚、立陶宛、波兰、挪威、克罗地亚、土耳其、希腊、马耳他、以色列、匈牙利、阿尔巴尼亚、梵蒂冈、摩纳哥、苏格兰、奥克尼群岛（英国）、北爱尔兰（英国）、赫布里底群岛（爱尔兰）、设得兰群岛（爱尔兰）、克里特岛（希腊）、基克拉泽（希腊）、爱奥尼亚（希腊）、伯罗奔尼撒（希腊)、科西嘉岛(意大利）、圣马力诺、撒丁岛（意大利）、西西里岛（意大利）'
          ]
        },
        {
          title: '活动说明：',
          text: [
            '同一台设备、同一MIID视为一个独立账户。同一账户仅有一次机会参加本次活动。',
            '如对本次活动有任何问题，也请随时联系，微博：小米移动',
            '本活动最终解释权归小米公司所有。'
          ]
        }
      ],
      // page3
      others: {
        title: '',
        text: [
          '截至到2017年3月20日，小米漫游支持的机型有：小米3联通版/电信版、小米4、小米4c、小米4s、小米5、小米5s、小米5Plus、小米5s Plus、小米Max、小米Note标准版、小米Note顶配版、小米Note2、小米MIX、红米Note2、红米Note3、红米Note4、、红米Pro、红米3S、红米4、红米4A、红米4X，更多机型正在陆续适配中。（小米4移动版仅可使用2G网络）'
        ]
      }
    };
  }, // endof data
};

export default mianfei30m;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../../assets/style/reset.css';

  body {
    position: relative;
    color: black;
    font-size: 14px;
    font-family: 'MI LANTING_GB OUTSIDE YS', 'FZLanTingHei-M-GBK', Arial, Verdana, Sans-serif;
    /*background: #162c5b;*/
    padding-bottom: 5em;
  }

  li {
    list-style-position: inside;
  }

  .container {
    position: relative; 
    overflow: auto;
    height: 100%;
    width: 100%;
    background-size: 100% 0.14rem;
    /*background-color: #162c5b;*/
  }

  .banner {
    line-height: 0;
  }

  .banner, .banner img {
    width: 100%;
  }

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

</style>