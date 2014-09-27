var http = require('http');
var ytdl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');


var url = 'http://www.youtube.com/watch?v=AJVpL6L7Zeo';
router.get('/', function(req, res) {

  var url = 'https://www.youtube.com/watch?v=GgcHlZsOgQo';
  var video = ytdl(url)

  res.set({
      "Content-Type": "audio/mpeg"
  })

  new ffmpeg({source: video})
      .toFormat('mp3')
      .writeToStream(res, function(data, err) {
        if (err) console.log(err)
      })

});

