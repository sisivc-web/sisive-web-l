import * as types from './mutation-types'
import VUE from 'vue'
const matutions = {
  [types.SET_HOME_DATA](state, homeData) {
    state.homeData = homeData
  },
  [types.SET_CURRENT_USER](state, currentUser) {
    state.currentUser = currentUser
  },
  [types.PUSH_TO_CONTRAST_LIST](state, contrastListItem) {
    let courseIds = Array.from(state.contrastList, v => v.courseId)
    let courseId = contrastListItem.courseId
    let index = courseIds.indexOf(courseId)
    if (index < 0 && state.contrastList.length < 4) {
      state.contrastList.push(contrastListItem)
    } else if (index < 0 && state.contrastList.length >= 4) {
      VUE.prototype.$toast('最多添加4个专业')
    } else if (index >= 0) {
      VUE.prototype.$toast('已添加')
    }
  },
  [types.DELETE_FROM_CONTRAST_LIST](state, contrastListItem) {
    let courseIds = Array.from(state.contrastList, v => v.courseId)
    let courseId = contrastListItem.courseId
    let index = courseIds.indexOf(courseId)
    state.contrastList.splice(index, 1)
  },
  [types.CLEAR_CONTRAST_LIST](state) {
    state.contrastList = []
  },
  [types.SET_SHOW_MESSAGING](state, showMessaging) {
    state.showMessaging = showMessaging
  },
  [types.SET_PARTICIPANT](state, participant) {
    state.participant = participant
  }
}

export default matutions
