export function getHeaders () {
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
