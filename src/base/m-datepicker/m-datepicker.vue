<template>
  <div class="date-pickers" :style="{  width: `${width}px`, height: `${height}px`}">
    <div class="date-show" @click="trueDateBox">
      <input type="text" placeholder="选择日期" :value="_beTime(currentValue)" readonly/>
      <div class="logo"></div>
    </div>
    <transition name="fade">
      <div v-if="dateBoxFlag" class="date-box">
        <div class="day-select">
          <div class="arrow">
            <button @click="reduceYear">&laquo;</button>
            <button @click="reduceMonth">&lt;</button>
          </div>
          <div class="middle">
            <input class="year-input" type="text" @click="selected" v-model="year" />年
            <input class="month-input" type="text" @click="selected" v-model="month" />月
          </div>
          <div class="arrow">
            <button @click="addMonth">&gt;</button>
            <button @click="addYear">&raquo;</button>
          </div>
        </div>
        <div class="day-screen">
          <div class="week">
            <span v-for="item in week" :key="item">{{item}}</span>
          </div>
          <div class="selectDay" @click="selectDay">
            <span v-for="(item, index) in previousMonth" :key="`previousMonth${index}`" class="previousMonth">{{item}}</span>
            <span v-for="(item, index) in monthDay[month - 1]" :key="`currentMonth${index}`" :class="day === item ? 'active' : ''" class="currentMonth">{{item}}</span>
            <span v-for="(item, index) in nextMonth" :key="`nextMonth${index}`" class="nextMonth">{{item}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {},
    width: {
      type: Number,
      default: 180
    },
    height: {
      type: Number,
      default: 40
    }
  },
  mounted() {
    document.addEventListener('click', this._clickToClose)
  },
  beforeDestroy() {
    document.removeEventListener('click', this._clickToClose)
  },
  computed: {
    currentValue: {
      get: function() {
        return this.value
      },
      set: function(val) {
        this.$emit('input', val)
      }
    }
  },
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      dateBoxFlag: false,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      previousMonth: [],
      nextMonth: []
    }
  },
  watch: {
    year(val) {
      let reg = /^[1-9]\d*$/g
      if (!reg.test(val)) this.year = (new Date()).getFullYear()
      if (val < 0) {
        this.year = 1
      } else if (val > 9999) {
        this.year = 9999
      }
      this.isLeapYear(val) ? this.monthDay[1] = 29 : this.monthDay[1] = 28
      this.dayScreen()
      this._setCurrentValue()
    },
    month(val) {
      let reg = /^[1-9]\d*$/g
      if (!reg.test(val)) this.month = (new Date()).getMonth() + 1
      if (val < 1) {
        this.month = 1
      } else if (val > 12) {
        this.month = 12
      }
      this.dayScreen()
      this._setCurrentValue()
    },
    day() {
      this._setCurrentValue()
    }
  },
  methods: {
    _beTime(val) {
      return this.noValue(this.value) ? '' : this.beTime(val, 'yyyy-MM-dd')
    },
    _setCurrentValue() {
      let time = `${this.year}-${this.month}-${this.day}`
      this.currentValue = Date.parse(new Date(time))
    },
    // 点击空白处
    _clickToClose(e) {
      if (!this.$el.contains(e.target)) this.dateBoxFlag = false
    },
    // 显示日期盒子并且初始化
    trueDateBox() {
      let date = this.noValue(this.currentValue) ? new Date() : new Date(this.currentValue)
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
      this.dayScreen()
      this._setCurrentValue()
      this.dateBoxFlag = true
    },
    // 增减年份
    addYear() {
      this.year++
    },
    reduceYear() {
      this.year--
    },
    // 增减月份
    addMonth() {
      if (this.month === 12) {
        this.month = 1
        this.year++
      } else {
        this.month++
      }
    },
    reduceMonth() {
      if (this.month === 1) {
        this.month = 12
        this.year--
      } else {
        this.month--
      }
    },
    // 获取input里的文字#
    selected(e) {
      e.target.select()
    },
    // 选择日期#
    selectDay(e) {
      let targetClass = e.target.className
      // 如果点击的是上个月的日期
      if (targetClass === 'previousMonth') {
        if (this.month === 1) {
          this.month = 12
          this.year--
        } else {
          this.month = this.month - 1
        }
      } else if (targetClass === 'nextMonth') { // 如果点击的是下个月的日期
        if (this.month === 12) {
          this.month = 1
          this.year++
        } else {
          this.month = this.month + 1
        }
      }
      this.day = parseInt(e.target.innerText)
      this.dateBoxFlag = false
    },
    // 日期显示#生成需要显示的上个月的数组和下个月的数组
    dayScreen() {
      // 获取当月1号为星期几
      let firstDayWeek = new Date(this.year, this.month - 1, 1).getDay()
      // 确定上个月有几天
      let preMonthDay = null
      preMonthDay = this.month === 1 ? this.monthDay[11] : this.monthDay[this.month - 2]
      // 天数->数组
      for (let i = 0; i < preMonthDay; i++) {
        this.previousMonth[i] = i + 1
      }
      this.previousMonth = firstDayWeek === 0 ? this.previousMonth.slice(-7) : this.previousMonth.slice(-firstDayWeek)
      // 获取当月最后一天为星期几
      let lastDayWeek = new Date(this.year, this.month - 1, this.monthDay[this.month - 1]).getDay()
      let nextMonthDay = null
      nextMonthDay = this.month === 12 ? this.monthDay[0] : this.monthDay[this.month]
      for (let i = 0; i < nextMonthDay; i++) {
        this.nextMonth[i] = i + 1
      }
      this.nextMonth = lastDayWeek === 6 ? this.nextMonth = this.nextMonth.slice(0, 7) : this.nextMonth = this.nextMonth.slice(0, 6 - lastDayWeek)
    },
    // 判断是否为闰年#
    isLeapYear(year) {
      return (year % 100 == 0 ? (year % 400 == 0 ? true : false) : (year % 4 == 0 ? true : false)) // eslint-disable-line
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.date-pickers
  padding: 0 10px
  margin: 0 15px
  position: relative
  border: 1px solid $color-layer-gray_3
  border-radius: 2px
  user-select: none
  .date-show
    @extend .flex
    @extend .flex-row
    @extend .flex-between
    width: 100%
    height: 100%
    input
      height: 100%
      width: 130px
      color: $color-text-black_0
      font-size: $font-size-level_2
      cursor: default
    .logo
      width: 18px
      height: 18px
      background-size: 100% 100%
      background-image: url('~static/image/base-icon/datepicker.png')
  .date-box
    width: 300px
    padding: 5px
    border: 1px solid $color-layer-gray_3
    border-radius: 2px
    background: $color-back-white_0
    position: absolute
    top: 46px
    left: 0px
    z-index: 9999
    .day-select
      @extend .flex
      @extend .flex-row
      @extend .flex-between
      width: 100%
      height: 40px
      line-height: 30px
      border-bottom: 1px solid $color-layer-gray_3
      .arrow
        @extend .flex
        @extend .flex-row
        @extend .flex-around
        width: 20%
        font-size: $font-size-level_2
        color: $color-text-gray_9
      .middle
        @extend .flex
        @extend .flex-row
        @extend .flex-around
        width: 60%
        font-size: $font-size-level_2
        color: $color-text-gray_9
        font-weight: bold
        .year-input
        .month-input
          height: 30px
          border: 0px
          padding: 5px
          text-align: center
          &:hover
            background-color: $color-back-gray_6
        .year-input
          width: 50px
        .month-input
          width: 30px
      button
        @extend .pointer
        border: none
        background: white
        text-align: center
        color: #888888
  .day-screen
    @extend .flex
    @extend .flex-column
    width: 100%
    .week
      @extend .flex
      @extend .flex-row
      @extend .flex-between
      border-bottom: 1px solid $color-layer-gray_3
      background: $color-back-gray_6
      span
        width: 40px
        height: 40px
        text-align: center
        line-height: 40px
        font-size: $font-size-level_2
        color: $color-text-gray_9
        font-weight: bold
    .selectDay
      width: 100%
      @extend .flex
      @extend .flex-row
      @extend .flex-between
      @extend .flex-top
      flex-wrap: wrap
      span
        @extend .pointer
        width: 40px
        height: 40px
        text-align: center
        line-height: 40px
        font-size: $font-size-level_2
        color: $color-text-black_0
        margin: 1px 0
        &:hover
          color: $color-text-white_1
          background-color: $color-back-blue_0
      .active
        color: $color-text-white_1
        background-color: $color-back-blue_0
      .previousMonth
      .nextMonth
        color: $color-text-gray_9
</style>
