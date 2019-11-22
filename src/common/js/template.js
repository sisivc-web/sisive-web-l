export default class Template {
  constructor(details) {
    if (details) {
      for (var key of Object.keys(details)) {
        this[key] = JSON.parse(JSON.stringify(details[key]))
      }
    }
    this.documentEntries = details ? details.documentEntries : []
    this.templateName = details ? details.templateName : ''
    this.templateType = details ? details.templateType : ''
    this.templateId = details ? details.templateId : ''
  }
}
