let urls = {
  user: {
    getUserInfor: {
      url () {
        return '/getUserInfor'
      },
      regular: /\/getUserInfor/,
      method: 'get'
    },
    postUserInfor: {
      url () {
        return '/postUserInfor'
      },
      regular: /\/postUserInfor/,
      method: 'post'
    }
  },
}

export default urls