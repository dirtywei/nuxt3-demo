// 接口共用参数
export const commonParameters = () => {
  let osType = ''
  let devStr = ''
  if (process.client) {
    devStr = window.navigator.platform
    if (/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)) {
      // 判断iPhone|iPad|iPod|iOS
      osType = '2'
    } else if (/(Android)/i.test(window.navigator.userAgent)) {
      // 判断Android
      osType = '1'
    } else {
      osType = '4'
    }
  }
  const parameters = {
    source_mod: 'bbs', // bbs
    os_type: osType, // 客户端系统类型 1安卓 2ios 3win系统
    sdk_ver: '1.0.0', // 客户端版本号
    dev_str: devStr, // 设备标示
    system_source: 1 // // 1：浏览器、2：公众号:、3：游戏客户端   pc社区固定传1
  }
  return parameters
}
