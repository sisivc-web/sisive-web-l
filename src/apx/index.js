import {postFile, commonRequest, ERR_OK, ERROR_SERVICE, INVALID_TOKEN, ERR_MSG, LOG_OUT} from './config'
import axios from 'axios'

// POST文件
function POSTFILE (url, data, Vue, filePath = '', callbackFn) {
  console.log('filePath = ', filePath)
  if (Vue.$loading !== undefined) Vue.$loading()
  return new Promise(function (resolve, reject) {
    axios(Object.assign(postFile(url, data, filePath), {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          callbackFn(progressEvent)
        }
      }})).then((res) => {
        if (Vue.$loading !== undefined) Vue.$loading.close()
        if (res.data.statusCode === ERR_OK) {
          resolve(res)
        } else if (res.data.statusCode === ERROR_SERVICE) {
          if (Vue.$loading !== undefined) {
            Vue.$toast('外星人攻击了我们的服务器!')
          }
          console.log('post file error:', res)
          reject(res)
        } else if (res.data.statusCode === INVALID_TOKEN) {
          if (Vue.$loading !== undefined) Vue.$toast('登录信息过期,请重新登录!')
          Vue.$router.push({name: 'login', params: {forward: true}})
        } else {
          if (Vue.$loading !== undefined) Vue.$toast(res.data.message)
          reject(res)
        }
      }).catch((err) => {
        if (Vue.$loading !== undefined) {
          Vue.$loading.close()
          Vue.$toast(ERR_MSG)
        }
        return reject(err)
      })
  })
}

// POST/GET/PUT/DELETE 请求
function Request (url, method, params, data, Vue, visible = true) {
  // if (visible) Vue.$loading()
  return new Promise(function (resolve, reject) {
    axios(commonRequest(url, method, params, data)).then((res) => {
      Vue.$loading.close()
      if (res.data.statusCode === ERR_OK) {
        resolve(res)
      } else if (res.data.statusCode === ERROR_SERVICE) {
        Vue.$toast(ERR_MSG)
        reject(res)
      } else if (res.data.statusCode === INVALID_TOKEN) {
        if (visible) {
          Vue.$toast(LOG_OUT)
          Vue.$router.push({name: 'login', params: {forward: true}})
        }
      } else {
        Vue.$toast(res.data.message)
        reject(res)
      }
    }).catch(err => {
      Vue.$loading.close()
      Vue.$toast(ERR_MSG)
      reject(err)
    })
  })
}

// POST文件 接口
/**
 * 上传文件到阿里云
 * @param {*文件路径} filePath
 */
export function kpiOssUploadFile (data = {}, Vue, filePath, callback) {
  return POSTFILE('/oss/uploadFile', data, Vue, filePath, callback)
}

/**
 * 登录
 * @param {*用户名} userName
 * @param {*密码} password
 * @param {*系统标识（mobile,android,iphone,web）} systemId
 * @param {*设备标识} deviceId
 */
export function kpiLogin (data = {}, Vue) {
  return Request('/sisivc/user/login', 'post', undefined, data, Vue)
}

/**
 * 首页信息
 * @param {*语言(en, zh_CN)} language
 */
export function kpiHome (params = {}, Vue) {
  return Request('/sisivc/home/getHome', 'get', params, undefined, Vue)
}

/**
 * 人员详情页
 * @param {*语言(en, zh_CN)} language
 */
export function kpiMemberDetail (params = {}, Vue) {
  return Request('/sisivc/personnal/personnalDetails', 'get', params, undefined, Vue)
}

/**
 * 关于我们
 * @param {*语言(en, zh_CN)} language
 */
export function kpiAboutUs (params = {}, Vue) {
  return Request('/sisivc/competition/competitionDetails', 'get', params, undefined, Vue)
}

/**
 * 比赛场次详情
 * @param {*语言(en, zh_CN)} language
 */
export function kpiWatchDetail (params = {}, Vue) {
  return Request('/sisivc/competition/competitionRoundsByDate', 'get', params, undefined, Vue)
}

/**
 * 比赛
 * @param {*语言(en, zh_CN)} language
 */
export function kpiWatch (params = {}, Vue) {
  return Request('/sisivc/competition/Spectators', 'get', params, undefined, Vue)
}

/**
 * 新闻列表
 * @param {*语言(en, zh_CN)} language
 */
export function kpiNews (params = {}, Vue) {
  return Request('/sisivc/competition/queryNews', 'get', params, undefined, Vue)
}
/**
 * 新闻子菜单年份
 * @param {*语言(en, zh_CN)} language
 */
export function kpiYears (params = {}, Vue) {
  return Request('/sisivc/competition/queryYears', 'get', params, undefined, Vue)
}

/**
 * 新闻详情
 * @param {*语言(en, zh_CN)} language
 */
export function kpiQueryNewDetail (params = {}, Vue) {
  return Request('/sisivc/competition/queryNewDetail', 'get', params, undefined, Vue)
}

/**
 * 用户信息
 */
export function kpiUserInfo (params = {}, Vue) {
  return Request('/rest/userInfo', 'get', params, undefined, Vue)
}

