var express = require('express');
var app = express();


app.get("/", function(req, res) {
	res.render("home.ejs");
})

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	// res.send("You fell in love with " + thing);

	res.render("love.ejs", {thing : thing});
})





app.listen(process.env.PORT || 3333, process.env.IP, function() {
	console.log("Server started!");
});