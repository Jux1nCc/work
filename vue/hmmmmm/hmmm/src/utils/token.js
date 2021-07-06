//  设置token
function setToken(val, name = 'token') {
    window.localStorage.setItem(name, val);
}
// 获取token
function getToken(name = 'token') {
    return window.localStorage.getItem(name);
}
// 删除token
function removeToken(name = 'token') {
    window.localStorage.removeItem(name);
}
// 导出
export { setToken, getToken, removeToken }