//数据模块

//导包
const mysql=require('mysql');

//创建连接对象
const conn =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'user'
});

//数据库连接
conn.connect();

//将数据库暴露出去
module.exports=conn;