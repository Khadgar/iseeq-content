var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);

//configure the app
app.set('port', process.env.PORT || 3000);

var indexPath = path.join(__dirname, './public/index.html');
var publicPath = express.static(path.join(__dirname, './public'));
app.use('/', publicPath);

//create server
http.listen(app.get('port'), function() {
    console.log('iseeq-admin server listening on localhost:' + app.get('port'));
});