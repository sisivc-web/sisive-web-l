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
  return Request('/sisivc/competition/competitionRoundsById', 'get', params, undefined, Vue)
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
 * 新闻详情
 * @param {*语言(en, zh_CN)} language
 */
export function kpiQueryNewDetail (params = {}, Vue) {
  return Request('/sisivc/competition/queryNewDetail', 'get', params, undefined, Vue)
}

/**
 * 图片验证码
 */
export function kpiPicVerifyCode (params = {}, Vue) {
  return Request('/rest/picVerifyCode', 'get', params, undefined, Vue)
}

/**
 * 发送短信验证码
 * @param {*手机号} phoneNumber
 * @param {*图片验证码} picCode
 * @param {*图片验证码key} key
 * @param {*操作类型（1.注册，2.找回密码）} opCode
 */
export function kpiSmsVerifyCode (data = {}, Vue) {
  return Request('/rest/smsVerifyCode', 'post', undefined, data, Vue)
}

/**
 * 发送邮箱验证码
 * @param {*邮箱} email
 * @param {*图片验证码} picCode
 * @param {*图片验证码key} key
 * @param {*操作类型（1.注册，2.找回密码）} opCode
 */
export function kpiEmailVerifyCode (data = {}, Vue) {
  return Request('/rest/emailVerifyCode', 'post', undefined, data, Vue)
}

/**
 * 用户注册
 * @param {*用户名} userName
 * @param {*密码} password
 * @param {*验证码} verifiCode
 * @param {*国家代码(CN.中国，AU.澳大利亚，US.美国)} countryCode
 * @param {*系统标识(mobile,android,iphone,web)} systemId
 */
export function kpiSignup (data = {}, Vue) {
  return Request('/rest/signup', 'post', undefined, data, Vue)
}

/**
 * 找回密码
 * @param {*用户名} username
 * @param {*密码} password
 */
export function kpiRetrievePassword (data = {}, Vue) {
  return Request('/rest/retrievepassword', 'put', undefined, data, Vue)
}

/**
 * 重置密码
 * @param {*旧密码} oldPassword
 * @param {*密码} password
 */
export function kpiResetPassword (data = {}, Vue) {
  return Request('/rest/password', 'put', undefined, data, Vue)
}

/**
 * 验证找回密码的验证码(email和phoneNumber二者选其一)
 * @param {*邮箱} email
 * @param {*手机号} phoneNumber
 * @param {*验证码} verifiCode
 */
export function kpiVerificationVerifyCode (data = {}, Vue) {
  return Request('/rest/verificationVerifyCode', 'post', undefined, data, Vue)
}

/**
 * 用户信息
 */
export function kpiUserInfo (params = {}, Vue) {
  return Request('/rest/userInfo', 'get', params, undefined, Vue)
}

/**
 * 更新用户信息
 * @param {*用户数据} aPIUser
 */
export function kpiUpdateUserInfo(data = {}, Vue) {
  return Request('/rest/userInfo', 'post', undefined, data, Vue)
}

/**
 * 更新用户头像
 * @param {*用户头像地址} avatarUrl
 */
export function kpiUpdateAvatar(params = {}, Vue) {
  return Request('/rest/updateAvatar', 'put', params, undefined, Vue)
}

/**
 * 顾问信息
 * @param {*顾问id}consultantId
 */
export function kpiConsultantInfo(params = {}, Vue) {
  return Request('/rest/consultantInfo', 'get', params, undefined, Vue)
}

/**
 * 更新顾问信息
 * @param {*顾问数据} aPIConsultant
 */
export function kpiUpdateConsultantInfo(data = {}, Vue) {
  return Request('/rest/updateConsultantInfo', 'post', undefined, data, Vue)
}

/**
 * 删除关注
 * @param {*加关注的产品ID} objectId
 * @param {*加关注的产品类型:(I机构;C专业;A顾问;P产品)} objectType
 */
export function kpiWishlistitemsDelete (data = {}, Vue) {
  return Request('/rest/wishlistitems', 'delete', undefined, data, Vue)
}

/**
 * 添加关注
 * @param {*加关注的产品ID} objectId
 * @param {*加关注的产品类型:(I机构;C专业;A顾问;P产品)} objectType
 */
export function kpiWishlistitemsPost (data = {}, Vue) {
  return Request('/rest/wishlistitems', 'post', undefined, data, Vue)
}

/**
 * 院校列表
 */
export function kpiInstitution (params = {}, Vue) {
  return Request('/rest/institution', 'get', params, undefined, Vue)
}

/**
 * 院校详情
 */
export function kpiInstitutionDetail (params = {}, Vue) {
  return Request('/rest/institutionDetail', 'get', params, undefined, Vue)
}

/**
 * 专业列表
 */
export function kpiCourse (params = {}, Vue) {
  return Request('/rest/course', 'get', params, undefined, Vue)
}

/**
 * 专业详情
 */
export function kpiCourseDetail (params = {}, Vue) {
  return Request(`/rest/course/${params.courseId}`, 'get', params, undefined, Vue)
}

/**
 * 分页查询顾问
 * @param {*服务类型} productType
 * @param {*成功人数} successCount
 * @param {*入住时间} enteredTime
 * @param {*好评} rating
 */
export function kpiConsultants (params = {}, Vue) {
  return Request('/rest/consultants', 'get', params, undefined, Vue)
}

/**
 * 根据ID查找顾问
 */
export function kpiConsultant (params = {}, Vue) {
  return Request('/rest/consultant', 'get', params, undefined, Vue)
}

// /**
//  * 添加购物车
//  */
// export function kpiCartitems (data = {}, Vue) {
//   return Request('/rest/cartitems', 'post', undefined, data, Vue)
// }

// /**
//  * 删除购物车中Items
//  * @param {*itemId} cartItemId
//  * @param {*quantity} quantity
//  */
// export function kpiCartitemsDelete (params = {}, Vue) {
//   return Request('/rest/cartitems', 'delete', params, undefined, Vue)
// }

// /**
//  * 获取购物车
//  */
// export function kpiShoppingcart (params = {}, Vue, loadingToast) {
//   return Request('/rest/shoppingcart', 'get', params, undefined, Vue, loadingToast)
// }

/**
 * 分页查询学员列表
 */
export function kpiExcellentStudentList (params = {}, Vue) {
  return Request('/rest/excellentStudentList', 'get', params, undefined, Vue)
}

/**
 * 获取产品
 */
export function kpiProduct (params = {}, Vue) {
  return Request('/rest/product', 'get', params, undefined, Vue)
}

/**
 * 获取产品套餐
 */
export function kpiProductCombos (params = {}, Vue) {
  return Request('/rest/product/combos', 'get', params, undefined, Vue)
}

/**
 * 创建套餐
 */
export function kpiProductCombosPost (data = {}, Vue) {
  return Request('/rest/product/combos', 'post', undefined, data, Vue)
}

/**
 * 修改套餐
 */
export function kpiProductCombosPut (data = {}, Vue) {
  return Request('/rest/product/combos', 'put', undefined, data, Vue)
}

/**
 * 获取产品列表
 */
export function kpiProductPage (params = {}, Vue, loadingToast) {
  return Request('/rest/product/page', 'get', params, undefined, Vue, loadingToast)
}

/**
 * 创建产品
 */
export function kpiProducts (data = {}, Vue) {
  return Request('/rest/products', 'post', undefined, data, Vue)
}

/**
 * 修改产品
 */
export function kpiProductsPut (data = {}, Vue) {
  return Request('/rest/products', 'put', undefined, data, Vue)
}

/**
 * 产品上下架
 */
export function kpiUpOrDownProducts (params = {}, Vue) {
  return Request('/rest/upOrDownProducts', 'put', params, undefined, Vue)
}

/**
 * 获取所有模板因子
 */
export function kpiDocumentEntry (params = {}, Vue) {
  return Request('/rest/documentEntry', 'get', params, undefined, Vue)
}

/**
 * 保存模板因子
 */
export function kpiDocumentEntryPost (data = {}, Vue, loadingToast) {
  return Request('/rest/documentEntry', 'post', undefined, data, Vue, loadingToast)
}

/**
 * 删除模板因子
 */
export function kpiDocumentEntryDelete (data = {}, Vue) {
  return Request(`/rest/documentEntry/${data.entryId}`, 'delete', undefined, data, Vue)
}

/**
 * 查询申请模板
 */
export function kpiApplicationDocument (params = {}, Vue) {
  return Request('/rest/applicationDocument', 'get', params, undefined, Vue)
}

/**
 * 保存申请模板
 */
export function kpiApplicationDocumentPost (data = {}, Vue) {
  return Request('/rest/applicationDocument', 'post', undefined, data, Vue)
}

/**
 * 订单查询,支持分页
 */
export function kpiOrderGet (params = {}, Vue) {
  return Request('/rest/order', 'get', params, undefined, Vue)
}

/**
 * 订单创建
 */
export function kpiOrderPost (data = {}, Vue) {
  return Request('/rest/order', 'post', undefined, data, Vue)
}

/**
 * 顾问添加订单备注
 * @param {*备注内容} noteContent
 */
export function kpiAddOrderNote (params = {}, Vue) {
  return Request(`/rest/addOrderNote/${params.orderId}`, 'put', params, undefined, Vue)
}

/**
 * 订单总金额更改
 * @param {*} orderId
 * @param {*} actualAmount
 */
export function kpiChangeOrderAmount (params = {}, Vue) {
  return Request(`/rest/changeOrderAmount/${params.orderId}`, 'put', params, undefined, Vue)
}

/**
  * 订单状态更改
 */
export function kpiOrderPut (params = {}, Vue) {
  return Request(`/rest/order/${params.orderId}`, 'put', params, undefined, Vue)
}

/**
 * 申请单列表查询
 */
export function kpiApplicationGet (params = {}, Vue) {
  return Request('/rest/application', 'get', params, undefined, Vue)
}

/**
 * 留学申请单详情
 * @param {*申请单ID} applicationId
 */
export function kpiApplicationApplicationId (params = {}, Vue) {
  return Request(`/rest/application/${params.applicationId}`, 'get', params, undefined, Vue)
}

/**
 * 留学申请单保存
 */
export function kpiApplicationPost (data = {}, Vue) {
  return Request('/rest/application', 'post', undefined, data, Vue)
}

/**
 * 留学申请单状态修改
 */
export function kpiApplicationPut (params = {}, Vue) {
  return Request('/rest/application', 'put', params, undefined, Vue)
}

/**
 * 签证申请单保存
 */
export function kpiVisaApplicationPost (data = {}, Vue) {
  return Request('/rest/visaApplication', 'post', undefined, data, Vue)
}

/**
 * 签证申请单详情
 */
export function kpiVisaApplication (params = {}, Vue) {
  return Request(`/rest/visaApplication/${params.applicationId}`, 'get', params, undefined, Vue)
}

/**
 * 签证申请单状态修改
 */
export function kpiVisaApplicationPut (params = {}, Vue) {
  return Request('/rest/visaApplication', 'put', params, undefined, Vue)
}

/**
 * 创建申请反馈
 */
export function kpiApplicationFeedback (data = {}, Vue) {
  return Request(`/rest/applicationFeedback`, 'post', undefined, data, Vue)
}

/**
  * 评价
 */
export function kpiEvaluation (data = {}, Vue) {
  return Request('/rest/evaluation', 'post', undefined, data, Vue)
}

// 聊天室
/**
 * 获取聊天会话
 */
export function chatConversationsGet (params = {}, Vue) {
  return Request('/rest/chat/conversations', 'get', params, undefined, Vue)
}

/**
 * 获取聊天记录
 */
export function chatMessagesGet (params = {}, Vue) {
  return Request('/rest/chat/messages', 'get', params, undefined, Vue)
}

/**
 * 我的客户
 */
export function kpiMyClientInfo (params = {}, Vue) {
  return Request('/rest/myClientInfo', 'get', params, undefined, Vue)
}

/**
 * 获取提醒列表
 */
export function kpiReminderReminders (params = {}, Vue) {
  return Request('/rest/reminder/reminders', 'get', params, undefined, Vue)
}

/**
 * 查看提醒
 * @param {0: 未读 1: 已读} status
 * @param {01: 交易 02: 顾问审核资料 03: 签证预约 04: 补充资料 05: 留学申请审批结果 06: 签证申请审批结果 07: 即时通讯消息} reminderType
 */
export function kpiReminderRead (params = {}, Vue) {
  return Request('/rest/reminder/read', 'put', params, undefined, Vue, false)
}

/**
 * 申请邀请
 */
export function kpiApplicationInvite(params = {}, Vue) {
  return Request('/rest/applicationInvite', 'put', params, undefined, Vue)
}

/**
 * supay 支付宝支付
 */
export function kpiSupayAlipay(params = {}, Vue) {
  return Request(`/rest/order/${params.orderId}/suPayalipay`, 'get', params, undefined, Vue)
}

/**
 * supay 微信支付
 */
export function kpiSupayWxpay(params = {}, Vue) {
  return Request(`/rest/order/${params.orderId}/wetchPay`, 'get', params, undefined, Vue)
}

/**
 * 获取国家列表
 */
export function kpiCodeCountry(params = {}, Vue) {
  return Request(`/rest/code/country`, 'get', params, undefined, Vue)
}
/**
 * 根据countryCode获取地区列表
 * @param {*国家代码} countryCode
 */
export function kpiCodeRegions(params = {}, Vue) {
  return Request(`/rest/code/regions`, 'get', params, undefined, Vue)
}

