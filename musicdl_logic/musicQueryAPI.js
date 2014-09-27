var https = require('https');
var nconf = require('nconf');
var jsdom = require('jsdom-nogyp');
var $ = require('jquery')(jsdom.jsdom().createWindow())

/** Getting the Youtube API from the config file **/
//TODO fix the path for the nconf to get the config lol
// nconf.argv().env().file({file: '/home/shaumik/Programming/musicdl/musicdl/musicdl_logic/config.json'});
// var youtubeAPIKey = nconf.get('youtubeAPIKey');

//https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDQx8D-u1LCSnHMMDWHF_CQcFUkhYVjNa8&part=snippet,contentDetails,statistics,status

//https://www.googleapis.com/youtube/v3/search?part=id&q=no+game+no+life&key={YOUR_API_KEY}

var youtubeAPIKey = "AIzaSyDQx8D-u1LCSnHMMDWHF_CQcFUkhYVjNa8";

function youtubeAPIQuery(search, callback) {
	//console.log('API Key:',youtubeAPIKey);
	var url = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + search + "&key=" + youtubeAPIKey;
	console.log('url ',url);
	json = ""
	https.get(url, function(response) {
		//console.log(respond.body);
		response.on('data', function(data){
			json += data.toString();
			//console.log(json);
		});
		
		response.on('end', function(){
			//console.log("full json object:", JSON.parse(html));
			var music_code = parseResponse(JSON.parse(json));
			console.log(music_code);
			callback(music_code);
			
		});
		
	}).on('error',function(error){
			console.log(error);
		});
}

function parseResponse(html){
	//console.log('html: ',html);
	//TODO: check for 400 or 404 or any other error
	var items = html['items'];
	//console.log('items: ', items);
	var video_id = items[0]['id']['videoId'];
	console.log("video id", video_id)
	return video_id;
	//console.log(video_id);
}

//youtubeAPIQuery('no game no life');
module.exports = youtubeAPIQuery
	
