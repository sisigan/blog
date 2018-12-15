//路由对象
const express=require('express');
const moment=require('moment');
//数据库
const mysql=require('mysql');
const conn =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'user'
});
conn.connect();


//创建路由对象
const router=express.Router();


router.get('/',(req,res)=>{
    res.render('./index')
})

router.get('/login',(req,res)=>{
    res.render('./user/login')
})

router.get('/register',(req,res)=>{
    res.render('./user/register')
})

router.post('/register',(req,res)=>{
    const userinfo =req.body;
    //表单验证
    if(!userinfo.username || !userinfo.password || !userinfo.nickname) return res.status(400).send({status:400,msg:"注册信息不能为空,请重新注册!"})
    //判断用户名是否重名
    const sql1="select count(*) as count from blog where username = ?"
    conn.query(sql1,userinfo.username,(err,results)=>{
        if(err) return res.status(500).send({ status: 500, msg: '查重失败!请重试!' })
        //若查询结果不为0
        if(results[0].count!==0) return res.send({status:400,msg:"用户名不能重复,请重新注册!"})

        //能注册
        userinfo.ctime=moment().format('YYYY-MM-DD HH:mm:ss');

        const sql2="insert into blog set ?"

        conn.query(sql2,userinfo,(err,results)=>{
            if (err) return res.status(500).send({ status: 500, msg: '注册失败!请重试!' })
            res.send({ status: 200, msg: '注册成功!' })
        })

    })
})


router.post('/login',(req,res)=>{
    const userinfo =req.body;

    const sql3="select * from blog where username =? and password =?";
    conn.query(sql3,[userinfo.username,userinfo.password],(err,results)=>{
        if(err || results.length==0 ) return res.status(500).send({ status: 500, msg: '用户名或密码错误,请重试!' })
        res.send({ status: 200, msg: '登录成功' })
        })
})



//将路由对象暴露出去
module.exports=router;