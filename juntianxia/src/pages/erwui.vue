<template>
  <div class="scan">
    <div id="bcid">

    </div>
    <footer>



    </footer>
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

      startScan() {
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
          that.back()



        }
        this.start()
      },
      start() {
        if (!window.plus) return;
        scan.start();
      },
       back(){
         console.log(this.codeUrl);
         alert(this.codeUrl)
         scan.cancel();
         scan.close();
         this.$router.back(-1);
       }

    },
    mounted(){
     this.startScan()

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
      position: fixed;
      left: 0;
      bottom:0;
      line-height: 2rem;
      /*z-index: 2;*/

      button{


      }
    }
  }
</style>
