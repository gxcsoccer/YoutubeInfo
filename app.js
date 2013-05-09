var express = require('express'),
	http = require('http'),
	app = express();

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
	var options = {
		host: 'www.youtube.com',
		path: '/get_video_info?video_id=' + id,
		method: 'GET'
	};

	var request = http.request(options, function(resp) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		resp.setEncoding('utf8');
		resp.on('data', function(chunk) {
			console.log(chunk);
			res.write(chunk);
		});
		resp.on('end', function() {
			res.end();
		});
	});

	request.on('error', function(e) {
		console.log(e);
	});

	request.end();
});

app.listen(8080);