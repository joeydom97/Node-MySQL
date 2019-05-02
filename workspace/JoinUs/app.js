var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'joeydom97',
        database : 'join_us'
    }
    );
app.get("/", function(req, res){
    var q = "SELECT COUNT(*) AS count FROM users"
    connection.query(q, function(err, results){
        if(err) throw err;
        var count = results[0].count;
        //  res.send("We have " + count + " users in our db");
         res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    var person = {email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, results){
        if(err) throw err;
        res.redirect("/");
    });
});
app.listen(8080, function(){
    console.log("Server running on 8080!");
});