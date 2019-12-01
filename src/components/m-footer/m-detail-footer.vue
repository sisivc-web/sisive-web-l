<template>
  <div class="foot">
    <div>shcompetition.com</div>
    <div class="link-div">
      <a href="javascript:;" style="background-image: url(static/image/sisivc/foot/w0.png);"></a>
      <a href="javascript:;" style="background-image: url(static/image/sisivc/foot/b0.png);"></a>
      <a href="javascript:;" style="background-image: url(static/image/sisivc/foot/f0.png);"></a>
      <a href="javascript:;" style="background-image: url(static/image/sisivc/foot/tw0.png);"></a>
      <a href="javascript:;" style="background-image: url(static/image/sisivc/foot/ins0.png);"></a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/base"
@import "~common/stylus/variable"
.foot 
  @extend .flex
  @extend .flex-row
  @extend .flex-between
  width: calc(100% - 360px);
  min-width: 1140px;
  margin: 0 auto;

  .link-div {
    text-align:center;
    margin-top: 140px;
    margin-bottom: 80px;
    height: 40px;
  }
  .link-div a {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-image: url('~static/image/sisivc/foot/f.png');
    background-repeat: no-repeat;
    background-size: 40px 40px;
    margin-right:75px;
    position: relative;
  }
  .link-div a:nth-child(1):hover {
    background-image: url('~static/image/sisivc/foot/w.png')!important;
  } 
  .link-div a:nth-child(2):hover {
    background-image: url('~static/image/sisivc/foot/b.png')!important;
  } 
  .link-div a:nth-child(3):hover {
    background-image: url('~static/image/sisivc/foot/f.png')!important;
  } 
  .link-div a:nth-child(4):hover {
    background-image: url('~static/image/sisivc/foot/tw.png')!important;
  } 
  .link-div a:nth-child(5):hover {
    background-image: url('~static/image/sisivc/foot/ins.png')!important;
  }
</style>
