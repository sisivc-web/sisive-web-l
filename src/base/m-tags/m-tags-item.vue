<template>
  <div class="container" v-show="this.$parent.$refs.tags && this.$parent.$refs.tags.children[Number(this.$parent._data.activedIndex)].__vue__.label === this.label">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.container
  width: 100%
  padding: 0px
</style>
