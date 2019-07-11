var express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require("./models/comment")
	seedDB = require('./seeds');



mongoose.connect("mongodb://localhost/yelp_camp_v5", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB();

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
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
	res.render("campgrounds/new");
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
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})
})

// ========================
// COMMENT ROUTE
// ======================== 
app.get("/campgrounds/:id/comments/new", function(req, res) {
	// find campground by id
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: foundCampground});		
		}
	})	
})

app.post("/campgrounds/:id/comments", function(req, res) {
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
	//create new comment
	//connect new comment to campground
	//redirect to campground show page

})

app.listen(process.env.PORT || 5555, process.env.IP, function() {
	console.log("YelpCamp version 5 Server Started!!");
})


