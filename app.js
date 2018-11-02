const express = require("express");
var request = require('request');
var app = express()

app.set("view engine", "ejs");

const POSTS_NUMBER = 2;
const REDDIT = "https://www.reddit.com/r/";
const TOPICS = ["linux", "programming"]
const LIMIT = ".json?limit=" + POSTS_NUMBER;

const PORT = 8080;


var link = "";
var results = [];

for(l in TOPICS) {
	link = REDDIT + TOPICS[l] + LIMIT;

	request(link, function (err, res, json) {
		json = JSON.parse(json);
		for(i = 0; i < POSTS_NUMBER; i++) {
			//console.log(json.data.children[i].data.title); 
			results.push(json.data.children[i].data.title);
		}
	});
}

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("index", {results: results} );
});

app.listen(PORT);
