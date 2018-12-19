//导入模块
const router =require('../router.js');
const ctrl =require('../controller/article.js');

//get发表文章页
router.get('/article/add',ctrl.getArticleAddHandler);

//发表文章
router.post('/article/add',ctrl.postArticleAddHandler);

router.get('/article/info',ctrl.getArticleInfoHandler);

//将路由对象暴露出去
module.exports=router;