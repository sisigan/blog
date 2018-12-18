//导入模块
const router =require('../router.js');

//设计路由请求路径对应的接口暴露出去
module.exports={
    getIndexHandler(req,res){
        console.log(req.session.isLogin)
        res.render('./index',{
            isLogin:req.session.isLogin,
            userInfo:req.session.userInfo
        })
    }
}




