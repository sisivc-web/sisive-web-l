import Vue from 'vue'
import {kpiEvaluation} from 'apx'
export default class Product {
  constructor(details) {
    this.content = ''
    this.items = [
      {
        itemType: 'A', // 服务态度
        rating: 0
      },
      {
        itemType: 'Q', // 服务质量
        rating: 0
      },
      {
        itemType: 'E', // 服务效率
        rating: 0
      }
    ]
    this.objectId = details && details.consultantId ? details.consultantId : 0
    this.objectType = 'C' // E院校;M专业;C顾问;
    this.rating = 0
  }
  judge() {
    kpiEvaluation(this, Vue).then((res) => {
      console.log('评价: ', res)
    })
  }
}
