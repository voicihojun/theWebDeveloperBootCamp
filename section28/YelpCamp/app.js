var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render('landing')
})

app.get("/campgrounds", function(req, res) {
	var campgrounds = [
		{name: "Salmon Creek", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732e7dd09244c759_340.jpg"},
		{name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732e7dd09244c759_340.jpg"},
		{name: "Mountain Goat's Rest", image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732e7dd09244c759_340.jpg"}
	]

	// res.send(campgrounds);
	res.render("campgrounds", {campgrounds:campgrounds});
})


app.listen(process.env.PORT || 5555, process.env.IP, function() {
	console.log("YelpCamp Server Started!!");
})