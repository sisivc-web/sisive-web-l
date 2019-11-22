<template>
  <div :style="{width: '100%', height: `${height}px`}"></div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    height: {
      type: Number,
      default: 80
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
