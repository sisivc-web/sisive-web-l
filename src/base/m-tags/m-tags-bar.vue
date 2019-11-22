<template>
  <div>
    <div style="width: 100%">
      <ul class="header">
        <li 
          class="item"
          v-for="(item, index) in value"
          :key="index"
          :class="{'actived' : index === activedIndex}"
          :style="{ width: width === undefined ? '' : `${width}px` }"
          @click="activedIndex = index">
          {{item}}
        </li>
      </ul>
      <div class="bar">
        <span
        class="item"
        v-for="(item, index) in value"
        :key="index"
        :class="{'actived' : index === activedIndex}"
        :style="{ width: width === undefined ? '' : `${width}px` }"
        >
        </span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    width: {
      type: Number,
      default: undefined
    }
  },
  watch: {
    activedIndex(val) {
      this.$emit('change', val)
    }
  },
  data() {
    return {
      activedIndex: this.$route.query.activedIndex ? Number(this.$route.query.activedIndex) : 0
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.header
  @extend .flex
  @extend .flex-row
  @extend .flex-start
  width: 100%
  .item
    @extend .flex-center
    @extend .pointer
    width: 10%
    height: 30px
    color: $color-text-gray_1
    font-size: $font-size-level_2
    font-weight: 500
  .actived
    color: $color-text-blue_0
.bar
  @extend .flex
  @extend .flex-row
  @extend .flex-start
  width: 100%
  height: 2px
  background-color: $color-layer-gray_5
  .item
    @extend .flex-center
    @extend .pointer
    width: 10%
    height: 100%
  .actived
    background-color: $color-back-blue_0
</style>