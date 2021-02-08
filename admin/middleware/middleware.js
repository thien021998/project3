var adminDb = require('../models/admin.model')

module.exports.checklogin = async(req, res, next) => {
    if (!req.signedCookies.email) { //kiểm tra cái cookie cos duoc gui len k

        return res.redirect('/users/login'); //không có trả về trang login
    } else { //nếu có thì gửi lên 
        // console.log(req.signedCookies.email);
        var user = await adminDb.findOne({email : req.signedCookies.email}) //tim user với id ở tren
        if (!user) {
            return res.redirect('/users/login');
        } else {
            res.locals.user = user.username
            next();
        }
    }
}

module.exports.checkregister = async(req, res, next) => {
    var user = await userDb.findOne({
        username: req.body.username
    })
    if (user) {
        res.render('user/dangky', { thongbao: 'Tài khoản đã tồn tại' })

    } else {
        next();
    }
}
