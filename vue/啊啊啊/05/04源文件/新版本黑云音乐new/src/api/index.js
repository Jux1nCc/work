// https://autumnfish.github.io/webmusic
import axios from 'axios'
const _fetch = axios.create({
  baseURL: 'https://autumnfish.cn'
})
export function getBannerList () {
  return _fetch({
    url: '/banner?t=' + Math.random() * 9999
  })
}
export function getNewsong () {
  return _fetch({
    url: '/personalized/newsong?t=' + Math.random() * 9999
  })
}
export function playMusic (params) {
  return _fetch({
    url: '/song/url?t=' + Math.random() * 9999,
    params
  })
}
export function getMv () {
  return _fetch({
    url: '/mv/all?t=' + Math.random() * 999
  })
}
export function playMv (params) {
  return _fetch({
    url: '/mv/url?t=' + Math.random() * 999,
    params
  })
}
export function songInfo (params) {
  return _fetch({
    url: '/song/detail?t=' + Math.random() * 999,
    params
  })
}
export function mvInfo (params) {
  return _fetch({
    url: '/mv/detail?t=' + Math.random() * 999,
    params
  })
}
export function searchMusic (params) {
  return _fetch({
    url: '/search?t=' + Math.random() * 999,
    params
  })
}
