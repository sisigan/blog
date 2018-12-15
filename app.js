//导包
const express =require('express');
const bodyparser=require('body-parser');
//调用express()创建实例对象
const app=express();
//注册中间件

app.use(bodyparser.urlencoded({extended:false}))
//设置默认模板,设置路径
app.set('view engine','ejs');

app.use('/node_modules',express.static('./node_modules'))
//导入路由对象
const router=require('./router.js');
//安装路由模块
app.use(router);

//调用listen()方法开启服务器
app.listen(40,()=>{
    console.log('http://127.0.0.1:40')
})