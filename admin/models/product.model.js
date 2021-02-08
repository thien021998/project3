const mongoose = require('mongoose');

//tạo bảng dữ liệu
const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price:Number,
    amount: Number,
    image: String,
    producttype: String,
    description: String,
    namesize : Array
});
// tạo collection
module.exports = mongoose.model('productDb',productSchema,'product');

