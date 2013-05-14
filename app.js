var express = require('express'),
	http = require('http'),
	ytdl = require('ytdl'),
	url = require('url'),
	app = express();

var YOUTUBE_URL = 'http://www.youtube.com/watch?v=';

var allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
			res.send(200);
		} else {
			next();
		}
	};

app.use(allowCrossDomain);
app.configure('development', function() {
	app.use(express.logger());
});

app.get('/video/:id', function(req, res) {
	var id = req.params.id;
	ytdl(YOUTUBE_URL + id, {
		filter: function(format) {
			return format.container === 'mp4';
		}
	}).pipe(res);
});

app.get('/:videotype/:id', function(req, res) {
	var id = req.params.id,
		videotype = req.params.videotype;
	ytdl(YOUTUBE_URL + id, {
		filter: function(format) {
			return format.container === videotype;
		}
	}).pipe(res);
});

app.listen(8080);