import messages from '../../i18n'
export function statusToLabel(val) {
  switch (val) {
    case 'P': {
      return '待处理'
    }
    case 'S': {
      return '已提交'
    }
    case 'F': {
      return '通过'
    }
    case 'R': {
      return '拒绝'
    }
    case 'C': {
      return '已取消'
    }
    default:
      break
  }
}

export function applicationTypeToLabel(val) {
  let language = JSON.parse(window.localStorage.getItem('immi_language')) === 'en' ? 'en' : 'zh_CN'    // 语言标识,默认为zh_CN
  switch (val) {
    case 'C': {
      return '套餐'
    }
    case 'S': {
      return messages[language].educationService
    }
    case 'V': {
      return '签证服务'
    }
    default:
      return '其他'
  }
}

export function orderStatusToLabel(val) {
  switch (val) {
    case '0': {
      return 'PENDING'
    }
    case '1': {
      return 'SETTLED'
    }
    case '2': {
      return 'EFFECTIVE'
    }
    case '3': {
      return 'REJECTED'
    }
    case '4': {
      return 'CANCELLED'
    }
    default:
      return '其他'
  }
}

export function nameToLabel(val) {
  let language = JSON.parse(window.localStorage.getItem('immi_language'))
  return language === 'zh_CN' ? val : (val + 'En')
}
