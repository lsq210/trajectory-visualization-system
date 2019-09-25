import Mock from 'mockjs'
import userInfor from '@/data'

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
    console.log('参数:', variable)
    var res=[]
    var userIds = variable.userIds.split(",")
    var startTime = new Date(variable.selectedStart)
    var endTime = new Date(variable.selectedEnd)
    startTime.setSeconds(0)
    endTime.setSeconds(0)
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i]
      var user = userInfor[userId][1]
      var time1 = new Date(user[0].time)
      var time2 = new Date(user[user.length-1].time)
      if (time1 > endTime||time2 < startTime) {
        continue
      }
      startTime = startTime > time1 ? startTime : time1
      endTime = endTime < time2 ? endTime : time2
      var index1 = (startTime.getTime()-time1.getTime())/1000/60
      var index2 = (endTime.getTime()-time1.getTime())/1000/60
      var data = user.slice(index1,index2+1)
      var ele = [userInfor[userId][0]]
      ele.push(data)
      res.push(ele)
    }
    console.log('res', res)
    return {
      data: res,
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
