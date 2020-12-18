import instance from "./request";

/* 发送验证码 */
export function sendMail(data) {
  return instance.request({
    method: "post",
    url:"/user/sendMail",
    data
  });
}

/* 用户登录 */
export function userLogin(data) {
  return instance.request({
    method: "post",
    url:"/user/login",
    data
  });
}

/* 用户注册 */
export function userRegister(data) {
  return instance.request({
    method: "post",
    url:"/user/register",
    data
  });
}

/* 验证用户是否登录 */
export function userIsLogined(data) {
  return instance.request({
    method: "post",
    url: "/user/isLogined",
    data
  })
}

/* 用户注销登录 */
export function userSignOut(data) {
  return instance.request({
    method:'post',
    url:'/user/signout',
    data
  })
}