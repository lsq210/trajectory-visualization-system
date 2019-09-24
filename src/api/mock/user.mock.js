import Mock from 'mockjs'
// import userInfor from './data'

// function getQueryVariable(url, variable){
//   var query = url.split('?')[1]//截取url中？后的字符串
//   var vars = query.split("&");
//   for (var i=0;i<vars.length;i++) {
//     var pair = vars[i].split("=");
//     if(pair[0] == variable){
//       return pair[1];
//     }
//   }
//   return(false);
// }
function getUrlQuery (url) {
  var query = url.split('?')[1]
  var pairObject = {}
  query.split('&').forEach(item => {
    var pair = item.split('=')
    pairObject[pair[0]] = pair[1]
  })
  return pairObject
}

export default {
  // Get demo
  getUserInfor: config => {
    /* eslint-disable */
    var variable = getUrlQuery(config.url)
    console.log(variable)
    return {
      url: config.url,
      time: Mock.mock('@datetime'),
    }
  },
  // Post demo
  postUserInfor: config => {
    // console.log('Mock: ' + config.url)
    // var selectedUsers = JSON.parse(config.body).param1
    return {
      url: config.url,
      time: Mock.mock('@datetime'),
      data: config.body
    }
  }
}
