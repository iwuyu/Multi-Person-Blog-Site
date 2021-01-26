import instance from "./request";

// 获取分类
export function getCategory(){
  return instance.get("/article/category")
}

// 获取标签
export function getLabel(){
  return instance.get("/article/label")
}

/* 文章发布 */
export function articlePublish(data) {
  return instance.request({
    method: "post",
    url:"/article/publish",
    data
  });
}

/* 文章修改 */
export function articleUpdata(data) {
  return instance.request({
    method: "post",
    url:"/article/updata",
    data
  });
}

/* 文章删除 */
export function deleteArticle(data) {
  return instance.request({
    method: "post",
    url:"/article/delete",
    data
  });
}

/* 获取文章数量 */
export function getArticlesCount(param) {
  return instance.request({
    method:"get",
    url:`/article/getArticlesCount?categoryId=${param.categoryId}&labelId=${param.labelId}&author=${param.author}&keyword=${param.keyword}&articleStatus=${param.articleStatus}`
  })
}

/* 获取文章 */
export function getArticle(param) {
  return instance.request({
    method:"get",
    url:`/article/getArticle?categoryId=${param.categoryId}&labelId=${param.labelId}&currentPage=${param.currentPage}&pageSize=${param.pageSize}&author=${param.author}&keyword=${param.keyword}&articleStatus=${param.articleStatus}`
  })
}

/* 获取状态文章 */
export function getStatusArticle(param) {
  return instance.request({
    method:"get",
    url:`/article/getStatusArticle?status=${param.status}&currentPage=${param.currentPage}&pageSize=${param.pageSize}`
  })
}

/* 审核文章 */
export function reviewedArticle(data) {
  return instance.request({
    method:"post",
    url:'/article/reviewed',
    data
  })
} 

/* 取消上传 */
export function cancelUpload(data) {
  return instance.request({
    method:"post",
    url:'/removeFile',
    data
  })
}

/* 获取文章详情 */
export function getArticleDetail(id) {
  return instance.request({
    method:'get',
    url:`/article/detail?id=${id}`
  })
}

/* 留言 */
export function leaveComment(data) {
  return instance.request({
    method:"post",
    url:'/comment/leaveComment',
    data
  })
}

/* 获取留言 */ 
export function getComment(data) {
  return instance.request({
    method:'get',
    url:`/comment/getComment?id=${data.id}&type=${data.type}`
  })
}