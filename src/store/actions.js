import * as types from './mutation-types'
import {kpiHome, kpiUserInfo} from 'apx'

export const dispatchHomeData = function({commit, state}, {that, forceReload}) {
  let promise = new Promise(function (resolve, reject) {
    if (JSON.stringify(state.homeData) !== JSON.stringify({}) && !forceReload) {
      resolve()
    } else {
      kpiHome({}, that).then((res) => {
        console.log('首页:', res)
        commit(types.SET_HOME_DATA, res.data.data)
        resolve()
      }).catch(() => {
        reject()
      })
    }
  })
  return promise
}

export const dispatchCurrentUser = function({commit, state}, {that}) {
  let promise = new Promise(function (resolve, reject) {
    if (JSON.stringify(state.currentUser) !== JSON.stringify({})) {
      resolve()
    } else {
      kpiUserInfo({}, that).then((res) => {
        console.log('用户信息:', res.data.data)
        commit(types.SET_CURRENT_USER, res.data.data)
        resolve()
      }).catch(() => {
        reject()
      })
    }
  })
  return promise
}
