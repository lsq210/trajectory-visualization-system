import request from './config/request'
import urls from './config/urls'

export default {
  // Get user
  getUserInfor: (userIds, selectedStart, selectedEnd) => {
    return request({
      url: urls.user.getUserInfor.url(),
      method: urls.user.getUserInfor.method,
      params: {
        userIds, selectedStart, selectedEnd
      }
    })
  },
  // Post user
  postUserInfor: (param1, param2) => {
    return request({
      url: urls.user.postUserInfor.url(),
      method: urls.user.postUserInfor.method,
      data: {
        param1, param2
      }
    })
  }
}
