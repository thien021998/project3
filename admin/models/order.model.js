var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  username : String,
  userPhone : Number,
  address : String,
  products : [],
  totalOrder : Number,
  completed : String
})

module.exports = mongoose.model('order', adminSchema, 'order');