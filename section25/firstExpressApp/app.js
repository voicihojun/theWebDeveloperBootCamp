var express = require('express');
var app = express();

// "/" => "Hi, there";
app.get("/", function(req, res) {
	console.log("/");
	res.send("Hi, there");
})
// "/bye" => "goodbye!";
app.get("/bye", function(req, res) {
	console.log("/bye");
	res.send("goodbye");
})
// "/dog" => "Meow";
app.get("/dog", function(req, res) {
	console.log("/dog");
	res.send("Meow");
})

app.get("/a/:subName", function(req, res) {
	console.log(req.params);
	var subName = req.params.subName;
	res.send("WELCOME TO THE " + subName.toUpperCase() + " PAGE");
})

app.get("/a/:subName/comments/:id/:title", function(req, res) {
	var subName = req.params.subName;
	var id = req.params.id;
	var title = req.params.title;

	console.log(subName + ", " + id + ", " + title);
	res.send("WELCOME TO THE COMMENTS PAGE")
}) 

// if you put this code above the '/dog', '/bye', '/' codes, 
// every message on the browswer will be 'your are a star!'' 
app.get("*", function(req, res) {
	console.log("*");
	res.send("You are a star!");
})

// Tell Express to listen for requests
app.listen(process.env.PORT || 1111, process.env.IP || "127.0.0.1", function() {
	console.log("Server running!")
});

// if you put whatever except /dog, /, /bye, the answer in the browser will be 'Cannot GET / whatever'.


