//导入模块
const router =require('../router.js');

//设计路由请求路径对应的接口暴露出去
module.exports={
    getArticleAddHandler(req,res){
        //判断是否有登录,若没登录跳转到首页
        if(!req.session.isLogin) return res.render('/');
        res.render('article/add',{
            isLogin: req.session.isLogin,
            userInfo: req.session.userInfo
        })
    }
}