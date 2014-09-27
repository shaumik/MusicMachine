var express = require('express');
var router = express.Router();
var query = require('../musicdl_logic/musicQueryAPI');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('music.html', { title: 'Music Download' });
});


router.post('/music_search',function(request, respond){
	var query_request = request.body.music;	
	var music_code = query(query_request);
	var db = request.db;
	var collection = db.collection('musicCollection').insert({"code":music_code},function(error,doc){
		if(error){
			console.log(error)
		}else{
			console.log("successfully stored data");
		}
	});	
});

module.exports = router;
