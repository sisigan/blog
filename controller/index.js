//导入模块
const router =require('../router.js');
const conn =require('../db.js');

//设计路由请求路径对应的接口暴露出去
module.exports={
    getIndexHandler(req,res){
        //通过时间排序,两表联查
        const sql="select a.id,a.title,a.ctime,blog.nickname from blog_articles as a LEFT JOIN blog on a.authorid=blog.id order by a.ctime desc";
        conn.query(sql,(err,result)=>{
            if(err){
                    return res.render('./index',{
                    isLogin:req.session.isLogin,
                    userInfo:req.session.userInfo,
                    //文章列表
                    articles:[]
                })
            }
            //没报错情况下
            res.render('./index',{
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
                //文章列表
                articles:result
            })
            
        })
       
    }
}




