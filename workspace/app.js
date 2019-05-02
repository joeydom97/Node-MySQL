var faker =  require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'joeydom97',
        database : 'join_us'
    }
    );

// var q = 'INSERT INTO users (email) VALUES ("rusty_the_dog@gmail.com")'
// connection.query(q, function(error, results, fields)
// {
//     if(error) throw error;
//     console.log(results)
// });
var data = [];
for(var i = 0; i < 500; i++){
   data.push([
            faker.internet.email(), 
            faker.date.past()
            ]);
}


connection.query('INSERT INTO users (email, created_at) VALUES ?', [data], function(err, result)
{
    if(err) throw err;
    console.log(result)
});
connection.end();