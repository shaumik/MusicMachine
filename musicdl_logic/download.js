var http = require('http');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

var url = "http://www.youtube.com/watch?v=MoZpjQr3XmU";
var video = ytdl(url);
console.log(video);