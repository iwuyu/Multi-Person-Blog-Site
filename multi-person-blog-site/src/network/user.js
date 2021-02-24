import instance from "./request";

// 获取所有用户
export function getUsers(param){
  return instance.get(`/getUsers?currentPage=${param.currentPage}&pageSize=${param.pageSize}`)
}

// 修改用户禁言状态
export function changeStatus(data){
  return instance.request({
    method: "post",
    url:"/changeStatus",
    data
  });
}

/* 获取个人信息 */ 
export function getUserInfo(param) {
  return instance.get(`/getUserInfo?token=${param.token}`) 
} 

/* 获取他人信息 */ 
export function getOtherInfo(param) {
  return instance.get(`/getOtherInfo?userId=${param.userId}`) 
} 