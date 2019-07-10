var express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	seedDB = require('./seeds');

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


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
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("show", {campground: foundCampground});
		}
	})
})


app.listen(process.env.PORT || 5555, process.env.IP, function() {
	console.log("YelpCamp version 3 Server Started!!");
})


