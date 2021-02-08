const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
    // const  = require('');
const productRouter = require('./routes/product.route');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopquanao', { useNewUrlParser: true, useUnifiedTopology: true });

var middleware = require('./middleware/middleware')
const userRouter = require('./routes/user.route');

const apiRouter = require('./api/router.api.js');
const app = express();
const port = 9999;


app.use(cors())
app.use(cookieParser('hello'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', middleware.checklogin, productRouter); //khai báo route sản phẩm

app.use('/users', userRouter);

app.use('/api', apiRouter)
    //config views
app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({
    defaultlayout: 'main',
    extname: '.hbs'
}));
app.use(express.static('public'))

app.get('/', middleware.checklogin, (req, res) => {
    res.render('index', { cookie: req.signedCookies.email })
});
app.get('/', middleware.checkregister, (req, res) => res.render(('index', {})))
app.listen(port, () => console.log('server is running in port :', port));