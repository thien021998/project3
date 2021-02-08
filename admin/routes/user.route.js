var expresse = require('express');
var router = expresse.Router();
var controller = require('../controllers/controller.user');
var middleware = require('../middleware/middleware.js');

//trang dang ký
router.get('/register', controller.pageregister);
router.post('/register', controller.register);

//trang đăng nhập 
router.get('/login', controller.pagelogin);
router.post('/login', controller.login);


//trang đăng  xuất
router.get('/logout', controller.logout);
module.exports = router;