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
    },
    postArticleAddHandler(req,res){
        //获取表单信息
        console.log(req.body)
       const articleInfo=req.body;
        //作者id为session中存放用户信息的id
       articleInfo.authorid=req.session.userInfo.id;
       //文章发表时间
       articleInfo.ctime=moment().format('YYYY-MM-DD HH:mm:ss');

       const sql="insert into blog_articles set ?"

       conn.query(sql,articleInfo,(err,results)=>{
        if (err || results.affectedRows !=1 ) return res.status(500).send({ status: 500, msg: '文章发表失败!请重试!' })

        res.send({ status: 200, msg: '发表文章成功!',insertId:results.insertId})
    })
    },
    getArticleInfoHandler(req,res){

    },

}