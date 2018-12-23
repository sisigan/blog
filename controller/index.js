//导入模块
const router =require('../router.js');
const conn =require('../db.js');

//设计路由请求路径对应的接口暴露出去
module.exports={
    getIndexHandler(req,res){
        const pagesize=3;
        const nowPage=Number(req.query.page) || 1;
        //通过时间排序,两表联查
        const sql=`select a.id,a.title,a.ctime,blog.nickname from blog_articles as a LEFT JOIN blog on a.authorid=blog.id order by a.ctime desc limit ${(nowPage-1)*pagesize},${pagesize};select count(*) as count from blog_articles`;
        conn.query(sql,(err,result)=>{
            if(err){
                    return res.render('./index',{
                    isLogin:req.session.isLogin,
                    userInfo:req.session.userInfo,
                    //文章列表
                    articles:[]
                })
            }
            const totalPage=Math.ceil( result[1][0].count/pagesize);
            //没报错情况下
            res.render('./index',{
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
                //文章列表
                articles:result[0],
                totalPage:totalPage,
                //当前展示的是第几页
                nowPage:nowPage
            })
            
        })
       
    }
}




