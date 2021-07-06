var obj = { a: 1, b: 2 }
export default obj
function xxx () {
  window.console.log(123)
}
export { xxx }
// export 它是与import 配套使用
// import {xxx} from '路径'
// {xxx }  =   { xxx:function(){
//     window.console.log(123)
// }}
