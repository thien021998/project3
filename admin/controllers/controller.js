const productDb = require('../models/product.model');
const {json} = require('body-parser');
const producttypeDb = require('../models/producttype.model');
const orderDb = require('../models/order.model')
const userDb = require('../models/user.model')

 module.exports.showproduct = async(req, res) => {
     let data = await productDb.find();
     let dm = await producttypeDb.find();
     //let sp = JSON.parse(JSON.stringify(data));
     
    let sosanpham1trang = 5;
    let page = parseInt(req.query.page) || 1; //trang 1 -> page 2
    let batdau = (page - 1) * sosanpham1trang; //bat dau bang 10
    let ketthuc = page * sosanpham1trang;
    let tongsotrang = Math.ceil(data.length / sosanpham1trang)

    let arr = [];
    if (page <= 3) {
        for (var i = 1; i <= 5; i++) {
            if (i)
                arr.push(i);
        }
    } else if (page >= tongsotrang - 2) {
        for (var i = tongsotrang - 4; i <= tongsotrang; i++) {
            arr.push(i);
        }
    } else {
        for (var i = page - 2; i <= page + 2; i++) {
            if (i)
                arr.push(i);
        }
    }
    let pre = page - 1;
    let next = page + 1;
    if (page == tongsotrang) {
        next = null;
    }

    if (page == 1) {
        style = 'disabled'
    } else {
        style = ''
    }
    let sp = JSON.parse(JSON.stringify(data)).slice(batdau, ketthuc); //chuyển data thanhfh dạng JSON
    return res.render('products/product', {
        product: sp,
        producttype: dm,
        arr: arr,
        pre: pre,
        next: next,
        style: style,
        cookie : req.signedCookies.email
    });
    //return res.render('products/product',{ product:sp, cookie : req.signedCookies.email});
}
 //thêm sản phẩm
 module.exports.addproduct = async (req,res)=> {
    var dm = await producttypeDb.find();
     return res.render('products/addproduct',{producttype:dm , cookie : req.signedCookies.email});
 }
 module.exports.postproduct = (req, res) => {
    var size = []
    let str = req.body.namesize.split(', ')
    for(item of str){
        size.push(item)
    }
    req.body.namesize = size

    productDb.create(req.body).then(()=> res.redirect('/products/product')).catch(er => console.log(er))
 }

 //hiển thị danh mục sản phẩm
 module.exports.showproducttype = async(req, res) => {
    var data = await producttypeDb.find(); //lấy tất cả dữ liệu trong database gán vào data
    var sp = JSON.parse(JSON.stringify(data));

    return res.render('products/producttype', { producttype: sp , cookie : req.signedCookies.email });
}
 //thêm danh mục sản phẩm
module.exports.addproducttype = (req,res)=> {
    producttypeDb.create(req.body).then(()=> res.redirect('/products/producttype'))
} 

//xóa danh mục sản phẩm
module.exports.deleteproductype=(req,res) => {
    var id = req.params.id;
    producttypeDb.findByIdAndDelete(id).then(() => res.redirect('/products/producttype'))
}


//sửa sản phẩm
module.exports.editsp = async(req, res) => {
    var id = req.params.id; //lấy id của sản phẩm
    var dm = await producttypeDb.find(); //lấy taasat cả các danh mục 
    productDb.findById(id).then((x) => {
        res.render('products/editproduct', { value: x, producttype: dm , cookie : req.signedCookies.email })
    })
}

// update sản phẩm
module.exports.update = (req, res) => {
    var size = []
    let str = req.body.namesize.split(', ')
    for(item of str){
        size.push(item)
    }
    req.body.namesize = size
    var id = req.params.id;
    productDb.findByIdAndUpdate(id, req.body).then(() => res.redirect('/products/product')).catch(err => console.log(err))
}

//modul xoa sp
module.exports.deletesp = (req, res) => {
    var id = req.params.id;
    productDb.findByIdAndDelete(id).then(() => res.redirect('/products/product'))
}

//modul tìm kiếm 
module.exports.search = async(req, res) => {
    var timkiem = req.query.search;
    var sanpham = await productDb.find();
    var sp = JSON.parse(JSON.stringify(sanpham));

    var listb = sp.filter(y => y.producttype.toLowerCase().indexOf(timkiem.toLowerCase()) !== -1)
    var list = sp.filter(x => x.name.toLowerCase().indexOf(timkiem.toLowerCase()) !== -1)
    var listc = list.concat(listb);
    var listd = listc.filter((z, vitri) => listc.indexOf(z) == vitri)

    //nếu tên sản phẩm không chứa giá trị nhập vào thì nó trả về -1
    return res.render('products/product', { product: listd, a: timkiem , cookie : req.signedCookies.email})
        // console.log(list);
}

//order 
module.exports.order = async (req, res)=>{
    let order = (await orderDb.find())
    let a = JSON.parse(JSON.stringify(order))
    res.render('products/order',{order : a, cookie : req.signedCookies.email})
}

//confimed
module.exports.confimed = async (req, res) =>{
   await orderDb.findByIdAndUpdate({_id : req.params.id} , {$set:{completed : 'Đã xác nhận'}})
   res.redirect('/products/order')
}

module.exports.getUser = async (req, res) =>{
    let a = await userDb.find()
    let users = JSON.parse(JSON.stringify(a))
    res.render('products/user', {users : users, cookie : req.signedCookies.email})
}