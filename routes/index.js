var express = require('express');
var router = express.Router();
var query = require('../musicdl_logic/musicQueryAPI');
var ytdl = require('ytdl-core');
var fs = require('fs');
/* GET home page. */
router.get('/', function(request, response) {
  response.render('music.html', { title: 'Music Download' });
});


router.post('/music_search',function(request, response){
	var query_request = request.body.music;	
	query(query_request, function(music_code,title){
		//response.setHeader("Content-Type", "text/html");
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write(music_code);
		//response.end();
		
		console.log("TITLE", title);
		ytdl("http://www.youtube.com/watch?v=" + music_code).pipe(fs.createWriteStream("output_music/" + query_request + ".mp3"));
	});
	// response.setHeader("Content-Type", "text/html");
	// response.writeHead(200, {"Content-Type": "text/plain"});
	// response.write(music_code);
	// response.end();

	// var db = request.db;
	// var collection = db.collection('musicCollection').insert({"code":music_code},function(error,doc){
	// 	if (error) {
	// 		console.log(error)
	// 	} else {
	// 		console.log("successfully stored data");
	// 	}
	// });	
});

module.exports = router;
