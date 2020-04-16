<template>
  <div class="scan">
    <div id="bcid">

    </div>
<!--    <footer>-->
<!--      <button @click="startRecognize">1.创建控件</button>-->
<!--      <button @click="startScan">2.开始扫描</button>-->
<!--      <button @click="cancelScan">3.结束扫描</button>-->

<!--      <button @click="closeScan">4.关闭控件</button>-->
<!--    </footer>-->
  </div>
</template>

<script type='text/ecmascript-6'>
  let scan = null;

  export default {
    data() {
      return {
        codeUrl: '',
      }
    },
    methods: {

    },
    mounted() {

      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode('bcid');
      scan.onmarked = onmarked;

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR';
            break;
          case plus.barcode.EAN13:
            type = 'EAN13';
            break;
          case plus.barcode.EAN8:
            type = 'EAN8';
            break;
          default:
            type = '其它' + type;
            break;
        }
        result = result.replace(/\n/g, '');
        that.codeUrl = result;
        that.$store.commit('tocode',result);
        scan.close();
        that.$router.push('/diancan/dianlei');
      }
      scan.start();
    }
  }
</script>
<style lang="less">
  .scan {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:3rem;
      text-align: center;
      color: #fff;
      background: #ccc;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 1rem;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
    }
  }
</style>
