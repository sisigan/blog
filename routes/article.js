//导入模块
const router =require('../router.js');
const ctrl =require('../controller/article.js');

//发表文章页
router.get('/article/add',ctrl.getArticleAddHandler);


//将路由对象暴露出去
module.exports=router;