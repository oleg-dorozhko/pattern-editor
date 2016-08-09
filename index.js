var opbeat = require('opbeat').start()

var http = require('http');
var PNG = require('pngjs').PNG;
var fs = require('fs');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var stream = fs.createWriteStreamSync( "dummydummydummy.txt" );
stream.write("ok");
stream.end();



function getFromFSCurrentImageCanvasName()
{
	var arr = fs.readdirSync('canvas1');
	return arr[0];
}

function getCurrentImageCanvasName()
{
	return getFromFSCurrentImageCanvasName();
}

function getSeedListFromFS()
{
	var s = '';
	var img_tmpl = '';
	var arr = fs.readdirSync('sims');
	for(var i=0;i<arr.length;i++)
	{
		img_tmpl = '<img src="[img-path]" width="20" height="20" seed-clicked="true"> ';
		img_tmpl = img_tmpl.replace("[img-path]",'sims/'+arr[i]);
		s += img_tmpl;
	}
	return s;
}


function dummy(res)
{
	res.writeHead(200, {  'Content-Type': 'text/html' } );
		
		
		fs.readFile('pages/index.html', (err, data) => {
		
			if (err) throw err;
			
			//var strData = StringDecoder.write(data);
			var strData = data.toString();
			strData = strData.replace("[seed-list]",getSeedListFromFS());
			strData = strData.replace("[init-path]","canvas1"+"/"+getFromFSCurrentImageCanvasName());
			data = new Buffer(strData);
			//console.log();
			
			
			res.writeHead(HTTP_OK, contentType(".html"));
			res.end(data);
			
		});
}









app.get('/', function(request, response) {
	
	
	//dummy(response);
	
	
	
	
	
	
	
	
	
	
	
	
	
  //response.render('pages/index');
});


app.post('/test_call', function(request, response) {
  
  //response.end("test ok");
  request.pipe(response);
  
  
});

















































app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


