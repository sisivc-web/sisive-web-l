<template>
  <div>
    <div class="dropdown">
      <button @click="isOpen = !isOpen">dropdown</button>
      <ul class="dropdown-menu">
        <li>菜单一</li>
        <li>菜单二</li>
        <li>菜单三</li>
        <li>菜单四</li>
        <li>菜单五</li>
        <li>菜单一</li>
        <li>菜单二</li>
        <li>菜单三</li>
        <li>菜单四</li>
        <li>菜单五</li>
        <li>菜单一</li>
        <li>菜单二</li>
        <li>菜单三</li>
        <li>菜单四</li>
        <li>菜单五</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
.dropdown-menu
  position: absolute
  top: 100%
  left: 0
  z-index: 1000
  display: none
  float: left
  min-width: 100px
  padding: 5px 0
  margin: 2px 0 0
  font-size: 14px
  list-style: none
  background-clip: padding-box
  border: 1px solid red
  color: #404040
  background-color: white
  &:hover
    display: block
.dropdown
  position: relative
  &:hover
    .dropdown-menu
      display: block
</style>
