var express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	Campground = require('./models/campground'),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require('./seeds');



mongoose.connect("mongodb://localhost/yelp_camp_v6", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.get("/", function(req, res) {
	res.render('landing')
})

// INDEX
app.get("/campgrounds", function(req, res) {
	console.log(req.user);
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			// res.send(allCampgrounds);
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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


// ==============
// AUTH ROUTES
// ==============

//show register form
app.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/campgrounds");
		});
	});
});

// show login form
app.get("/login", function(req, res) {
	res.render("login");
});

// handling login logic
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", 
	{
		successRedirect : "/campgrounds",
		failureRedirect : "/login"
	}), function(req, res){
	 
});

//login route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}

app.listen(process.env.PORT || 4333, process.env.IP, function() {
	console.log("YelpCamp version 6 Server Started!!");
})


