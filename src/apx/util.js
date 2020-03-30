function getHeaders () {
  const deviceId = '0'
  const deviceOS = 'web'
  const token = JSON.parse(window.localStorage.getItem('immi_token'))
  const language = JSON.parse(window.localStorage.getItem('immi_language'))
  return {
    'deviceId': deviceId,
    'deviceOS': deviceOS, // 应用秘钥
    'language': language, // 随机字符串
    'token': token // 移动设备Id
  }
}

//获取子菜单
function getSubNav(code) {
  let subNavList = [];
  let menus = JSON.parse(sessionStorage.getItem('menus'));
  let currentMenu = menus.find(el => {
    return el.code === code
  })
  let temp = {}
  subNavList = currentMenu.menueVoList
  subNavList.forEach(el => {
    if(el) {
      let key = el.code
      temp[key] = el.menu
    }
  })
  return temp
}

//获取各子菜单(非年子导航)
function getSubList(parentMenusCode) {
  let subNavList = []
  let menus = JSON.parse(sessionStorage.getItem('menus'));
  let currentMatchMenu = menus.find(el => {
    return el.code === 'currentmatch'
  })
  let currentMatchSubNav = currentMatchMenu.menueVoList
  let currentMenu = menus.find(el => {
    return el.code === parentMenusCode
  })
  let nowSubNav = parentMenusCode === 'currentmatch' ? currentMatchSubNav : currentMenu.menueVoList
  if(parentMenusCode === 'currentmatch') {
    subNavList = nowSubNav
  } else {
    let temp = new Array(currentMatchSubNav.length - nowSubNav.length).join(",").split(",")
    subNavList = nowSubNav.concat(temp)
  }
  return subNavList
}

//获取各子菜单(年)
function getYearSubList(subNavList) {
  let nowSubNavList = []
  let menus = JSON.parse(sessionStorage.getItem('menus'));
  let currentMatchMenu = menus.find(el => {
    return el.code === 'currentmatch'
  })
  let currentMatchSubNav = currentMatchMenu.menueVoList
  // let currentMenu = menus.find(el => {
  //   return el.code === this.parentMenusCode
  // })
  let temp = new Array(currentMatchSubNav.length - subNavList.length).join(",").split(",")
  nowSubNavList = subNavList.concat(temp)
  return nowSubNavList
}
export { getSubNav, getHeaders, getSubList, getYearSubList }