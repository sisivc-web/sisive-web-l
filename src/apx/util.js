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
  console.log(temp)
  return temp
}
export { getSubNav, getHeaders }