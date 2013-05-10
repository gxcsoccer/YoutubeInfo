var fs = require('fs');
var ytdl = require('ytdl');

ytdl('http://www.youtube.com/watch?v=ZKcacNt5jVY', {
	filter: function(format) {
		return format.container === 'webm';
	}
}).pipe(fs.createWriteStream('video.flv'));