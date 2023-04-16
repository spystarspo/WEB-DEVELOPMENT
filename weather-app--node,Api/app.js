const express=require("express");

 const https=require("https");
 const bodyParser = require("body-parser");
const app = express();




app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
 //console.log(req.body.cityName);
 const query = req.body.cityName;
 const apikey = "a3aaebfb3feb3a907cfb1f3eb0ba934e";
 //const units = "imperial#";
 const units= "metrics";
//const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apikey+ "&units=" +units;
const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apikey+ "&units=" +units ;
 https.get(url,function(response){
   console.log(response.statusCode);

   response.on("data",function(data){
     const weatherData= JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "</P>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1> ");
      res.write("<img src=" + imageURL + ">"); //res.write is to send back img or other data to the browser because only one res.send() can be used but multiple res.write can be used.
      res.send();

   })

 })

});







app.listen(3000,function(){
  console.log("server is running on port 3000.");
});
