var express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String, 
	image: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732e7dd09244c759_340.jpg"
// }, function(err, campground) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Newly created campground");
// 		console.log(campground);
// 	}
// })

app.get("/", function(req, res) {
	res.render('landing')
})

// INDEX
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			// res.send(allCampgrounds);
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	})
	// res.render("campgrounds", {campgrounds:campgrounds});
})

// CREATE - add new campground to the DB
app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	// campgrounds.push(newCampground);
	Campground.create(newCampground, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})
})

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
})


app.listen(process.env.PORT || 5555, process.env.IP, function() {
	console.log("YelpCamp version 2 Server Started!!");
})