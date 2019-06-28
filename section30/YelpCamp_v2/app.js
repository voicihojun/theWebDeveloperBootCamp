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
	image: String, 
	description : String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c732e7dd1944dcd50_340.jpg",
// 	description: "Beautiful Granite!!"
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
			res.render("index", {campgrounds: allCampgrounds});
		}
	})
	// res.render("campgrounds", {campgrounds:campgrounds});
})

// CREATE - add new campground to the DB
app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
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

// Delete
app.get("/campgrounds/delete/:id", function(req, res) {
	Campground.remove({_id: req.params.id}, function(err, deletedCampground) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})
	// res.send("delete page");
})

// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	})
})


app.listen(process.env.PORT || 5555, process.env.IP, function() {
	console.log("YelpCamp version 2 Server Started!!");
})


