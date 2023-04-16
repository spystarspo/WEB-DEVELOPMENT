//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));   //for installing of body-parser ..it is bodyparser code


  //calculator
app.get('/',function(req,res){                      //to get the data
  res.sendFile(__dirname+"/index.html");
});
app.post('/',function(req,res){                    //to post the data

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 +num2;
  res.send("The result of the calculation is " + result);     //to send the posted data to the browser
});


//bmi calculator
app.get('/bmical',function(req,res){
  res.sendFile(__dirname+"/bmical.html");
});
app.post('/bmical',function(req,res){
  var weight=parseFloat(req.body.weight);
  var height=parseFloat(req.body.height);
  var result = weight / (height*height);
  res.send(" Your BMI is "  +  result );
});
app.listen(3001, function(){console.log("Server started on port 3001");
});
