<template>
  <span>
    <div
      ref="popper"
      style="width:220px;"
      class="item-popover"
      v-show="showPopper"
      :style="{backgroundColor: themeColor, borderColor: themeColor}">
      <watchitem :watchId="watchId" :themeColor="themeColor"></watchitem>
      <div class="item__arrow" :style="{borderRightColor: themeColor}"></div>
    </div>
    <slot name="reference"></slot>
  </span>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper'
import { on, off } from 'element-ui/src/utils/dom'
import watchitem from './watchitem'
export default {
  name: 'eventpopover',
  mixins: [Popper],
  props: {
    watchId: String,
    themeColor: {
      type: String,
      default: '#46A58F'
    }
  },
  components: {
    watchitem
  },
  data () {
    return {
      
    }
  },
  mounted() {
    let reference = this.referenceElm = this.reference || this.$refs.reference
    // const popper = this.popper || this.$refs.popper
    on(document, 'click', this.handleDocumentClick)
  },
  destroyed () {
    this.doDestroy()
    off(document, 'click', this.handleDocumentClick)
  },
  methods: {
    handleDocumentClick(e) {
      let reference = this.reference || this.$refs.reference;
      const popper = this.popper || this.$refs.popper;
      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }
      if (!this.$el ||
        !reference ||
        this.$el.contains(e.target) ||
        reference.contains(e.target) ||
        !popper ||
        popper.contains(e.target)) return
      this.showPopper = false
      this.$destroy() // 需要手动destroy
      // this.$emit('hide')
      // this.doDestroy()
    }
  }
}
</script>

<style scoped>
.item-popover {
    position: absolute;
    /* background: #46A58F; */
    min-width: 250px;
    max-height: 300px;
    border-radius: 2px;
    border: 1px solid transparent;
    padding: 0px;
    z-index: 2000;
    font-size: 12px;
    /* overflow: scroll; */
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
  }

  .item-popover .item__arrow,
  .item-popover .item__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .item-popover .item__arrow {
    border-width: 6px
  }

  .item-popover .item__arrow::after {
    content: " ";
    border-width: 6px
  }

  .item-popover {
    margin-left: 5px
  }

  .item-popover .item__arrow {
    top: 10px; /* 50% */
    left: -6px;
    margin-bottom: 3px;
    /* border-right-color: #46A58F; */
    border-left-width: 0
  }

  .item-popover .item__arrow::after {
    bottom: -6px;
    left: 1px;
    /* border-right-color: #46A58F; */
    border-left-width: 0
  }
</style>