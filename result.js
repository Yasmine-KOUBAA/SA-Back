var mysql = require('mysql');
const host = 'localhost';
const user = 'root';
const password = '';

var bodyParser=require("body-parser");
var connection = mysql.createConnection({
  host: 'localhost',
  user: user,
  password : password,
  database: 'pfe_db'
}); 
var express = require('express');
var app = express();
var port=5001;
  app.set('port', process.env.PORT || port);
  app.listen(app.get('port'), function () {
      console.log('server is running on port ',app.get('port'));
  });
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
connection.connect();


/* results ********************************/
app.get('/getAllResults', function(req, res) {
  connection.query('SELECT * FROM `results` ', function(error, results, fields) {
    if (results.length > 0) {
      for (i = 0; i < results.length; i++)
        console.log("id : " + results[i].id + " id_user " + results[i].id_user + " mot " + results[i].mot);
    }
    res.json(results);
  });
})


app.get('/AddResult/:id_user/:Positive/:Negative/:Neutral/:Sadness/:Joy/:Fear/:Anger/:Analytical/:Confident/:Tentative/:word',(req,res)=>{
    const today = new Date()
    var sql ="INSERT INTO results(id_user,Positive,Negative,Neutral,Sadness,Joy,Fear,Anger,Analytical,Confident,Tentative,word, created) values('"+ [req.params.id_user]+"', '"+[req.params.Positive] +"', '"+[req.params.Negative] +"', '"+[req.params.Neutral] +"', '"+[req.params.Sadness] +"', '"+[req.params.Joy] +"', '"+[req.params.Fear] +"', '"+[req.params.Anger] +"', '"+[req.params.Analytical] +"', '"+[req.params.Confident] +"', '"+[req.params.Tentative] +"', '"+[req.params.word] +"', '"+today +"')"
    connection.query(sql,(err,rows,fields)=>{


	if(!err){
		
			res.send("Result added successfully");

	}
	else
		console.log(err);
})
});


app.get('/getResultsByUser', function(req, res) {
  id_user = req.query.id_user;
  connection.query('SELECT * FROM `results` WHERE `id_user` ='+id_user,
   function(error, results, fields) {  
    res.json(results);
  });
});
