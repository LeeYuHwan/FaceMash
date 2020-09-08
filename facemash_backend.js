var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql =require('mysql');
var main = require('./router/main');
var dataBase = require('./router/dataBase/dataBase');

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(main);
app.use(dataBase);