//导入模块
const router =require('../router.js');
const ctrl =require('../controller/article.js');

//get发表文章页
router.get('/article/add',ctrl.getArticleAddHandler);

//发表文章
router.post('/article/add',ctrl.postArticleAddHandler);

//查看文章详情页
router.get('/article/info/:id',ctrl.getArticleInfoHandler);

//文章编辑页面
router.get('/article/edit/:id',ctrl.getArticleEditHandler);

//用户编辑文章保存
router.post('/article/edit',ctrl.postArticleEditHandler);



//将路由对象暴露出去
module.exports=router;