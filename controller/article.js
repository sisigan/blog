//导入模块
const router =require('../router.js');
const moment=require('moment');
const conn =require('../db.js');


//将路由对象暴露出去
module.exports={
    getArticleAddHandler(req,res){
        //判断用户是否有登录,没有登录跳转到首页
        if(!req.session.isLogin) return res.redirect('/');
        res.render('./article/add.ejs',{
            isLogin:req.session.isLogin,
            userInfo:req.session.userInfo
        })
    }
  

}