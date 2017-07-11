<template>
  <div id="page">
    <img v-for="imgSrc in imgs" :src="imgSrc" alt='新手教程'></img>
  </div>
</template>

<script>
import superagent from 'superagent';
import { formatParams } from '../../utils';

// pageview统计
const DATA_COUNT = () => {
  const ORIGIN = 'https://netroam.mihome.xiaomi.net';
  const URL = '/activity/bossLog/logPageView';

  const url = ORIGIN + URL;

  const params = {
    id: 0,
    whichPage: 'newbie1',
    value: 'guide01',
    source: +new Date()
  }

  return superagent.get(`${url}?${formatParams(params)}`);
}

const GuideForNewUser = {
  name: 'GuideForNewUser',
  data() {
    return {
      imgs: [
        'https://cdn.cnbj0.fds.api.mi-img.com/resources/c4bccd2499bb44eb80a051a0740a4e85?thumb=1&w=720&h=1151', // guide_01
        'https://cdn.cnbj0.fds.api.mi-img.com/resources/6aff3b1c0208447c8429fb2f0e86e44e?thumb=1&w=720&h=400', // guide_02
        'https://cdn.cnbj0.fds.api.mi-img.com/resources/69fe2c9c6982472392f6da420030fa77?thumb=1&w=720&h=1850', //guide_03
        'https://cdn.cnbj0.fds.api.mi-img.com/resources/bd1313fbb8ad4d76bb58a9b5c24f19b0?thumb=1&w=720&h=829', //guide_04
        'https://cdn.cnbj0.fds.api.mi-img.com/resources/a42fed50c3154970b45975a76e91bbab?thumb=1&w=720&h=1119', //guide_05
      ]
    };
  },
  mounted() {
    DATA_COUNT().then(() => {
      console.info('page view log');
    })
  }
};

export default GuideForNewUser;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/style/reset.css';

  #page {
    width: 100%;
    overflow: auto;
  }

  img {
    display: block;
    width: 100%;
  }

</style>