const express = require('express');


const app = express();
const fs = require('fs');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

  var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pfe_db"
});
con.connect();
 
 // app.use(bodyParser.urlencoded({extended:true}));
  //app.use(bodyParser.json())
  
  
  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/savefile', function (req, res) {    
  var mot = req.body.word;
  console.log(req.body.word);
    fs.writeFileSync('./word.txt',mot,finished);
   
    function finished(err){
      console.log('all set');
    }   
    res.send("finish")
})

app.post('/savefile2', function (req, res) {    
  var word1 = req.body.word1;
  var word2 = req.body.word2;
  var mot = word1 +" :"+word2;
  console.log(req.body.word1);
    fs.writeFileSync('./word.txt',mot,finished);
   
    function finished(err){
      console.log('all set');
    }   
    res.send("finish")
})

app.get('/getJSON', function (req, res) {
  var text = fs.readFileSync('./result1.JSON','utf8');
  var texte = JSON.parse(text) ;
  res.send(texte)
})


app.get('/getJSON2', function (req, res) {
  var text = fs.readFileSync('./result2.JSON','utf8');
  var texte = JSON.parse(text) ;
  res.send(texte)
})

app.get('/getJSON3', function (req, res) {
  var text = fs.readFileSync('./result3.JSON','utf8');
  var texte = JSON.parse(text) ;
  res.send(texte)
})
/* ************ Result *************/
app.get('/getAllResults', function(req, res) {
  con.query("SELECT * FROM results ", function(error, results, fields) {
    if (results.length > 0) {
     // for (i = 0; i < results.length; i++)
       // console.log("id : " + results[i].id + " id_user " + results[i].id_user + " mot " + results[i].word);
     }
    res.json(results);
  });
})

app.get('/removeResult/:id',(req,res)=>{
    var id = req.params.id;
    console.log(id) 
    var sql ="DELETE FROM results WHERE id = '"+ id+"'"
    con.query(sql,(err,rows,fields)=>{
    if(!err){    
      res.send("results");
    }
    else
      console.log(err);
    })
});

app.post('/getResult',(req,res)=>{
  var id = req.body.id;    
  var sql ="SELECT * FROM results WHERE id = '"+ id+"'";
  con.query(sql, function (err, result) {
  if (err) throw err;
    console.log(result);
    res.json(results);
  });
});
app.post('/saveResult',(req,res)=>{
  var word = req.body.word;
  var joy = req.body.joy;
  var fear = req.body.fear;
  var anger = req.body.anger;
  var tentative = req.body.tentative;
  var confident = req.body.confident;
  var analytical = req.body.analytical;
  var sad = req.body.sad;
  var positive = req.body.positive;
  var negative = req.body.negative;
  var neutral = req.body.neutral;  
  var user_id =1;
  const today = new Date();
  var day = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  var n3 = today.getTime();
  var date1= today.toString().substring(0,15) ;
  console.log(today);
  var sql ="INSERT INTO results(id_user,Positive,Negative,Neutral,Sadness,Joy,Fear,Anger,Analytical,Confident,Tentative,word,created) values('"+ user_id+"', '"+positive +"', '"+negative +"', '"+neutral +"', '"+ sad +"', '"+ joy +"', '"+ fear +"', '"+ anger +"', '"+ analytical+"', '"+ confident +"', '"+ tentative +"', '"+ word +"', '"+date1 +"')"
  con.query(sql,(err,rows,fields)=>{


  if(!err){
  
    res.send("Result added successfully");

}
else
  console.log(err);
})
});

/********** User ************************ */
app.post('/getuserByemail', function(req,res){
    var mail = req.body.email;
    var password = req.body.password;
    console.log(req.body.email);
    con.query('SELECT * FROM `users` WHERE `email` ='+"'"+mail+ ' and `password` ='+"'"+password+"'",
    function(error, results, fields) {  
      res.json(results);
      
    });
});

app.get('/getuserById/:id', function(req,res){
  var id = req.params.id; 
  
  con.query("SELECT * FROM users WHERE id ="+id,
  function(error, results, fields) {  
    res.json(results);
    
  });
});

app.put('/UpdateUser/:id', function(req,res){
  var id = req.params.id; 
  var name = req.body.name; 
  var email = req.body.email; 
  var company = req.body.company; 
  con.query("UPDATE users SET first_name= '"+ name +"',email='"+ email +"',company='"+ company +"' WHERE id = "+id,  function (err, resultat) {
      if(err) {
          console.log("error: ", err);
          //res(null, err);
      }else{   
        res.json(resultat);
      }
  }); 
  
  
});

 //tweets
app.get('/gettweets', function (req, res) {
  var text = fs.readFileSync('./tweets5.JSON','utf8');
 //var texte = JSON.parse(text) ;
  try {
    var texte = JSON.parse(text) ;
  } catch (e) {
  return false;
  }
  res.send(texte)
})

app.listen(3001,'192.168.1.21', function () {
  console.log('Example app listening on port 3001!')
})


 


