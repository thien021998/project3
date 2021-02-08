const express = require('express');
const mongoose = require('mongoose');
//tạo bảng dữ liệu
let producttypeSchema = new mongoose.Schema({
    name: String

});
//tạo collection
let producttypeDb = mongoose.model('producttypeDb', producttypeSchema, 'danhmuc');

module.exports = producttypeDb;