var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '0000',
    database : 'facemash_rank'
});

connection.connect();

router.post('/ajax_send_rank', function(req, res){
    var body = req.body;
    var url = body.url;

    var sql = { url : url};
    var query = connection.query('UPDATE rank_table SET rank = rank + 1 WHERE ?', sql, function(err, rows){
        if(err) throw err;
    });
});

router.post('/ajax_result_rank', function(req, res){
    var responseData = [];
    var body = req.body;
    var call = body.call;

    var query = connection.query('SELECT * FROM rank_table', function(err, rows){
        if(err) throw err;
        else{
            for(var i = 0; i < rows.length; i++){
                if(rows[i]) {
                    var resData = { result: 'ok', url: rows[i].url, rank: rows[i].rank };          
                }
                else{
                    var resData = { result: 'none', url: "", rank: 0 }; 
                }
                responseData.push(resData);
            }
            
        }
           
        res.json(responseData);
    });
});

module.exports = router;