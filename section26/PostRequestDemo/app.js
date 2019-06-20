var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var friends = ["Irene", "Fabio", "Charlotte", "JR", "Bomi"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
	res.render("home");
})


app.post("/addfriend", function(req, res) {
	console.log(req.body.newfriend);
	friends.push(req.body.newfriend);
	res.redirect("/friends");
})

app.get("/friends", function(req, res) {
	res.render("friends", {friends : friends});
})


app.listen(process.env.PORT || 4444, process.env.IP, function() {
	console.log("Server started!!!!!!");
})