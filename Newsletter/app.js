const express=require("express");

 const https=require("https");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
//static floders like css,img to work on server we use this function of express called static
app.use(express.static("public"));  //create a floder called public to keep all static files to access on server



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName= req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  //console.log(firstName,lastName,email);

  const data ={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{ FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  };
   const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/0fdc33cb36"

    const options={
      method: "POST",
      auth: "rudhira:cf771e128ce37a3561eb1d7de8519c26-us21"
  }
  const request = https.request(url,options,function(response){
    if (response.statusCode === 200){
      //res.send("Successfully subscribed!");
      res.sendFile(__dirname + "/success.html");
    } else {
      //res.send("There was an error with signing up, please try again!");
      res.sendFile(__dirname + "/failure.html");
    }

     response.on("data",function(data){
       console.log(JSON.parse(data));
     })
   })
   request.write(jsonData);
   request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000.");
});

//api key
//cf771e128ce37a3561eb1d7de8519c26-us21

//audience id or list id
//0fdc33cb36
