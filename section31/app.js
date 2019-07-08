var bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	express = require('express'),
	app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser:true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title :  String,
	image : String, 
	body : String,
	created : {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: 'Test Blog',
// 	image: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
// 	body: "THIS IS A BLOG BODY!"
// });

// RESTFUL ROUTES

app.get("/", function(req, res) {
	res.redirect("/blogs");
})
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs){
		if(err) {
			console.log('ERROR');
		} else {
			res.render("index", {blogs: blogs});
		}
	})
})

app.listen(process.env.PORT || 2345, process.env.IP, function() {
	console.log("Server is running!");
})