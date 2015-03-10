var https = require('https');
var nconf = require('nconf');
var jsdom = require('jsdom-nogyp');
//var $ = require('jquery')(jsdom.jsdom().createWindow())

/** Getting the Youtube API from the config file **/
//TODO fix the path for the nconf to get the config lol
// nconf.argv().env().file({file: '/home/shaumik/Programming/musicdl/musicdl/musicdl_logic/config.json'});
// var youtubeAPIKey = nconf.get('youtubeAPIKey');

//https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDQx8D-u1LCSnHMMDWHF_CQcFUkhYVjNa8&part=snippet,contentDetails,statistics,status
//&part=snippet,contentDetails,statistics,status
//https://www.googleapis.com/youtube/v3/search?part=id&q=no+game+no+life&key={YOUR_API_KEY}

var youtubeAPIKey = process.env.youtubeKey||"";

function youtubeAPIQuery(search, callback) {
	console.log('API Key:',youtubeAPIKey);
	var url = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=" 
				+ search + "&key=" 
				+ youtubeAPIKey;
				
	console.log('url ',url);
	json = ""
	https.get(url, function(response) {
		//console.log(respond.body);
		response.on('data', function(data){
			json += data.toString();
			//console.log(json);
		});
		
		response.on('end', function(){
			console.log(json);
			var html = JSON.parse(json);
			var items = html['items'];
			console.log('items: ', items[1]);
			var music_code = items[1]['id']['videoId'];
			var title = items[1]["snippet"]["title"];
			
			console.log(title);
			console.log(music_code);
			
			if(music_code && title){
				callback(music_code,title);
			}
			
		});
		
	}).on('error',function(error){
			console.log(error);
		});
}


//youtubeAPIQuery('no game no life');
module.exports = youtubeAPIQuery
	
