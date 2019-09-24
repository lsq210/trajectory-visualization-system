import Mock from 'mockjs'
// import userInfor from './data'

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
    return {
      url: config.url,
      time: Mock.mock('@datetime'),
      data: config.body
    }
  }
}
