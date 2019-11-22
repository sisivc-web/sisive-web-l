<template>
  <div class="contain" :class="{'disabledSelect': disabled}">
    <select class="select" :style="{width: `${width}px`}" v-model="currentValue">
      <option value='' disabled selected style='display:none;'>{{placeholder}}</option>
      <option
        v-for="(item, index) in options" :key="index"
        :value="customValueIsAll ? item : (customValue ? item[customValue] : item.value)"
        :style="{display: disabledOptions.indexOf(customValue ? item[customValue] : item.value) >= 0 ? 'none' : ''}"
      >{{`${customName ? item[customName] : item.name}`}}</option>
    </select>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {},
    width: {
      type: Number,
      default: 175
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    customName: {
      type: String,
      default: undefined
    },
    customValue: {
      type: String,
      default: undefined
    },
    // customValueIsAll如果为true,则customValue失效,option的value值为数组中的整个对象
    customValueIsAll: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledOptions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    currentValue: {
      get: function() {
        return this.value
      },
      set: function(val) {
        this.$emit('input', val)
        this.$emit('change')
      }
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
.contain
  height: 38px
  border: 1px solid $color-layer-gray_3
  border-radius: 2px
  margin: 0 15px
  padding: 0
  .select
    height: 100%
    margin-right: 5px
    color: $color-text-gray_5
    font-size: $font-size-level_2
    padding: 0 10px
    background-color: $color-back-white_0
    border: 0px
.disabledSelect
  border: 0px
  pointer-events: none
  .select
    background-color: $color-back-gray_3
    color: $color-text-black_0
.contain[type="inline"]
  border: 0px
  .select
    background-color: rgba(0, 0, 0, 0)
</style>