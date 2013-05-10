// var fs = require('fs');
// var ytdl = require('ytdl');
// ytdl('http://www.youtube.com/watch?v=ZKcacNt5jVY', {
// 	filter: function(format) {
// 		return format.container === 'webm';
// 	}
// }).pipe(fs.createWriteStream('video.flv'));
var yt = require('./youtube'),
	url = require('url');

yt.getInfo('http://www.youtube.com/watch?v=ZKcacNt5jVY', function(err, info) {
	if (err) throw err;

	var formats = info.formats;
	formats = formats.filter(function(format) {
		return format.container === 'webm';
	});

	var format = formats[0];
	
	if (!format) {
		
		return;
	}

	console.log(url.format(url.parse(format.url, true)));
});