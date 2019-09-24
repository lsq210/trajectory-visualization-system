import Mock from 'mockjs'
import urls from '../config/urls'
import userInforMock from './user.mock'

Mock.setup({
  timeout: '100-500'
})

// Get userInfor
Mock.mock(urls.user.getUserInfor.regular, urls.user.getUserInfor.method, userInforMock.getUserInfor)

// Post userInfor
Mock.mock(urls.user.postUserInfor.regular, urls.user.postUserInfor.method, userInforMock.postUserInfor)



