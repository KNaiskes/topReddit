const express = require("express");
var request = require('request');
var app = express()

const POSTS_NUMBER = 2;
const REDDIT = "https://www.reddit.com/r/";
const TOPICS = ["linux", "programming"]
const LIMIT = ".json?limit=" + POSTS_NUMBER;

const PORT = 8080;

app.get("/", (req, res) => res.send("Testing"))
app.listen(PORT);

var link = "";

for(l in TOPICS) {
	link = REDDIT + TOPICS[l] + LIMIT;

	request(link, function (err, res, json) {
		json = JSON.parse(json);
		for(i = 0; i < POSTS_NUMBER; i++) {
			console.log(json.data.children[i].data.title); 
		}
	});
}
