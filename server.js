var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web-dev-summer1-2018-suledisha');


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:4200','https://bookmarked-suledisha.herokuapp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});




var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    cookie: {

        maxAge: 30 * 60 * 1000
    },
    rolling: true
}));


var bookService = require('./services/book.service.server');
bookService(app);

app.listen(process.env.PORT || 4000)