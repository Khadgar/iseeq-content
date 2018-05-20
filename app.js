var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

var mongoose = require('mongoose');

//configure the app
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://admin:admin@ds119070.mlab.com:19070/iseeqdb');

var Content = require(path.join(__dirname, './models/Content.js'))(mongoose);

//routing in duedate-calculator.js
require(path.join(__dirname, './routes/content.js')).contentManager(app, Content);

// rouing
var adminIndexPath = path.join(__dirname, './client/admin/public/index.html');
var adminPublicPath = express.static(path.join(__dirname, './client/admin/public'));
app.use('/admin', adminPublicPath);

var userIndexPath = path.join(__dirname, './client/user/public/index.html');
var userPublicPath = express.static(path.join(__dirname, './client/user/public'));
app.use('/', userPublicPath);
app.get('/admin', function(_, res) {
    res.sendFile(adminIndexPath);
});
app.get('/', function(_, res) {
    res.sendFile(userIndexPath);
});

//create server
http.listen(app.get('port'), function() {
    console.log('iseeq-content listening on localhost:' + app.get('port'));
});