<template>
  <div>
    <div style="width: 100%">
      <ul class="header">
        <li 
          class="item"
          v-for="(item, index) in list"
          :key="index"
          :class="{'actived' : index === activedIndex}"
          @click="activedIndex = index">
          {{item.__vue__.label}}
        </li>
      </ul>
      <div class="bar">
        <span
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :class="{'actived' : index === activedIndex}"
        ></span>
      </div>
    </div>
    <div ref="tags">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import MTagItem from 'base/m-tags/m-tags-item'
export default {
  // components: {
  //   MTagItem
  // },
  mounted() {
    this.list = this.$refs.tags.children
  },
  watch: {
    activedIndex(val) {
      this.$emit('change', val, this.list[Number(val)].__vue__.label)
    }
  },
  data() {
    return {
      list: [],
      activedIndex: '0'
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
