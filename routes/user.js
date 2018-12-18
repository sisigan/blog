//导入模块
const router =require('../router.js');
const ctrl =require('../controller/user.js');

router.get('/login',ctrl.getLoginHandler);

router.get('/register',ctrl.getRegisterHandler);

router.post('/login',ctrl.postLoginHandler);

router.post('/register',ctrl.postRegisterHandler);

router.get('/logout',ctrl.getLogoutHandler)

//将路由对象暴露出去
module.exports=router;