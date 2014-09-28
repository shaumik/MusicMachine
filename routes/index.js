var express = require('express');
var router = express.Router();
var query = require('../musicdl_logic/musicQueryAPI');
var ytdl = require('ytdl-core');
var fs = require('fs');
/* GET home page. */
var title6 = "";

router.get('/', function(request, response) {
  response.render('music.html', { title: 'Music Download' });
});

// router.get("/" + title6 + ".mp3", function(request, response) {
//   response.render('music.html', { title: 'Music Download' });
// });

router.post('/music_search',function(request, response){
	var query_request = request.body.music;	
	query(query_request, function(music_code,title){
		title6 = title;
		console.log("TITLE", title);
		ytdl("http://www.youtube.com/watch?v=" + music_code).pipe(fs.createWriteStream("public/output_music/" + query_request + ".mp3")).on("close", function() {
			response.render('result.html', { titles : title6, query_strings : query_request});
		});
		if(request.db){
			var db = request.db 
			var collection = db.collection('musicCollection').insert({"code":music_code},function(error,doc){
				if(error){
					console.log(error);
				}else{
					console.log("Successfully stored data");
				}
			});
		}
	});
	
});

module.exports = router;
