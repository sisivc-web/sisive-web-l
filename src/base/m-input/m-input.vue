<template>
  <div class="contain">
    <input
      class="input"
      :class="{disabledInput: disabled}"
      :readonly="disabled"
      :style="{width: `${width}`}"
      v-model="currentValue"
      :placeholder="placeholder"
      :onkeyup="regular"
      :onafterpaste="regular"
      @keyup.enter="_enter"/>
    <div class="title">
      <span class="warning-title" v-if="warning">{{warningTitle}}</span>
      <span class="tips-title" v-if="showTips" :style="{color: warning ? 'red' : ''}">
        {{`${warning ? '(' : ''}${tips}${warning ? ')' : ''}`}}
      </span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {},
    width: {
      type: String,
      default: '180px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    warningTitle: {
      type: String,
      default: ''
    },
    showTips: {
      type: Boolean,
      default: false
    },
    tips: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    regular: {
      type: String,
      default: ''
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
  },
  methods: {
    _enter() {
      this.$emit('enter')
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.contain
  position: relative
  .input
    // width: 180px
    height: 38px
    border: 1px solid $color-layer-gray_3
    margin: 0 15px
    color: $color-text-black_0
    font-size: $font-size-level_2
    padding: 0 10px
    border-radius: 2px
  .disabledInput
    pointer-events: none
    cursor: default
    border: 0px
    background-color: $color-back-gray_3
  .title
    position: absolute
    left: 20px
    bottom: -15px
    white-space: nowrap
  .warning-title
    color: red
    font-size: $font-size-level_1
    // position: absolute
    // left: 20px
    // top: -15px
  .tips-title
    color: $color-text-gray_11
    font-size: $font-size-level_1
.contain[type="inline"]
  .input
    border: 0px
    background-color: rgba(0, 0, 0, 0)
    text-align: center
</style>