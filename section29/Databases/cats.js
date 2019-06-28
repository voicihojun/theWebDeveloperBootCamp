var mongoose = require('mongoose');

// the syntax is changed. so, we need to put two arguments like url, {useNewUrlParser:true}
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser:true});

// we need to declare the data's format
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);


// make the data as a name 'george' to save it
// var george = new Cat({
// 	name: "Lucy",
// 	age: 7,
// 	temperament: "Evil"
// });

// with that data 'george', .save(), 
// to verify it well done, we put callback function.
// george.save(function(err, cat) {
// 	if(err) {
// 		console.log("Something went wrong!");
// 	} else {
// 		console.log("We just saved a cat to the DB");
// 		console.log(cat);
// 	}
// });

// .create is make a new data and save it at once. 
Cat.create({
	name: "Russian Blue",
	age: 4,
	temperament: "Sympa"
}, function(err, cat) {
	if(err) {
		console.log("Create Error");
		console.log(err);
	} else {
		console.log("Create a new data");
		console.log(cat);
	}
});

Cat.find({}, function(err, cats) {
	if(err) {
		console.log("Oh No, Error");
		console.log(err);
	} else {
		console.log("All the cats...");
		console.log(cats);
	}
});
