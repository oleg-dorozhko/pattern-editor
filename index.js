var opbeat = require('opbeat').start()

var express = require('express');
var app = express();  
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/test_call', function(request, response) {
  
  //response.end("test ok");
  request.pipe(response);
  
  
});

app.post('/load_div_first', function(request, response) {
  

	fs.readFile( __dirname + '/views/pages/index.html', 'utf8', function (err,data) {
	  if (err) {
		return console.log(err);
	  }
	  response.writeHead(200, {  'Content-Type': 'text/html' } );
	  response.end(data);
	});
  
  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


