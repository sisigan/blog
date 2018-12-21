//导入模块
const router =require('../router.js');
const moment=require('moment');
const conn =require('../db.js');
const marked=require('marked');


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
        //未登录或者身份已过期
        if (!req.session.isLogin) return res.status(401).send({ status: 401, msg: '身份信息已过期!请登陆后重试!' })
        //获取表单信息
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
        //若未登录跳转到首页
        if(!req.session.isLogin) return res.redirect('/');
        let Id=req.params.id;
        //根据Id获取文章信息
        let sql="select * from blog_articles where id=?"

        conn.query(sql,Id,(err,results)=>{
            if (err) return res.status(500).send({ status: 500, msg: '获取文章列表失败' });
            //如果数据的长度不为1,重定向到首页
            if(results.length !=1) return res.redirect('/');

            //在调用res.render之前,需要把markdown文本转换成html文本
            const html=marked(results[0].content);
            //将转换好的html文本,赋值给content属性
            results[0].content=html;
            res.render('./article/info.ejs',{
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
                articleInfo:results[0]
            });
        })

    },
    getArticleEditHandler(req,res){
        //如果用户未登录,不允许用户查看文章编辑页
        if(!req.session.isLogin) return res.redirect('/');
        const sql="select * from blog_articles where id=?"
        conn.query(sql,req.params.id,(err,results)=>{
            if (err ||results.length !=1) return res.redirect("/");
            res.render("./article/edit.ejs",{
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
                articleInfo:results[0]
            })
        })      
    },
    postArticleEditHandler(req,res){//编辑文章
        //未登录或者身份已过期
        if (!req.session.isLogin) return res.status(401).send({ status: 401, msg: '身份信息已过期!请登陆后重试!' })
        //获取表单信息
        const articleInfo=req.body;
        //更改文章修改时间
        articleInfo.ctime=moment().format('YYYY-MM-DD HH:mm:ss');
        const sql="update blog_articles set ? where id =?"
        conn.query(sql,[articleInfo,articleInfo.id],(err,results)=>{
            if (err ||results.affectedRows !=1) return res.status(500).send({ status: 500, msg: '文章修改失败!请重试!' })
            
            res.send({ status: 200, msg: 'ok'})
        })
    }

}