import instance from "./request";

/* 获取私信用户列表 */
export function getLetterList(param) {
  return instance.request({
    method:"get",
    url:`/letter/getLetterList?token=${param.token}`
  })
}

/* 获取私信内容 */
export function getLetterData(param) {
  return instance.request({
    method:"get",
    url:`/letter/getLetter?token=${param.token}&targetId=${param.hisId}`
  })
}

/* 私信发布 */
export function speakPublic(data) {
  return instance.request({
    method: "post",
    url:"/letter/speakWord",
    data
  });
}

/* 问答删除 */
export function deleteLetter(data) {
  return instance.request({
    method: "post",
    url:"/letter/deleteLetter",
    data
  });
}