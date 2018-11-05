const express = require("express");
var request = require('request');
var app = express()

app.set("view engine", "ejs");

const POSTS_NUMBER = 10;
const REDDIT = "https://www.reddit.com/";
const TOPICS = ["linux","programming"] //append the list with your topics
const LIMIT = ".json?limit=" + POSTS_NUMBER;

const PORT = 8080;

var link = "";
var results = [];

for(l in TOPICS) {
	link = REDDIT + "r/" + TOPICS[l] + LIMIT;

	request(link, function (err, res, json) {
		json = JSON.parse(json);
		for(i = 0; i < POSTS_NUMBER; i++) {
			results.push({
				key: json.data.children[i].data.title,
				value: REDDIT + json.data.children[i].data.permalink
			});
		}
	});
}

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("index", {results: results} );
});

app.listen(PORT);
