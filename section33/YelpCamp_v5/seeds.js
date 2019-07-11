var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{name: "Cloud's Rest",
	 image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	 description: "William Shakespeare (bapt. 26 April 1564 – 23 April 1616)[a] was an English poet, playwright and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.[2][3][4] He is often called England's national poet and the Bard of Avon.[5][b] His extant works, including collaborations, consist of approximately 39 plays,[c] 154 sonnets, two long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright.[7]"
	},

	{name: "Oka",
	 image: "https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	 description: "William Shakespeare (bapt. 26 April 1564 – 23 April 1616)[a] was an English poet, playwright and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.[2][3][4] He is often called England's national poet and the Bard of Avon.[5][b] His extant works, including collaborations, consist of approximately 39 plays,[c] 154 sonnets, two long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright.[7]"
	},

	{name: "Montremblant",
	 image: "https://images.pexels.com/photos/1531683/pexels-photo-1531683.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	 description: "William Shakespeare (bapt. 26 April 1564 – 23 April 1616)[a] was an English poet, playwright and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.[2][3][4] He is often called England's national poet and the Bard of Avon.[5][b] His extant works, including collaborations, consist of approximately 39 plays,[c] 154 sonnets, two long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright.[7]"
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
