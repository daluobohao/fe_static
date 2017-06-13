<template>
  <div id="mi-fans-card-privilege" class="page">
    <img id="bg-img" src="../../assets/mifanscardprivilege/bg.png" />
    <a id="btn"></a>
    <div id="mask" v-if="showMask">
      <img id="arrow-img" src="../../assets/mifanscardprivilege/arrow.png" />
    </div>
  </div>
</template>

<script>
// 米粉卡返流量特权说明页

const isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent);
const apkUri = "https://cdn.cnbj0.fds.api.mi-img.com/resources/SecurityCenter.apk";

const MiFansCardPrivilege = {
  name: 'MiFansCardPrivilege',
  data() {
    return {
      showMask: false,
    };
  },
  mounted() {
    const btn = document.querySelector('#btn');
    btn.addEventListener('click', this.btnClickHandler, false);
    const root = document.querySelector('#mi-fans-card-privilege');
    root.addEventListener('click', this.rootClickHandler, false);
    setTimeout(function() {
      if (!isWeixinBrowser) {
        window.open(apkUri);        
      }
    }, 1000);
  },
  methods: {
    btnClickHandler(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
      if (isWeixinBrowser) {
        this.showMask = true;
        return;
      }
      window.open(apkUri);
    },
    rootClickHandler() {
      this.showMask = false;
    }
  },
};

export default MiFansCardPrivilege;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/style/reset.css';

#mi-fans-card-privilege {
  position: relative;
  background-color: #f8f8f8;
  max-width: 720px;
  margin: 0 auto;
}

#bg-img {
  width: 100%;
}

#btn {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100px;
  user-select: none;
}

#mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
}

#arrow-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>