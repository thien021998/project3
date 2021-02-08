const productDb = require('../models/product.model')
const producttypeDb = require('../models/producttype.model')
const userDb = require('../models/user.model')
const oderDb = require('../models/order.model')

const jwt = require('jsonwebtoken') // json web token
const { rsort } = require('semver')
const orderModel = require('../models/order.model')
const encodedToken = (data) =>{
  return jwt.sign({
    iss : 'jwt',
    sub : data,
    iat : new Date().getTime()
  }, 'nodejsApi')
}

module.exports.getProduct = async(req, res) => {
    let products = await productDb.find()
    return res.json(products)
}

module.exports.detail = async(req, res) => {
    let id = req.params.id;
    let product = await productDb.findOne({ _id: id })
    return res.json(product)
}

module.exports.getProducttype = async(req, res) => {
    let producttypes = await producttypeDb.find()
    return res.json(producttypes)
}

module.exports.getProductByCategory = async(req, res) =>{
    let danhmuc = await producttypeDb.findById(req.params.id)
    let products = await productDb.find({producttype : danhmuc.name})
    return res.json(products)
}

// User

//login
module.exports.login = async(req, res) => {
    let user = await userDb.findOne({email : req.body.email})
    if(user){
        if(user.password == req.body.password){
            let token = encodedToken(user) // tao token
            return res.json({token : token, user : user}).send('login success')
        }else{
            return res.status(400).json({thongbao : 'Sai mật khẩu'})
        }
    }else{
        return res.status(400).json({thongbao : 'Tài khoản không tồn tại'})
    }
}

// dangky
module.exports.register = async (req, res) => {
    let user = await userDb.findOne({email : req.body.email})
    if(!user){
        await userDb.create(req.body)
        return res.status(200).send('done')
    }else{
        return res.json({thongbao : 'Tài khoản đã tồn tại'})
    }
}

//cart 
module.exports.updateCart = async (req, res) =>{
   await userDb.findOneAndUpdate({_id : req.params.id}, {$set:{cart : req.body}})
   return res.send('done')
}

module.exports.getCart = async (req, res) =>{
   let cart =  (await userDb.findOne({_id : req.params.id})).cart
   res.json(cart)
}

//checkout

module.exports.checkout = async (req, res) =>{
    await orderModel.create(req.body)
    res.send(200, 'ok')
}

//update quantityProduct

module.exports.updateProduct = async(req, res) =>{
    let product = await productDb.findOne({_id : req.params.id})
    // console.log(product);
    let quantity = parseInt(product.amount) - parseInt(req.params.quantity)
    let a = await productDb.findOneAndUpdate({_id : req.params.id}, {$set:{amount : quantity}})
    res.json(a)
}
//search


module.exports.search = async(req, res) =>{
    loaibodau = (str) =>{
        var AccentsMap = [
          "aàảãáạăằẳẵắặâầẩẫấậ",
          "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
          "dđ", "DĐ",
          "eèẻẽéẹêềểễếệ",
          "EÈẺẼÉẸÊỀỂỄẾỆ",
          "iìỉĩíị",
          "IÌỈĨÍỊ",
          "oòỏõóọôồổỗốộơờởỡớợ",
          "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
          "uùủũúụưừửữứự",
          "UÙỦŨÚỤƯỪỬỮỨỰ",
          "yỳỷỹýỵ",
          "YỲỶỸÝỴ"    
        ];
        for (var i=0; i<AccentsMap.length; i++) {
          var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
          var char = AccentsMap[i][0];
          str = str.replace(re, char);
        }
        return str;
      }
    let products = await productDb.find()
    // console.log(req.params.text);
    let a = products.filter(item => loaibodau(item.name).toLowerCase().indexOf(loaibodau(req.params.text).toLowerCase()) !== -1).concat(products.filter(item => loaibodau(item.producttype).toLowerCase().indexOf(loaibodau(req.params.text).toLowerCase()) !== -1))
    let productSearch = a.filter((item, index) => a.indexOf(item) == index)
    return res.json(productSearch)

}
// pagination
module.exports.pagination = async (req, res) =>{
    let start = (req.params.page - 1) * 8 
    let products = await productDb.find()
    let allPage = Math.ceil(products.length / 8)
    let pagination = products.slice(start, start + 8 )
    res.json({pagination : pagination, allPage : allPage})
}


//filter
module.exports.filter = async(req, res) =>{
    let min = req.params.min
    let max = req.params.max
    let pr = await productDb.find()
    let product = pr.filter(item => {
        return item.price >= min && item.price <=max
    })
    res.json(product)
}


module.exports.getDm = async(req, res)=>{
    let id = req.params.id
    let dm = await producttypeDb.findOne({_id :id})
    console.log(dm)
    res.json(dm.name)
}
