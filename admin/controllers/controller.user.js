var mongoose = require('mongoose');
var adminDb = require('../models/admin.model');

const { json } = require('body-parser');

module.exports.register = (req, res) => {

    adminDb.create(req.body).then(() => res.redirect('/users/login'))
}

module.exports.pageregister = (req, res) => {
    return res.render('users/register');
}

module.exports.pagelogin = (req, res) => {
    console.log(req.signedCookies.email);
    return res.render('users/login')
}

module.exports.login = async(req, res) => {
    var user = await adminDb.findOne({
        email: req.body.email
    });
    // console.log(user)
    if (user) { //nếu có
        if (user.password == req.body.password) { //kiểm tra mật khẩu
            res.cookie('email', user.email, {
                signed: true
            })
            return res.redirect('/'); //nếu đúng thì vào trang chủ
        } else {
            res.render('users/login', { thongbao: 'Sai mât khẩu rồi' })
        }
    } else {
        return res.render('users/login', { thongbao: 'Tài khoản không đúng' })
    }
}

// module.exports.check = (req, res, next) => {
//     if (4 < 5) {
//         next();//next được gọi thì mới thực hiện tiếp
//     }
// }

module.exports.logout = (req, res) => {
    res.clearCookie('email'); //xoa di cookies
    return res.redirect('/users/login');
}
