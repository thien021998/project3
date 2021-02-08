var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({

    username: String,
    password: String,
    email: String,
    phonenumber: Number,
    cart : Array
    
})

module.exports = mongoose.model('userDb', adminSchema, 'user');