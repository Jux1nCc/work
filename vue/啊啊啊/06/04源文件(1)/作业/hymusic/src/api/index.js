import axios from 'axios'
axios.defaults.baseURL = 'https://autumnfish.cn/'
function getBanners () {
  return axios({
    url: '/banner?sdgvsdg=' + Math.random() * 9999
  })
}
function getMusicList () {
  return axios({
    url:
      'https://autumnfish.cn/personalized/newsong?sdgsdg=' +
      Math.random() * 9999
  })
}
function getSong (params) {
  return axios({
    url: 'search',
    params: params
  })
}
export { getBanners, getMusicList, getSong }
