var request = require('request');

const POSTS_NUMBER = 5;
const REDDIT = "https://www.reddit.com/r/";
const TOPICS = ["linux", "programming"]
const LIMIT = ".json?limit=" + POSTS_NUMBER;

//var link = REDDIT + TOPIC + LIMIT;

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
