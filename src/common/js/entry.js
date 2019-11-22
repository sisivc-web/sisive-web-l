export default class Entry {
  constructor(details) {
    if (details) {
      for (var key of Object.keys(details)) {
        this[key] = JSON.parse(JSON.stringify(details[key]))
      }
    }
    this.documentName = details && details.documentName ? details.documentName : ''
    this.documentType = details && details.documentType ? details.documentType : ''
    this.entryId = details && details.entryId ? details.entryId : null
    this.parentId = details && details.parentId ? details.parentId : 0
    this.children = details && details.children ? details.children : []
  }
}
