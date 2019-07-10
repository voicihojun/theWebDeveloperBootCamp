var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{name: "Cloud's Rest",
	 image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	 description: "blah blah blah blah blah blah "

	},

	{name: "Oka",
	 image: "https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	 description: "blah blah blah blah blah blah "

	},

	{name: "Montremblant",
	 image: "https://images.pexels.com/photos/1531683/pexels-photo-1531683.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	 description: "blah blah blah blah blah blah "

	}

]

function seedDB() {
	// REMOVE ALL CAMPGROUNDS
	Campground.deleteMany({}, function(err) {
		if(err) {
			console.log(err);
		}
		console.log('removed Campground');
		// ADD A FEW CAMPGROUNDS
		data.forEach(function(seed) {
			Campground.create(seed, function(err, campground) {
				if(err) {
					console.log(err);
				} else {
					console.log("added campgrounds");
					//create a comment
					Comment.create(
						{comment: "This place is great, but I wish there was internet",
						 author: "Homer"
						}, function(err, comment) {
							if(err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();	
								console.log("Created a new comment!");
							}
							
						});
				}
			});	
		});
	});	



	// ADD A FEW COMMENTS
}

module.exports = seedDB;
