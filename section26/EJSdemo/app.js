var express = require('express');
var app = express();

app.use(express.static("public"));


app.get("/", function(req, res) {
	res.render("home.ejs");
})

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	// res.send("You fell in love with " + thing);
	res.render("love.ejs", {thing : thing});
})

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Macbeth", author : "Shakespeare"},
		{title: "Norwegian forest", author : "Murakami Haruki"},
		{title: "You are so smart", author : "Hojun"}
	]

	res.render("posts.ejs", {posts : posts});
})




app.listen(process.env.PORT || 3333, process.env.IP, function() {
	console.log("Server started!");
});