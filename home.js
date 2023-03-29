var express = require('express'); 
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var z;
var d;
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/database", function (err, db) {
   
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
     console.log("database fired up;")
     db.collection('blog', function (err, collection) {
       
	d=collection;
         d.find().toArray(function(err, items) {
            if(err) throw err;
            
            //console.log(items)
            
           
        });                
});
     //db.close();

  
});


app.set('view engine', 'ejs');

app.all('/', function(req, res){ 
	
	d.find().toArray(function(err, items) {
            if(err) throw err;

            //console.log(items)
            z=items.reverse();
            res.render('index',{persons:z}) 
           
        });             
	//console.log(z[0]);
  
  }); 

  app.all('/blog', function(req, res){ 
  	
  res.render('blog')
  
  }); 

  

  app.post('/addblog', function(req, res){ 
  var name=req.body.name;
  var title=req.body.title;
  var blog=req.body.blog;
  


  d.insert({name:name,title:title,blog:blog},function(err, items){
  	if (err) throw err;
  	//console.log(items);
  	res.redirect('/');
});

  });

  


  app.all('*', function(req, res){ 
  res.send('Oops, this page does not exist')
  }); 

app.listen(3000);
