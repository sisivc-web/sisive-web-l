import Vue from 'vue'
import router from '../../../router'
import {kpiApplicationPost, kpiApplicationPut, kpiApplicationDocument, kpiCodeCountry} from 'apx'
export default class OverseasStudyApply {
  constructor(details, orderId, itemId) {
    if (details) {
      for (var key of Object.keys(details)) {
        this[key] = JSON.parse(JSON.stringify(details[key]))
      }
    }
    this.orderId = details ? details.orderId : orderId
    this.orderItemId = details ? details.orderItemId : itemId
    this.institutionId = details ? details.institutionId : ''
    this.topic = details ? details.topic : ''
    this.appliedCourses = details ? details.appliedCourses : [
      {
        courseName: '',
        courseCode: '',
        cricosCode: '',
        majorName: '',
        semester: 'Jan-Feb',
        entryYear: undefined
      }
    ]
    this.applicant = details ? details.applicant : {
      familyName: '',
      givenName: '',
      gender: 'M',
      birthDate: '',
      nationality: '',
      citizenship: '',
      passportNo: '',
      phoneNo: '',
      faxNo: '',
      mobileNo: '',
      email: '',
      countryCode: '',
      regionCode: '',
      postalCode: '',
      address: ''
    }
    this.legalGuardian = details ? details.legalGuardian : {
      familyName: '',
      givenName: '',
      passportNo: '',
      email: '',
      countryCode: '',
      regionCode: '',
      postalCode: '',
      address: '',
      relationship: '',
      englishCapable: '0'
    }
    this.academicExperiences = details ? details.academicExperiences : [
      {
        institution: '',
        commencedOn: '',
        completedOn: '',
        studentNo: '',
        qualification: '',
        scoreOrGrade: ''
      }
    ]
    this.workExperiences = details ? details.workExperiences : [
      {
        employerName: '',
        positionHeld: '',
        dateEmployed: ''
      }
    ]
    this.documents = details ? details.documents : []
    this.remark = details ? details.remark : ''
    this.status = details ? details.status : 'P'
    this.receivingMailbox = details ? details.receivingMailbox : ''
    this.applicationFeedbacks = details ? details.applicationFeedbacks : []
    // 模板选项
    this.templateOptions = []
    this._getApplicationDocument()
    // ===========================
    // 国家列表
    this.codeCountries = []
    this._getCodeCountries()
    // ===========================
  }
  // 获取已存在的模板
  _getApplicationDocument() {
    let _this = Vue.prototype
    let param = {
      consultantId: JSON.parse(window.localStorage.getItem('immi_currentUser')).consultantId
    }
    kpiApplicationDocument(param, _this).then((res) => {
      console.log('查询申请模板: ', res)
      this.templateOptions = res.data.data.list
      // this._addDocumentNameToDocuments()
    })
  }
  // 获取国家列表
  _getCodeCountries() {
    let _this = Vue.prototype
    kpiCodeCountry({}, _this).then((res) => {
      this.codeCountries = res.data.data
    })
  }
  // documents字段后台没有返回documentName, 前端冗余代码解决这个问题
  // _addDocumentNameToDocuments() {
  //   if (Vue.prototype.noValue(this.templateId)) return
  //   let _this = Vue.prototype
  //   let templateOption = this.templateOptions.filter(v => v.templateId === this.templateId)[0]
  //   let documentEntries = templateOption ? templateOption.documentEntries : {}
  //   for (let [index, element] of this.documents.entries()) {
  //     this.documents[index].documentName = documentEntries.filter(v => v.entryId === element.entryId)[0].documentName
  //     _this.$set(this.documents[index], 'percentage', 0)
  //     _this.$set(this.documents[index], 'uploadStatus', '')
  //   }
  // }
  save() {
    let _this = Vue.prototype
    kpiApplicationPost(this, _this).then((res) => {
      console.log('留学申请: ', res)
      _this.$toast('保存成功!', {
        complete: () => {
          // let isOwner = JSON.parse(window.localStorage.getItem('immi_currentUser')) ? JSON.parse(window.localStorage.getItem('immi_currentUser')).consultantId === this.consultantId : false
          let isConsultant = JSON.parse(window.localStorage.getItem('immi_currentUser')) ? JSON.parse(window.localStorage.getItem('immi_currentUser')).roleType === 'Consultant' : false
          if (isConsultant) {
            router.replace('/personalCenter/adviserApplys?activedIndex=0')
          } else {
            router.replace('/personalCenter/applys?activedIndex=0')
          }
        }
      })
    })
  }
  submit() {
    let _this = Vue.prototype
    kpiApplicationPost(this, _this).then((res) => {
      console.log('留学申请提交前保存: ', res)
      let param = {
        applicationId: this.applicationId,
        status: 'S',
        version: res.data.data.version
      }
      kpiApplicationPut(param, _this).then((res) => {
        console.log('已提交: ', res)
        _this.$toast('提交成功!', {
          complete: () => {
            router.replace('/personalCenter/adviserApplys?activedIndex=0')
          }
        })
      })
    })
  }
  cancel() {
    let _this = Vue.prototype
    let param = {
      applicationId: this.applicationId,
      status: 'C',
      version: this.version
    }
    kpiApplicationPut(param, _this).then((res) => {
      console.log('已取消: ', res)
      _this.$toast('已取消!', {
        complete: () => {
          router.replace('/personalCenter/applys?activedIndex=0')
        }
      })
    })
  }
}
