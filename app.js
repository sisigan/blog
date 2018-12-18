//导包
const express =require('express');
const bodyparser=require('body-parser');
const fs=require('fs');
const path=require('path');
const session=require('express-session');
//调用express()创建实例对象
const app=express();
//注册中间件

app.use(bodyparser.urlencoded({extended:false}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //设置过期时间
    cookie: { maxAge: 30*24*60*60*1000 }
  }))
//设置默认模板,设置路径
app.set('view engine','ejs');

app.use('/node_modules',express.static('./node_modules'))

//使用循环的方式让routes文件下的文件,进行路由的自动注册
//files为一个包含 指定目录下所有文件名称的 数组
fs.readdir(path.join(__dirname,"./routes"),(err,files)=>{
    if(err) return console.log('读取routes文件下的路由失败!')
    //循环routes下面的每一个文件
    files.forEach( item =>{
        //每循环一次,导入一个路由模块
        const router=require(path.join(__dirname,"./routes/",item));
        app.use(router);
    })
})

//调用listen()方法开启服务器
app.listen(40,()=>{
    console.log('http://127.0.0.1:40')
})