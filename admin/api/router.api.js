const express = require('express');
const router = express.Router();
const controller = require('../api/controller.api');
const { route } = require('../routes/user.route');


router.get('/product', controller.getProduct)
router.get('/product/details/:id', controller.detail)
router.get('/producttype', controller.getProducttype)
router.get('/product/:id', controller.getProductByCategory)

router.post('/login', controller.login)
router.post('/register', controller.register)

router.put('/cart/:id', controller.updateCart)
router.get('/getCart/:id', controller.getCart)

router.post('/checkout', controller.checkout)

//update product quantity
router.put('/updateProduct/:id/:quantity', controller.updateProduct)

//search
router.get('/search/:text', controller.search)

//pagination
router.get('/pagination/:page', controller.pagination)

//filer
router.get('/filter/:min/:max', controller.filter)

//get danh muc
router.get('/:id', controller.getDm)

module.exports = router;