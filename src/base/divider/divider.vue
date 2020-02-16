<template>
  <div style="margin: 10px 0px;" :style="{width: '100%', height: `${height}px`, backgroundColor: color}"></div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    height: {
      type: Number,
      default: 80
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
