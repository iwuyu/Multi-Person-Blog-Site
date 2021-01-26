import instance from "./request";

// 获取用户
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