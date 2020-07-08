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

//******************************* USer ****************************

app.get('/getUserByMAil', function(req, res) {
  mail = req.query.mail;
  connection.query('SELECT * FROM `users` WHERE `email` ='+"'"+mail+"'",
   function(error, results, fields) {  
    res.json(results);
  });
});

app.get('/getUserLogin', function(req, res) {
    mail = req.query.mail;
    password = req.query.password;
    connection.query('SELECT * FROM `users` WHERE `email` ='+"'"+mail+ ' and `password` ='+"'"+password+"'",
     function(error, results, fields) {  
      res.json(results);
    });
});

app.get('/AddUser/:mail/:nom/:prenom/:password/:company',(req,res)=>{
    const today = new Date()
	var sql ="INSERT INTO user(email, first_name,last_name,company, password,created) values('"+ [req.params.mail]+"', '"+[req.params.nom] +"', '"+ [req.params.prenom] +"', '"+ [req.params.company] +"', '"+ [req.params.password] +"', '"+ today +"')"
    connection.query(sql,(err,rows,fields)=>{
	if(!err){		
			res.send("user added successfully");
	}
	else
		console.log(err);
    })
});

// Update User 
/*
app.get('/UpdateUser',(req,res)=>{
	  first_name = req.query.first_name;
      last_name = req.query.last_name;
      company = req.query.company;
      password = req.query.company;

var sql1 ='UPDATE `users` WHERE `id` ='+id_film;
    	connection.query(sql1,(err,rows,fields)=>{


		if(!err)
		{
			//res.send(""+rows[0].nbtickets);
		
		var nb = parseInt(rows[0].nbtickets) - parseInt(nbtickets);
		var sql ="UPDATE film SET nbtickets="+nb+" WHERE `id` ="+id_film ;
    connection.query(sql,(err,rows,fields)=>{


	if(!err){
		res.send("updated successfully");
	
	}
	else
		console.log(err);
})

}
		else
			console.log(err);
		})


	

});
*/