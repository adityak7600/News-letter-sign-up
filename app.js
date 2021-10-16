const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app =express();
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    const firstname = req.body.fName;
    const lastname = req.body.lName;
    const email = req.body.email;

    const data = {

        members:[
            {
                email_address:email,
                status:"subscribed",

                merge_fields :{
                    FNAME : firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const url = "https://us5.api.mailchimp.com/3.0/lists/0d5c2ecdc3"

    const options = {

        method: "POST",
        auth:"aditya1:3a10834fa0b686a895625bbe776fc619-us5"
        
    }

   const request= https.request(url,options,function(response){


if(response===200){
    res.send("successfully subscribed!")
}
else{
    res.send("There is error with sign in,please try again letter")
}

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })    
    })
    request.write(jsonData);
    request.end();

})

  

app.listen(3000,function(req,res){
    console.log("port open at 3000");
})


//0d5c2ecdc3
