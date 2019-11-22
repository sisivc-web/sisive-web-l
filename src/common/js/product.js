import Vue from 'vue'
import router from '../../router'
import {kpiProductCombosPost, kpiProducts, kpiProductCombosPut, kpiProductsPut} from 'apx'
export default class Product {
  constructor(details) {
    if (details) {
      for (var key of Object.keys(details)) {
        this[key] = JSON.parse(JSON.stringify(details[key]))
      }
    }
    this.components = details && details.components ? details.components : []
    this.courses = details && details.courses ? details.courses : []
    this.fees = details && details.fees ? details.fees : []
    this.imageLinks = details && details.imageLinks ? this._safeImageLinks(details.imageLinks) : [
      {imageType: '1', imageUrl: ''},
      {imageType: '2', imageUrl: ''}
    ]
    this.productId = details && details.productId ? details.productId : '' // 产品id
    this.productType = details && details.productType ? details.productType : 'S' // 产品类型
    this.productName = details && details.productName ? details.productName : '' // 产品名称
    this.productNameEn = details && details.productNameEn ? details.productNameEn : '' // 产品名称英文
    this.currencyCode = details && details.currencyCode ? details.currencyCode : 'AUD' // 货币
    this.price = details && details.price ? details.price : '' // 价格
    this.description = details && details.description ? details.description : '' // 描述
    this.descriptionEn = details && details.descriptionEn ? details.descriptionEn : '' // 描述英文
    this.daysCompleted = details && details.daysCompleted ? details.daysCompleted : '' // 承诺申请完成天数
    this.serviceLimit = details && details.serviceLimit ? details.serviceLimit : '' // 服务次数
    this.detailedInfo = details && details.detailedInfo ? details.detailedInfo : '' // 富文本
    this.status = details && details.status ? details.status : '0' // 产品默认状态
    this.consultantId = details && details.consultantId ? details.consultantId : JSON.parse(window.localStorage.getItem('immi_currentUser')).consultantId // 顾问id
  }
  _safeImageLinks(imageLinks) {
    // console.log('_safeImageLinks: ', imageLinks.filter(v => v.imageType === '1'), imageLinks.filter(v => v.imageType === '2'))
    let imageLinksObjectWithType1 = imageLinks.filter(v => v.imageType === '1')[0] ? imageLinks.filter(v => v.imageType === '1')[0] : {imageType: '1', imageUrl: ''}
    let imageLinksObjectWithType2 = imageLinks.filter(v => v.imageType === '2')[0] ? imageLinks.filter(v => v.imageType === '2')[0] : {imageType: '2', imageUrl: ''}
    return [imageLinksObjectWithType1, imageLinksObjectWithType2]
  }
  updateProduct(that) {
    let isNewOne = Vue.prototype.noValue(this.productId)
    if (isNewOne && this.productType === 'C') {
      this._gotoCreateNewOneWithComponents(that) // 去创建一个新的套餐
    } else if (isNewOne && this.productType !== 'C') {
      this._gotoCreateNewOneWithoutComponents(that) // 去创建一个新的产品
    } else if (!isNewOne && this.productType === 'C') {
      this._gotoChangeOneWithComponents(that) // 去修改套餐
    } else if (!isNewOne && this.productType !== 'C') {
      this._gotoChangeOneWithoutComponents(that) // 去修改产品
    }
  }
  // 去创建一个新的套餐
  _gotoCreateNewOneWithComponents(that) {
    kpiProductCombosPost(this, that).then((res) => {
      console.log('创建一个新的套餐: ', res)
      Vue.prototype.$toast('创建成功')
      router.replace('/personalCenter/products')
    })
  }
  // 去创建一个新的产品
  _gotoCreateNewOneWithoutComponents(that) {
    kpiProducts(this, that).then((res) => {
      console.log('创建一个新的产品: ', res)
      Vue.prototype.$toast('创建成功')
      router.replace('/personalCenter/products')
    })
  }
  // 去修改套餐
  _gotoChangeOneWithComponents(that) {
    kpiProductCombosPut(this, that).then((res) => {
      console.log('去修改套餐: ', res)
      Vue.prototype.$toast('保存成功')
    })
  }
  // 去修改产品
  _gotoChangeOneWithoutComponents(that) {
    kpiProductsPut(this, that).then((res) => {
      console.log('去修改产品: ', res)
      Vue.prototype.$toast('保存成功')
    })
  }
}
