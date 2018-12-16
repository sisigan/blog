//导入模块
const router =require('../router.js');
const ctrl =require('../controller/index.js');

router.get('/',ctrl.getIndexHandler);
//将路由对象暴露出去
module.exports=router;




