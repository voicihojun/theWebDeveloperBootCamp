var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send('Hi there, welcome to my assignment!');
})

app.get("/speak/:animal", function(req, res) {
	var animal = req.params.animal.toLowerCase();
	var sound = "";
	// if(animal === "pig") {
	// 	sound = "Oink";
	// } else if(animal === "cow") {
	// 	sound = "Moo";
	// } else if(animal === "dog") {
	// 	sound = "Woof Woof";
	// } else {
	// 	res.send("No animal like that!");	
	// 	return;
	// }
	// instead of the above coding style, the below one is better. 

	var sounds = {
		pig : "oink",
		cow : "moo",
		dog : "woof woof",
		cat : "i don't like human, meow",
		goldfish : "..."
	}

	sound = sounds[animal];
	res.send("The " + animal + " says '" + sound + "'");
})

app.get("/repeat/:word/:times", function(req, res) {
	var word = req.params.word;
	var times = Number(req.params.times);
	// console.log(typeof(times)); // before putting the Number, times is String
	var result = "";
	for(var i = 0; i < times; i++) {
		result += word + " ";
	}
	res.send(result);
})

var port = process.env.PORT || 2222 ;
var ip = process.env.IP || "127.0.0.1";

app.listen(port, ip, function() {
	console.log("Server started!");
})