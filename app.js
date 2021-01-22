const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");// send our file to the browser

 
	});
app.post("/",function(req,res){

    const query = req.body.cityName;
    const apiKey = "68868548923188d2d91560b294ae9612";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units=metric";
	
	https.get(url, function(response){
		console.log(response.statusCode);
	
	    response.on("data",function(data){
		   const weatherData = JSON.parse(data)
		   const temp = weatherData.main.temp;
		   const weatherDescription = weatherData.weather[0].description;
		   const country = weatherData.sys.country;
		   const icon = weatherData.weather[0].icon;
		   const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
		   res.write("<p>The weather currently is " + weatherDescription + "</p>");
		   res.write("<h1>The temperature in " + query +" that is located in "+ country +" is "+ temp +" degree celcius.</h1>" );
		   res.write("<img src=" + imageURL + ">");
		   res.send();

           });


    });
  });  

app.listen(3000, function(){
	console.log("Server running on port 3000");
  });