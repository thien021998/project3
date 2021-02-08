var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({

    username: String,
    password: String,
    email: String,
    phonenumber: Number,
    
})

module.exports = mongoose.model('adminDb', adminSchema, 'admin');