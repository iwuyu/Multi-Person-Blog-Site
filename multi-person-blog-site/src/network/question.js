import instance from "./request";

/* 获取问答标签 */
export function getQuestionLabel() {
  return instance.request({
    method:"get",
    url:`/question/getQuestionLabel`
  })
}

/* 问答发布 */
export function questionPublish(data) {
  return instance.request({
    method: "post",
    url:"/question/publish",
    data
  });
}

/* 问答删除 */
export function deleteQuestion(data) {
  return instance.request({
    method: "post",
    url:"/question/delete",
    data
  });
}

/* 获取问答数量 */
export function getQuestionCount(param) {
  return instance.request({
    method:"get",
    url:`/question/getquestionsCount?labelId=${param.labelId}&author=${param.author}&keyword=${param.keyword}&questionStatus=${param.questionStatus}`
  })
}

/* 获取问答 */
export function getQuestion(param) {
  return instance.request({
    method:"get",
    url:`/question/getQuestion?labelId=${param.labelId}&currentPage=${param.currentPage}&pageSize=${param.pageSize}&author=${param.author}&keyword=${param.keyword}&questionStatus=${param.questionStatus}`
  })
}

/* 获取问答详情 */
export function getQuestionDetail(id) {
  return instance.request({
    method:'get',
    url:`/question/getQuestionDetail?id=${id}`
  })
}

/* 问答点赞 */
export function questionLike(data) {
  return instance.request({
    method:"post",
    url:'/question/like',
    data
  })
}