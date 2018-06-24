var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_4jkbsgqm:1j4j6uu10641cmgfv81cckabi0@ds215961.mlab.com:15961/heroku_4jkbsgqm');


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
var userService = require('./services/user.service.server');
userService(app);
var likeService = require('./services/like.service.server');
likeService(app);
var authoredService = require('./services/authoredBook.service.server');
authoredService(app);
var reviewService = require('./services/review.service.server');
reviewService(app);

app.listen(process.env.PORT || 4000)