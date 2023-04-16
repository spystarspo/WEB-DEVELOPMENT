//jshint esversion:6

const express = require("express");

const app = express();

app.get('/',function(request,response){ response.send("hello");
});

app.get('/about',function(req,res){
  res.send("this a example website");
});

app.get('/contact',function(req,res){
  res.send("contact me at @bubabu");
});

app.listen(3000, function(){console.log("Server started on port 3000");
});
