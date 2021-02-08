const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


router.get('/product',controller.showproduct);//xem sản phẩm
//thêm sản phẩm
router.get('/addproduct',controller.addproduct);
router.post('/addproduct',controller.postproduct);
//danh mục sản phẩm
router.get('/producttype',controller.showproducttype);
router.post('/producttype',controller.addproducttype);
module.exports = router;

//sửa sản phẩm
router.get('/edit/:id', controller.editsp);
router.post('/edit/:id', controller.update);

//xoa sp
router.get('/xoa/:id', controller.deletesp);

//xoa danh muc
router.get('/deleteproducttype/:id',controller.deleteproductype);

//tìm kiếm
router.get('/search', controller.search);

// order
router.get('/order', controller.order)

router.get('/order/:id', controller.confimed)

//
router.get('/user', controller.getUser);