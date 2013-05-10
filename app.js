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
			return format.container === 'webm';
		}
	}).pipe(res);
});

app.get('/webm/:id', function(req, res) {
	var id = req.params.id,
		ip = "151.250.112.220";//req.connection.remoteAddress;

	console.log(ip);
	ytdl.getInfo(YOUTUBE_URL + id, {
		headers: {
			'x-forwarded-for': ip
		}
	}, function(err, info) {
		if (err) throw err;

		var formats = info.formats;
		formats = formats.filter(function(format) {
			return format.container === 'webm';
		});

		var format = formats[0];

		if (!format) {
			res.end();
			return;
		}

		res.end(url.format(url.parse(format.url, true)));
	});
});

app.listen(8080);