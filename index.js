var opbeat = require('opbeat').start()

var PNG = require('pngjs').PNG;
var express = require('express');
var app = express();  
var fs = require('fs');
//var bodyParser = require('body-parser');
var Readable = require('stream').Readable;
var qs = require('querystring');

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/***
app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});
***/

//We can test this using POSTman and send information as application/x-www-form-urlencoded:
//https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

app.use(function(err, req, res, next) {
  // log the error, treat it like a 500 internal server error
  // maybe also log the request so you have more debug information
  //log.error(err, req);
 
  // during development you may want to print the errors to your console
  console.log(err.stack);
 
  // send back a 500 with a generic message
  res.status(500);
  res.send('error');
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/palette', function(request, response) {
  response.render('pages/palette');
});

app.get('/labirint', function(request, response) {
  response.render('pages/labirint');
});

app.get('/images/labirint.png', function(request, response) {
  //response.render('pages/labirint');
 fs.createReadStream('images/labirint.png').pipe( new PNG() ).on('parsed', function() {

	//inversing - for example
	/*****
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx+1] = 255 - this.data[idx+1];
            this.data[idx+2] = 255 - this.data[idx+2];

            // and reduce opacity
            this.data[idx+3] = this.data[idx+3] >> 1;
        }
    }
	*******/
	
		sendImage( this.pack(), response, "\nImage labirint.png loaded\n" );
    
	});
});



function getSeedListFromFS()
{
	var s = '';
	var img_tmpl = '';
	var arr = fs.readdirSync( __dirname + '/public/sims');
	for(var i=0;i<arr.length;i++)
	{
		img_tmpl = '<img src="[img-path]" width="20" height="20" seed-clicked="true"> ';
		img_tmpl = img_tmpl.replace("[img-path]", '/sims/'+arr[i]);
		s += img_tmpl;
	}
	return JSON.stringify(arr);
}



app.post('/load_div_first', function(request, response) {
  

	fs.readFile( __dirname + '/views/pages/index.html', 'utf8', function (err,data) {
	  
	  if (err) {  
	  
		console.log(err);
		response.writeHead(500, {  'Content-Type': 'text/html' } );
		response.end("/load_div_first: error: "+err);

	  }
	  else
	  {

		  var strData = data.toString();
		  strData = strData.replace("[seed-list]",getSeedListFromFS());
		  strData = strData.replace("[init-path]","/initial-image.png");
		  data = new Buffer(strData); 
		  
		  response.writeHead(200, {  'Content-Type': 'text/html' } );
		  response.end(data);
	  
	  }
	  
	});
  
  
});

function sendImage(result_png, res, msg)
{
	result_png.pack();
	res.writeHead( 200, {  'Content-Type': 'blob' } ); 
	result_png.pipe(res);
			
	result_png.on('end', function()	{
		console.log(msg);
	});
}

function multiply(req, res)
{
	
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		if(this.width * 2 > 1200 || this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("multi: error: too big size (need result width * 2 or height * 2 <= 1200)");
			return;
			
		}
		
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height*2,
				filterType: 4
		} );
		
		

			for (var y = 0; y < this.height; y++) {
				
				for (var x = 0; x < this.width; x++) {
					
					var idx = (this.width * y + x) << 2;
					
					var new_idx1 = newpng.width * (y) + (x) << 2;
					
					var new_idx2 = (newpng.width * (y) + (x)+this.width << 2);
					
					var new_idx3 = newpng.width * (y+this.height) + (x) << 2;
					
					var new_idx4 = newpng.width * (y+this.height) + (x)+this.width << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
					newpng.data[new_idx2+0] = this.data[idx];
					newpng.data[new_idx2+1] = this.data[idx+1];
					newpng.data[new_idx2+2] = this.data[idx+2];
					newpng.data[new_idx2+3] = this.data[idx+3];
					
					newpng.data[new_idx3+0] = this.data[idx];
					newpng.data[new_idx3+1] = this.data[idx+1];
					newpng.data[new_idx3+2] = this.data[idx+2];
					newpng.data[new_idx3+3] = this.data[idx+3];
					
					newpng.data[new_idx4+0] = this.data[idx];
					newpng.data[new_idx4+1] = this.data[idx+1];
					newpng.data[new_idx4+2] = this.data[idx+2];
					newpng.data[new_idx4+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage multiplied\n" );
			
			
		});
}


function __rotateff( oldpng, newpng )
{

	/*****
	
	var r = context.getImageData(0,0,1,1).data[0];
	var g = context.getImageData(0,0,1,1).data[1];
	var b = context.getImageData(0,0,1,1).data[2];
	contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
	contextRes.fillRect(0,0,2,2);
	
	*****/
	
	
	var arr_points = [];
	
	var n=0;
	
	for(n=2;n<oldpng.height+2;n++)
	{
		//console.log("---- "+n+" ----");
		var y=n-2;
		for(var x=0;x<n-1;x++)
		{
			//console.log("[x,y]=["+x+","+y+"]");
			
			var idx = (oldpng.width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
				
			/*****	
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
			
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			
			//console.log([x,y]);
			*****/
			
			arr_points.push([x,y]);
			
			
			y--;
		}
		
		//if(n>=4) break;
		
	}
	
	//return;
	
	
	
	
	
	
	var half_value = arr_points.length;
	

	var w = oldpng.width;
	var h = oldpng.height;
	
	var lim2 = 1;
	var lim4 = 1;
	
	while(true)
	{
	
	y=h-lim4;
	x=lim2;
	while(true)
	{
	
	
		
			/*****
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			*****/
			
			var idx = (oldpng.width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
				
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
	
	
			
			
			arr_points.push([x,y]);
		
		
		x++;
		y--;
		
		if(x>=oldpng.width) break;
	}
	
	lim2++;
			
	if(y>=oldpng.height)	break;	

		if(lim2 > oldpng.width)
		{
			break;
		}
	
	}	
		
	
	console.log("Data of rotated image inputed");
	
	/******************************************************************************/
	/******************************************************************************/
	/******************************************************************************/
	
	
	
	
	
	
	
	
	
	var w = newpng.width;
	
	
	//**  this only one duxel outputting
	var n=0;
	
	
	var x = arr_points[0][0];
	var y = arr_points[0][1];

	var idx = (oldpng.width * x + y) << 2;
		
    var x1 = w/2-1;			
	var y1=0;
	
	var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];

	
	n++;
	
	//**** now we take two duxel
	
	y1++;
	x1--;
	
	//
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng.width * x + y) << 2;
		
    var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];
	
	
	n++;
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng.width * x + y) << 2;
	
	var new_idx1 = newpng.width * (y1) + (x1+2) << 2;
	
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];

	
		
	//contextRes.fillStyle = "red";//"rgba("+r+","+g+","+b+",255)";
	//contextRes.fillRect(x1+6,y1,2,1);
	

	
	
	
	y1++;
	x1--;
	
	for(j=0;j<3;j++)
	{
		
		
		n++;
	
		var x = arr_points[n][0];
		var y = arr_points[n][1];
		
		var idx = (oldpng.width * x + y) << 2;
		
		var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
		
		newpng.data[new_idx1+0] = oldpng.data[idx+0];
		newpng.data[new_idx1+1] = oldpng.data[idx+1];
		newpng.data[new_idx1+2] = oldpng.data[idx+2];
		newpng.data[new_idx1+3] = oldpng.data[idx+3];
		
		newpng.data[new_idx1+4] = oldpng.data[idx+0];
		newpng.data[new_idx1+5] = oldpng.data[idx+1];
		newpng.data[new_idx1+6] = oldpng.data[idx+2];
		newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
			
		
		
	}
	

	
	var counter=4;
	var exit_cycle=false;
	
	while(true)
	{
		
		y1++;
		x1--;
		
		for(j=0;j<counter;j++)
		{
			
			
			
			
			n++;
			
		//	console.log(n);
		//	console.log(arr_points.length);
		//	if(n >= arr_points.length / 2 ) { exit_cycle=true; break; }
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			var idx = (oldpng.width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
			
			newpng.data[new_idx1+0] = oldpng.data[idx+0];
			newpng.data[new_idx1+1] = oldpng.data[idx+1];
			newpng.data[new_idx1+2] = oldpng.data[idx+2];
			newpng.data[new_idx1+3] = oldpng.data[idx+3];
			
			newpng.data[new_idx1+4] = oldpng.data[idx+0];
			newpng.data[new_idx1+5] = oldpng.data[idx+1];
			newpng.data[new_idx1+6] = oldpng.data[idx+2];
			newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
		

	
				
		
			
		}
		
		counter++;
		//console.log("counter="+counter);
		if(counter>=newpng.height/2+1) break;
		
	/******
	
		if(exit_cycle==true) break;
		
		console.log("n="+n);
		
		
		
		//if(n >= arr_points.length/2 ) break;
		
	******/	
		
	 
	}
	
	
				
	
	//console.log("n="+n);
	
	//console.log("counter="+counter);
	
	//console.log("x1="+x1);
	//console.log("y1="+y1);
	
	//console.log(arr_points[n]);
	
	

	
	
	
		
	
	//n--;
	
	//var counter=4; counter==half_value
	var exit_cycle=false;
	var lim2=1;
	//y1--;
	var nn=1;
	var lim4=newpng.width-2;
	while(true)
	{
		
		y1++;
		
		
		for(x1=lim2;x1<lim4;x1+=2)
		{
			
			
			
			n++;
			
			
			//console.log(n);
			//console.log(arr_points.length);
			
			 
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			
			var idx = (oldpng.width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
			newpng.data[new_idx1+0] = oldpng.data[idx+0];
			newpng.data[new_idx1+1] = oldpng.data[idx+1];
			newpng.data[new_idx1+2] = oldpng.data[idx+2];
			newpng.data[new_idx1+3] = oldpng.data[idx+3];
			
			newpng.data[new_idx1+4] = oldpng.data[idx+0];
			newpng.data[new_idx1+5] = oldpng.data[idx+1];
			newpng.data[new_idx1+6] = oldpng.data[idx+2];
			newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
			
			
			
			
			
			/****
			
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
				
			contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x1,y1,2,1);
			
			*****/
			
			//	 { exit_cycle=true; break; }
			
			
			
			
			
			
			
	
	
		
			
		}
		
	
	
	
		lim2++;
		lim4--;
		
		if(exit_cycle==true) break;
		
		//counter--;
		
		//x1 = nn++;
		
		//if(counter>=canvasRes.height/2) break;
		
		if(lim2>oldpng.height) { exit_cycle=true; break; }
		
		//if(nn>canvas.height-1) { exit_cycle=true; break; }
		
		if(lim4 < 0) break;

		//if(n>=arr_points.length-1) break;
		
	}
	
		
	return newpng;
	
	/********
 
	
	
	
		
	canvas.width = canvasRes.width;
	canvas.height = canvasRes.height;
	canvas.getContext("2d").putImageData(canvasRes.getContext("2d").getImageData(0,0,canvasRes.width,canvasRes.height),0,0);
	
	
	
	*****/
	
	
	
	
}

function rotateff(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		if(this.width * 2 > 1200 || this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("rotateff: error: too big size (need result width * 2 or height * 2 <= 1200)");
			return;
			
		}
		
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height*2,
				filterType: 4
		} );
		
		
		
		sendImage( __rotateff( this, newpng ), res, "\nImage rotated 45 degree\n" );
		
		
		
		
		
		/*********

			for (var y = 0; y < this.height; y++) {
				
				for (var x = 0; x < this.width; x++) {
					
					var idx = (this.width * y + x) << 2;
					
					var new_idx1 = newpng.width * (y) + (x) << 2;
					
					var new_idx2 = (newpng.width * (y) + (x)+this.width << 2);
					
					var new_idx3 = newpng.width * (y+this.height) + (x) << 2;
					
					var new_idx4 = newpng.width * (y+this.height) + (x)+this.width << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
					newpng.data[new_idx2+0] = this.data[idx];
					newpng.data[new_idx2+1] = this.data[idx+1];
					newpng.data[new_idx2+2] = this.data[idx+2];
					newpng.data[new_idx2+3] = this.data[idx+3];
					
					newpng.data[new_idx3+0] = this.data[idx];
					newpng.data[new_idx3+1] = this.data[idx+1];
					newpng.data[new_idx3+2] = this.data[idx+2];
					newpng.data[new_idx3+3] = this.data[idx+3];
					
					newpng.data[new_idx4+0] = this.data[idx];
					newpng.data[new_idx4+1] = this.data[idx+1];
					newpng.data[new_idx4+2] = this.data[idx+2];
					newpng.data[new_idx4+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage multiplied\n" );
			
			
			*********/
			
			
		});
}


function borderplus(req, res)
{
	
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		if(this.width + 2 > 1200 || this.height + 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			console.log("borderplus: error: too big size (need result width * height <= 1200)");
			res.end("borderplus: error: too big size (need result width * height <= 1200)");
			//req.connection.destroy();
			return;
			
		}
		
			var newpng = new PNG ( {
				
					width: this.width+2,
					height: this.height+2,
					filterType: 4
			} );
		
			for (var y = 0; y < newpng.height; y++) {
				
				for (var x = 0; x < newpng.width; x++) {
					
					
					
					var new_idx1 = newpng.width * (y) + (x) << 2;
					
					newpng.data[new_idx1+0] = 255;
					newpng.data[new_idx1+1] = 255;
					newpng.data[new_idx1+2] = 255;
					newpng.data[new_idx1+3] = 255;
					
				}
				
			}
		

			for (var y = 0; y < this.height; y++) {
				
				for (var x = 0; x < this.width; x++) {
					
					var idx = this.width * y + x << 2;
					
					var new_idx1 = newpng.width * (y+1) + (x+1) << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage border minused\n" );
			
			
		});
}

function borderminus(req, res)
{
	
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		
			var newpng = new PNG ( {
				
					width: this.width-2,
					height: this.height-2,
					filterType: 4
			} );
		
		

			for (var y = 1; y < this.height-1; y++) {
				
				for (var x = 1; x < this.width-1; x++) {
					
					var idx = this.width * y + x << 2;
					
					var new_idx1 = newpng.width * (y-1) + (x-1) << 2;
					
					newpng.data[new_idx1+0] = this.data[idx];
					newpng.data[new_idx1+1] = this.data[idx+1];
					newpng.data[new_idx1+2] = this.data[idx+2];
					newpng.data[new_idx1+3] = this.data[idx+3];
					
				}
				
			}
			
			sendImage(newpng, res, "\nImage border minused\n" );
			
			
		});
}

function minus( req, res )
{

	req.pipe( new PNG ( {filterType: 4} ) ).on('parsed', function() {
		
		//here we create new png (same as result bufferedImage (in java))
		var newpng = new PNG ( {
			
				width: this.width/2|0,
				height: this.height/2|0,
				filterType: 4
		} );
		

		for (var y = 0; y < this.height; y+=2) {
			for (var x = 0; x < this.width; x+=2) {
				
				var idx = (this.width * y + x) << 2;
				
				var new_idx = newpng.width * (y/2) + (x/2) << 2;
				//var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
				
				newpng.data[new_idx] = this.data[idx];
				newpng.data[new_idx+1] = this.data[idx+1];
				newpng.data[new_idx+2] = this.data[idx+2];
				newpng.data[new_idx+3] = this.data[idx+3];

				
				
			}
		}
		
		sendImage(newpng, res, "\nImage minused\n" );
	
			
	});
}


function plus( req, res)
{


		req.pipe( new PNG({filterType: 4}) ).on('parsed', function() {
			
		if(this.width * 2 > 1200 || this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("plus: error: too big size (need result width * 2 <= 1200 or height * 2 <= 1200 )");
			return;
			
		}
			
			//here we create new png (same as result bufferedImage (in java))
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height*2,
				filterType: 4
		} );
		

			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					
					var idx = (this.width * y + x) << 2;
					
					var new_idx = newpng.width * (y*2) + (x*2) << 2;
					var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
					
					newpng.data[new_idx] = this.data[idx];
					newpng.data[new_idx+1] = this.data[idx+1];
					newpng.data[new_idx+2] = this.data[idx+2];
					newpng.data[new_idx+3] = this.data[idx+3];
					
					newpng.data[new_idx+4] = this.data[idx];
					newpng.data[new_idx+5] = this.data[idx+1];
					newpng.data[new_idx+6] = this.data[idx+2];
					newpng.data[new_idx+7] = this.data[idx+3];
					
					newpng.data[new_idx2] = this.data[idx];
					newpng.data[new_idx2+1] = this.data[idx+1];
					newpng.data[new_idx2+2] = this.data[idx+2];
					newpng.data[new_idx2+3] = this.data[idx+3];
					
					newpng.data[new_idx2+4] = this.data[idx];
					newpng.data[new_idx2+5] = this.data[idx+1];
					newpng.data[new_idx2+6] = this.data[idx+2];
					newpng.data[new_idx2+7] = this.data[idx+3];
					
					
				}
			}
	
			

			newpng.pack(); //pack result, write head to response, pipe result to response, when 'end' bla-bla-bla to log 
			res.writeHead( 200, {  'Content-Type': 'blob' } ); 
			newpng.pipe(res);
			newpng.on('end', function() {
				
				console.log("Image plused");
				
			});
			
	
			
			//dummy(res);
			
		});
}








function blackwhite( req, res )
{
	
		
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
			var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );

			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					var idx = (this.width * y + x) << 2;

					
					var maxind = -1;
					var maxred = 0;
					
					var arr = [];
					arr[0] = this.data[idx];
					arr[1] = this.data[idx+1];
					arr[2] = this.data[idx+2];
					
					for(var n=0;n<3;n++)
					{
						if(arr[n]>=maxred)
						{
							maxind=n;
							maxred = arr[n];
						}
					}
					
					result_png.data[idx] = arr[maxind];
					result_png.data[idx+1] = arr[maxind];
					result_png.data[idx+2] = arr[maxind];
					result_png.data[idx+3] = this.data[idx+3];
					
					
				}
			}
			
			
			result_png.pack();
			
			res.writeHead( 200, {  'Content-Type': 'blob' } );
			
			result_png.pipe(res);
			
			result_png.on('end', function(){
				
				console.log("Image blackwhited");
				
			});
			
	});
		
}












function inverse( req, res )
{
	
		
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
			var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );

			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					var idx = (this.width * y + x) << 2;

					// invert color
					result_png.data[idx] = 255 - this.data[idx];
					result_png.data[idx+1] = 255 - this.data[idx+1];
					result_png.data[idx+2] = 255 - this.data[idx+2];

					// and reduce opacity
					//this.data[idx+3] = this.data[idx+3] >> 1;
					
					result_png.data[idx+3] = this.data[idx+3];
				}
			}
			
			
			result_png.pack();
			
			res.writeHead( 200, {  'Content-Type': 'blob' } );
			
			result_png.pipe(res);
			
			result_png.on('end', function(){
				
				console.log("Image inverted");
				
			});
			
	});
		
}

function get_coordinates(w,h)
{

	
	if(w != h) {  console.log('error: width of image != height of image'); return null; }
	
	
	if(w == 11) return [3,3,11,11];
	if(w == 10) return [2,2,10,10];
	if(w == 9) return [2,2,5,5];
	if(w == 8) return [2,2,4,4];
	if(w==7) return [2,2,3,3];
	if(w==6) return [1,1,4,4];
	if(w==5) return [1,1,3,3];
	if(w==4) return [1,1,2,2];
	if(w==3) return [1,1,1,1];
	
	
	if(w % 2 == 0) //when even
	{
		var tmp = w/2;
		
		if(tmp % 2 == 0)  return [ tmp/2, tmp/2, tmp, tmp];
		
		
		var t1 = Math.abs(w-(tmp+1)*2); 
		var t2 = Math.abs(w-(tmp-1)*2); 
		
		if(t1==t2) return [ tmp/2|0, tmp/2|0,tmp+1,tmp+1];
		
		console.log("\n\nmedian().get_coordinates(...).error: Not implemented for: "+w);
		console.log("width of full image="+w);
		console.log("t1="+t1);
		console.log("t2="+t2);
		console.log("\n\n");
		
		return [0,0,w,h];
		
		
	}
	else //when odd
	{
		
		var tmpOdd = w/2|0;
		if(tmpOdd % 2 == 1)  return [ (tmpOdd/2|0)+1, (tmpOdd/2|0)+1, tmpOdd, tmpOdd];
		
		return [ tmpOdd/2, tmpOdd/2, tmpOdd+1,tmpOdd+1];
		
		/***********
		var t1 = Math.mod(w-(tmpOdd+1)*2); //mod(17-(8+1)*2) = 1
		var t2 = Math.mod(w-(tmpOdd-1)*2); //mod(17-(8-1)*2) = 3
		
		//0 1 2 3 4 5 6 7 (8) 9 10 11 12 13 14 15 16
		if(t1=<t2)
		
		return [ tmpOdd/2|0, tmpOdd/2|0,tmpOdd-1,tmpOdd-1];
		*********/
		
	}
}	

function median( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		var arr = get_coordinates(this.width, this.height);
		if(arr == null) return; 
		
		var newpng = new PNG ( {
			
				width: arr[2],
				height: arr[3],
				filterType: 4
		} );
		
		var limy = arr[1]+arr[3];
		var limx = arr[0]+arr[2];
		var n=0;
		var m=0;

			for (var y = arr[1]; y < limy; y++) {
				n=0;
				for (var x = arr[0]; x < limx; x++) {
					var idx = (this.width * y + x) << 2;
					var idx2 = (newpng.width * m + n) << 2;
					
					// invert color
					newpng.data[idx2] = this.data[idx];
					newpng.data[idx2+1] = this.data[idx+1];
					newpng.data[idx2+2] = this.data[idx+2];
					
					newpng.data[idx2+3] = this.data[idx+3];
					n++;
				}
				m++;
			}
			
			sendImage(newpng,res,"\nImage was medianed\n");
						
		});
}



function half( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		//var arr = get_coordinates(this.width, this.height);
		//if(arr == null) return; 
		
		var n=0;
		if(( this.width%2 == 0  ) && (this.height%2 == 0)) { n = this.width/2; m = this.height/2; }
		else 
		{
			var err = "width %2 != 0 or height %2 != 0 ";
			console.log(err);
			res.writeHead(500, {  'Content-Type': 'text/html' } );
			res.end("/half: error: "+err);
			return;
			
		}	


		
		
		var newpng = new PNG ( {
			
				width: n,
				height: m,
				filterType: 4
		} );
		
		

			for (var y = 0; y < m; y++) {
				
				for (var x = 0; x < n; x++) {
					
					var idx = (this.width * y + x) << 2;
					var idx2 = (newpng.width * y + x) << 2;
					
					newpng.data[idx2] = this.data[idx];
					newpng.data[idx2+1] = this.data[idx+1];
					newpng.data[idx2+2] = this.data[idx+2];
					newpng.data[idx2+3] = this.data[idx+3];
					
				}
			}
			
			sendImage(newpng,res,"\nImage was halfed\n");
						
		});
}



function rotate( req, res )
{
	
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		
		var newpng = new PNG ( {
			
				width: this.height,
				height: this.width,
				filterType: 4
		} );
		
				
		for (var y = 0; y < this.height; y++) {
		
		
			for (var x = 0; x < this.width; x++) {
			
			
				var idx = (this.width * y + x) << 2;
				
				var n = newpng.width - y;
				var m = x;
				var new_idx1 = (newpng.width * m + n) << 2;
						
				
				newpng.data[new_idx1+0] = this.data[idx+0];
				newpng.data[new_idx1+1] = this.data[idx+1];
				newpng.data[new_idx1+2] = this.data[idx+2];
				newpng.data[new_idx1+3] = this.data[idx+3];	
			}
		}
		
		sendImage(newpng, res, '\nImage rotated\n');	
		
	});
		
		
		
}





function vortex( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		if(this.width * 2 > 3000 || this.height * 2 > 3000 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("vortex: error: too big size (need result width * 2 or height * 2 <= 1200)");
			return;
			
		}
		
			
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height,
				filterType: 4
		} );
		
		

			for (var y = 0; y < newpng.height; y++) {
				
				n=0;
				for (var x = 0; x < newpng.width; x++) {
					
					var idx = 0;
					var new_idx1 = newpng.width * y + x << 2;
					if(x < this.width)
					{
					
						idx = (this.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						n++;
					}
					else
					{
						idx = (this.width * y + (n-1)) << 2;
						
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						
						n--;

					}
					
					
					
				}
				
			}
			
		
		
		
		
		
		
		var newpng2 = new PNG ( {
			
				width: newpng.width,
				height: newpng.height*2,
				filterType: 4
		} );
		
		var m=0;
		
		for (var x = 0; x < newpng2.width; x++) {
			
			m=0;
			
			for (var y = 0; y < newpng2.height; y++) {
				
				
				
					
					var idx = 0;
					
					var new_idx1 = newpng2.width * y + x << 2;
					
					if(y < newpng.height)
					{
					
						idx = (newpng.width * y + x) << 2;
						
						newpng2.data[new_idx1+0] = newpng.data[idx+0];
						newpng2.data[new_idx1+1] = newpng.data[idx+1];
						newpng2.data[new_idx1+2] = newpng.data[idx+2];
						newpng2.data[new_idx1+3] = newpng.data[idx+3];
						m++;
					}
					else
					{
						idx = (newpng.width * (m-1) + x) << 2;
						
						newpng2.data[new_idx1+0] = newpng.data[idx+0];
						newpng2.data[new_idx1+1] = newpng.data[idx+1];
						newpng2.data[new_idx1+2] = newpng.data[idx+2];
						newpng2.data[new_idx1+3] = newpng.data[idx+3];
						
						m--;

					}
					
					
					
				}
				
			}
			
			//sendImage(newpng,res,'\nImage mirror downed\n');
			
			
			
			
			
			
		
			sendImage(newpng2,res,'\nImage vortexed\n');
			
			
			
			
			
			
	});
}



















function mdown( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		if( this.height * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("mdown: error: too big size (need result height * 2 <= 1200)");
			return;
			
		}
		
		var newpng = new PNG ( {
			
				width: this.width,
				height: this.height*2,
				filterType: 4
		} );
		
		var m=0;
		
		for (var x = 0; x < newpng.width; x++) {
			
			m=0;
			
			for (var y = 0; y < newpng.height; y++) {
				
				
				
					
					var idx = 0;
					
					var new_idx1 = newpng.width * y + x << 2;
					
					if(y < this.height)
					{
					
						idx = (this.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						m++;
					}
					else
					{
						idx = (this.width * (m-1) + x) << 2;
						
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						
						m--;

					}
					
					
					
				}
				
			}
			
			sendImage(newpng,res,'\nImage mirror downed\n');
			
			
	});
}




function mright( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		if( this.width * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("mright: error: too big size (need result width * 2 <= 1200)");
			return;
			
		}
			
		
		var newpng = new PNG ( {
			
				width: this.width*2,
				height: this.height,
				filterType: 4
		} );
		
		

			for (var y = 0; y < newpng.height; y++) {
				
				n=0;
				for (var x = 0; x < newpng.width; x++) {
					
					var idx 
					var new_idx1 = newpng.width * y + x << 2;
					if(x < this.width)
					{
					
						idx = (this.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						n++;
					}
					else
					{
						idx = (this.width * y + (n-1)) << 2;
						
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						
						n--;

					}
					
					
					
				}
				
			}
			
			sendImage(newpng, res, '\nImage mirror righted\n');		
			
	});
}


	function getColDec( cccol, cccol1 )
	{
		var cccol2=0;
		if(cccol+cccol1>255) cccol2=    ((cccol+cccol1)-255)+10;
		else cccol2=cccol+cccol1;
		return cccol2;
	}
	

	function getRandomInt(min, max) 
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	
function random( req, res )
{

	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		var newpng = new PNG ( {
			
				width: this.width,
				height: this.height,
				filterType: 4
		} );
		
		var p = [];
		p[0] = 	getRandomInt(0, 255);
		p[1] = 	getRandomInt(0, 255);
		p[2] = 	getRandomInt(0, 255);


			for (var y = 0; y < this.height; y++) {
				for (var x = 0; x < this.width; x++) {
					var idx = (this.width * y + x) << 2;

					
					// invert color
					newpng.data[idx] = getColDec(p[0],this.data[idx]);
					newpng.data[idx+1] = getColDec(p[1],this.data[idx+1]);
					newpng.data[idx+2] = getColDec(p[2],this.data[idx+2]);
					
					newpng.data[idx+3] = this.data[idx+3];
				}
			}
			
			sendImage(newpng,res,'\nImage was randomized\n');
			
	});
}




function axes( req, res )
{

	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		

		
		var newpng = new PNG ( {
			
				width: this.width-1,
				height: this.height-1,
				filterType: 4
		} );
		
		var dx = this.width/2|0; 
		var dy = this.height/2|0;
		
		//7/2 = 3 //012[3]456
		//8/2 = 4 //012[3][4]567
		
			for (var y = 0; y < this.height; y++) {
				
				if(y == dy) continue;
				
				for (var x = 0; x < this.width; x++) {
					
					if(x == dx) continue;
					
					var idx = (this.width * y + x) << 2;
					
					var new_idx1 = 0;
					
					if(x < dx && y < dy)
					{			
						new_idx1 = newpng.width * y + x << 2;
					}	
					else if(x > dx && y < dy)
					{
						new_idx1 = newpng.width * y + (x-1) << 2;
					}
					else if(x > dx && y > dy)
					{
						new_idx1 = newpng.width * (y-1) + (x-1) << 2;
					}
					else if(x < dx && y > dy)
					{
						new_idx1 = newpng.width * (y-1) + x << 2;
					}
					
						newpng.data[new_idx1+0] = this.data[idx+0];
						newpng.data[new_idx1+1] = this.data[idx+1];
						newpng.data[new_idx1+2] = this.data[idx+2];
						newpng.data[new_idx1+3] = this.data[idx+3];
						
					
					
					
				}
				
			}
			
		
			
			sendImage(newpng,res,'\nImage was axed\n');
			
	});
}













	var crop_settings = null;
	
	function newcroplt(req, res)
	{
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
			var xw = crop_settings.x;
			var yh = crop_settings.y;
			var w = crop_settings.w;
		    var h = crop_settings.h;
			
			var newpng = new PNG ( {
													
				width: w-xw,
				height: h-yh,
				filterType: 4
				
			} );

			
			var m=0;
			for (var y = 0; y < this.height; y++) {
				
				var n=0;
				for (var x = 0; x < this.width; x++) {
					
					/***
					console.log("x="+x);
					console.log("y="+y);
					console.log("n="+n);
					console.log("m="+m);
					***/
					if( x>=xw  && y>=yh )
					{
						var idx = (this.width * y + x) << 2;
						
						var newidx = (newpng.width * m + n) << 2;

						newpng.data[newidx+0] = this.data[idx+0];
						newpng.data[newidx+1] = this.data[idx+1];
						newpng.data[newidx+2] = this.data[idx+2];
						newpng.data[newidx+3] = this.data[idx+3];
						
						n++;
					}
				}
				
				if(y>=yh) m++;
			}


			sendImage(newpng,res,'\nImage was LT croped \n');

		});
											
	}
	
	function newcroprb(req, res)
	{
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
			var xw = crop_settings.x;
			var yh = crop_settings.y;
			
			var newpng = new PNG ( {
													
				width: xw+1,
				height: yh+1,
				filterType: 4
				
			} );

			for (var y = 0; y < newpng.height; y++) {
				
				for (var x = 0; x < newpng.width; x++) {
					
					var idx = (this.width * y + x) << 2;
					var newidx = (newpng.width * y + x) << 2;

					newpng.data[newidx+0] = this.data[idx+0];
					newpng.data[newidx+1] = this.data[idx+1];
					newpng.data[newidx+2] = this.data[idx+2];
					newpng.data[newidx+3] = this.data[idx+3];
				}
			}


			sendImage(newpng,res,'\nImage was RB croped \n');

		});
											
	}
	
	
	
	function crop( req, res )
	{
		console.log('\nIn crop(...)\n');
		
		if(crop_settings == null)
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("crop(): error: call /precrop before");
			req.connection.destroy();
			return;

		}
				
		
		
		var flag = crop_settings.flag;
		
		
		console.log("x="+crop_settings.x);
		console.log("y="+crop_settings.y);
		console.log("w="+crop_settings.w);
		console.log("h="+crop_settings.h);
		console.log("flag="+flag);
		
		
		if(flag==1)
		{
			
		
			newcroplt(req,res);
			
			
		}
		
		else if(flag==2)
		{
			
			
			newcroprb(req,res);
		}
		
		
		
		
		
	}
	

function precrop( req, res)
{
	
									
		console.log("\nentering precrop");
		
		
		var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 1e6*50)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("precrop(): error: data too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
			var post = qs.parse(body);
			
			crop_settings = {};
			crop_settings.x =  +post['x'];
			crop_settings.y =  +post['y'];
			crop_settings.w =  +post['w'];
			crop_settings.h =  +post['h'];
			crop_settings.flag =  +post['flag'];
			
			res.writeHead( 200, { 'Content-Type':'text/plain' } );
			res.end("ok");
			
			
		});
		
			
					
							
					
}

var combo_settings = null;

function prepare_combo(req, res)
{
	console.log('\nIn prepare_combo(...)\n');
	
	var second_image = new PNG({filterType: 4});
	
	req.pipe(second_image).on( 'parsed', function()  {
				
		
		combo_settings = {};
		combo_settings.second_image = this;
		
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end("ok");
					
	});				
					
}

function error( req, res, msg )
{
	res.writeHead( 500, { 'Content-Type':'text/plain' } );
	res.end( msg );
	//req.connection.destroy();
	return;	
}

function slozhenie_cvetov(a,b)
{
	var c = 0;
	
	if((a+b) > 255) c = (a+b) - 255;
	else c = (a+b);
	
	c /= 2;
	
	return c;
}	

function combo( req, res )
{
	
	console.log('\nIn combo(...)\n');
		
	if(combo_settings == null)
	{
		
		res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("combo: error: call /prepare_combo before");
		req.connection.destroy();
		return;

	}
	
	var old_png = combo_settings.second_image; 
	
	var big_image = new PNG({filterType: 4});
	
	req.pipe(big_image).on('parsed', function() {
		
		
				
					
					
					
			if(old_png.width != old_png.height) 
			{
				error( req, res, "combo: error: old_png.width != old_png.height");
				return;
				
			}
			
			if(this.width != this.height) {
				error( req, res, "combo: error: this.width != this.height");
				
				return;  
			}
				
			if((old_png.width % 2 == 0) && (this.width % 2 ==  0))
			{
				//even
				if(old_png.width > this.width)
				{
					
					
					
					var result_png = new PNG ( {
						
							width: old_png.width,
							height: old_png.height,
							filterType: 4
					} );
					

					var t4 = (old_png.width-this.width)/2;
					var k4 = (old_png.height-this.height)/2;
					
					
					
					for(var j=0;j<old_png.height;j++)
					{
						for(var i=0;i<old_png.width;i++)
						{
							if( (i>=t4) && (i<(t4+this.width)) && (j>=k4) && (j<(k4+this.height))	)
							{
								
								
								
								var idx = (old_png.width * j + i) << 2;
								
								var n=i-t4;
								var m=j-k4;
								
								var new_idx1 = this.width * m + n << 2;
						
								result_png.data[idx+0] = slozhenie_cvetov( this.data[new_idx1+0], old_png.data[idx+0] );
								result_png.data[idx+1] = slozhenie_cvetov( this.data[new_idx1+1], old_png.data[idx+1] );
								result_png.data[idx+2] = slozhenie_cvetov( this.data[new_idx1+2], old_png.data[idx+2] );
								result_png.data[idx+3] = 255;
								
								
								
							}
							else
							{
								
								
								var idx = (old_png.width * j + i) << 2;
								
								result_png.data[idx+0] = old_png.data[idx+0];
								result_png.data[idx+1] = old_png.data[idx+1];
								result_png.data[idx+2] = old_png.data[idx+2];
								result_png.data[idx+3] = 255;
								
							}
						}
					}
					
					
					
					
					

				}
				else
				{
					
					var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );
					
					
					
					
					
					var t4 = (this.width-old_png.width)/2;
					var k4 = (this.height-old_png.height)/2;
					
					
					
					for(var j=0;j<this.height;j++)
					{
						for(var i=0;i<this.width;i++)
						{
							if( (i>=t4) && (i<(t4+old_png.width)) && (j>=k4) && (j<(k4+old_png.height))	)
							{
								
								
								
								var idx = (this.width * j + i) << 2;
								
								var n=i-t4;
								var m=j-k4;
								
								var new_idx1 = old_png.width * m + n << 2;
						
								result_png.data[idx+0] = slozhenie_cvetov( this.data[idx+0], old_png.data[new_idx1+0] );
								result_png.data[idx+1] = slozhenie_cvetov( this.data[idx+1], old_png.data[new_idx1+1] );
								result_png.data[idx+2] = slozhenie_cvetov( this.data[idx+2], old_png.data[new_idx1+2] );
								result_png.data[idx+3] = 255;
								
								
								
							}
							else
							{
								
								
								var idx = (this.width * j + i) << 2;
								
								result_png.data[idx+0] = this.data[idx+0];
								result_png.data[idx+1] = this.data[idx+1];
								result_png.data[idx+2] = this.data[idx+2];
								result_png.data[idx+3] = 255;
								
							}
						}
					}
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}
				
						
				
				
				sendImage(result_png,res,'\nImages combined\n');
				
				
				
			}
			else if ((old_png.width % 2 == 1) && (this.width % 2 ==  1))
			{
				//odd
				if(old_png.width > this.width)
				{
					
					
					var result_png = new PNG ( {
						
							width: old_png.width,
							height: old_png.height,
							filterType: 4
					} );
					
					var middle_of_bigger_w = old_png.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_w = this.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
					
					var begin_w = middle_of_bigger_w - middle_of_smaller_w;
					var end_w = begin_w + this.width; //and (not include) end
					
					var middle_of_bigger_h = old_png.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_h = this.height / 2 | 0; 
					
					var begin_h = middle_of_bigger_h - middle_of_smaller_h;
					var end_h = begin_h + this.height; 	
					
					
					for(var j=0;j<old_png.height;j++)
					{
						for(var i=0;i<old_png.width;i++)
						{
							var idx = (old_png.width * j + i) << 2;	
							
							if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
							{
							
								var n =	i - begin_w;
								var m = j - begin_h;
								
								var idx2 = this.width * m + n << 2;
								
								result_png.data[idx+0] = slozhenie_cvetov( this.data[idx2+0], old_png.data[idx+0] );
								result_png.data[idx+1] = slozhenie_cvetov( this.data[idx2+1], old_png.data[idx+1] );
								result_png.data[idx+2] = slozhenie_cvetov( this.data[idx2+2], old_png.data[idx+2] );
								result_png.data[idx+3] = 255;
								
								
							}
							else
							{
							
								result_png.data[idx+0] = old_png.data[idx+0];
								result_png.data[idx+1] = old_png.data[idx+1];
								result_png.data[idx+2] = old_png.data[idx+2];
								result_png.data[idx+3] = 255;
							}
						}
					}
					
					
					
					
				}
				else
				{
					
					var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );
					
					var middle_of_bigger_w = this.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_w = old_png.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
					
					var middle_of_bigger_h = this.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_h = old_png.height / 2 | 0; 
					
					var begin_w = middle_of_bigger_w - middle_of_smaller_w;
					var end_w = begin_w + old_png.width; //and (not include) end
					
					var begin_h = middle_of_bigger_h - middle_of_smaller_h;
					var end_h = begin_h + old_png.height; 	
				
					for(var j=0;j<this.height;j++)
					{
						for(var i=0;i<this.width;i++)
						{
							var idx = (this.width * j + i) << 2;	
							
							if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
							{
								
								var n =	i - begin_w;
								var m = j - begin_h;
								
								var idx2 = old_png.width * m + n << 2;
								
								result_png.data[idx+0] = slozhenie_cvetov( old_png.data[idx2+0], this.data[idx+0] );
								result_png.data[idx+1] = slozhenie_cvetov( old_png.data[idx2+1], this.data[idx+1] );
								result_png.data[idx+2] = slozhenie_cvetov( old_png.data[idx2+2], this.data[idx+2] );
								result_png.data[idx+3] = 255;
								
								
							}
							else
							{
								
								
								result_png.data[idx+0] = old_png.data[idx+0];
								result_png.data[idx+1] = old_png.data[idx+1];
								result_png.data[idx+2] = old_png.data[idx+2];
								result_png.data[idx+3] = 255;
							}
						}
					}
				}
				
				
				
				
				
				sendImage(result_png,res,'\nImages combined\n');
				
				
				
				
				
				
			}
			else  
			{
				
				error( req, res, "combo: error: odd first image but even second image. need both odd or even");
				
				return; //need error processing
			}
			
		
		
	});
	
}
	

	
	
	
	
	/*********** XCOMBO **********/
	
	
	
var xcombo_settings = null;

function prepare_xcombo(req, res)
{
	console.log('\nIn prepare_xcombo(...)\n');
	
	var second_image = new PNG({filterType: 4});
	
	req.pipe(second_image).on( 'parsed', function()  {
				
		
		xcombo_settings = {};
		xcombo_settings.second_image = this;
		
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end("ok");
					
	});				
					
}


function slozhenie_cvetov_nql(a,b)
{
	
	if(a == b) return a;
	
	var c = 0;
	
	if((a+b) > 255) c = (a+b) - 255;
	else c = (a+b);
	
	c /= 2;
	
	return c;
}	
	
	
	
	
function xcombo( req, res )
{
	
	console.log('\nIn xcombo(...)\n');
		
	if(xcombo_settings == null)
	{
		
		res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("xcombo: error: call /prepare_xcombo before");
		//req.connection.destroy();
		return;

	}
	
	var old_png = xcombo_settings.second_image; 
	
	var big_image = new PNG({filterType: 4});
	
	req.pipe(big_image).on('parsed', function() {
		
		
				
					
					
					
			if(old_png.width != old_png.height) 
			{
				error( req, res, "xcombo: error: old_png.width != old_png.height");
				return;
				
			}
			
			if(this.width != this.height) {
				error( req, res, "xcombo: error: this.width != this.height");
				
				return;  
			}
				
			console.log("old_png.width= " +old_png.width);	
			console.log("this.width= " +this.width);	
			
			if((old_png.width % 2 == 0) && (this.width % 2 ==  0))
			{
				
				//even
				if(old_png.width > this.width)
				{
					
					
					
					var result_png = new PNG ( {
						
							width: old_png.width,
							height: old_png.height,
							filterType: 4
					} );
					

					var t4 = (old_png.width-this.width)/2;
					var k4 = (old_png.height-this.height)/2;
					
				
					
					for(var j=0;j<old_png.height;j++)
					{
						for(var i=0;i<old_png.width;i++)
						{
							if( (i>=t4) && (i<(t4+this.width)) && (j>=k4) && (j<(k4+this.height))	)
							{
								
								
								
								var idx = (old_png.width * j + i) << 2;
								
								var n=i-t4;
								var m=j-k4;
								
								var new_idx1 = this.width * m + n << 2;
						
								result_png.data[idx+0] = this.data[new_idx1+0];
								result_png.data[idx+1] = this.data[new_idx1+1];
								result_png.data[idx+2] = this.data[new_idx1+2];
								result_png.data[idx+3] = 255;
								
								
								
							}
							else
							{
								
								
								var idx = (old_png.width * j + i) << 2;
								
								result_png.data[idx+0] = old_png.data[idx+0];
								result_png.data[idx+1] = old_png.data[idx+1];
								result_png.data[idx+2] = old_png.data[idx+2];
								result_png.data[idx+3] = 255;
								
							}
						}
					}
					
					
					
					
					

				}
				else
				{
					
					var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );
					
					
					
					
					
					var t4 = (this.width-old_png.width)/2;
					var k4 = (this.height-old_png.height)/2;
					
					
					
					for(var j=0;j<this.height;j++)
					{
						for(var i=0;i<this.width;i++)
						{
							if( (i>=t4) && (i<(t4+old_png.width)) && (j>=k4) && (j<(k4+old_png.height))	)
							{
								
								
								
								var idx = (this.width * j + i) << 2;
								
								var n=i-t4;
								var m=j-k4;
								
								var idx2 = (old_png.width * n + m) << 2;
						
								result_png.data[idx+0] = old_png.data[idx2+0];
								result_png.data[idx+1] = old_png.data[idx2+1];
								result_png.data[idx+2] = old_png.data[idx2+2];
								result_png.data[idx+3] = 255;
								
								
								
							}
							else
							{
								
								
								var idx = (this.width * j + i) << 2;
								
								result_png.data[idx+0] = this.data[idx+0];
								result_png.data[idx+1] = this.data[idx+1];
								result_png.data[idx+2] = this.data[idx+2];
								result_png.data[idx+3] = 255;
								
							}
						}
					}
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}
				
						
				
				
				sendImage(result_png,res,'\nImages xcombined\n');
				
				
				
			}
			else if ((old_png.width % 2 == 1) && (this.width % 2 ==  1))
			{
				//odd
				if(old_png.width > this.width)
				{
					
					
					var result_png = new PNG ( {
						
							width: old_png.width,
							height: old_png.height,
							filterType: 4
					} );
					
					var middle_of_bigger_w = old_png.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_w = this.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
					
					var begin_w = middle_of_bigger_w - middle_of_smaller_w;
					var end_w = begin_w + this.width; //and (not include) end
					
					var middle_of_bigger_h = old_png.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_h = this.height / 2 | 0; 
					
					var begin_h = middle_of_bigger_h - middle_of_smaller_h;
					var end_h = begin_h + this.height; 	
					
					
					for(var j=0;j<old_png.height;j++)
					{
						for(var i=0;i<old_png.width;i++)
						{
							var idx = (old_png.width * j + i) << 2;	
							
							if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
							{
							
								var n =	i - begin_w;
								var m = j - begin_h;
								
								var idx2 = this.width * m + n << 2;
								
								result_png.data[idx+0] = this.data[idx2+0];
								result_png.data[idx+1] = this.data[idx2+1];
								result_png.data[idx+2] = this.data[idx2+2];
								result_png.data[idx+3] = 255;
								
								
							}
							else
							{
							
								result_png.data[idx+0] = old_png.data[idx+0];
								result_png.data[idx+1] = old_png.data[idx+1];
								result_png.data[idx+2] = old_png.data[idx+2];
								result_png.data[idx+3] = 255;
							}
						}
					}
					
					
					
					
				}
				else
				{
					
					var result_png = new PNG ( {
						
							width: this.width,
							height: this.height,
							filterType: 4
					} );
					
					var middle_of_bigger_w = this.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_w = old_png.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
					
					var middle_of_bigger_h = this.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
					var middle_of_smaller_h = old_png.height / 2 | 0; 
					
					var begin_w = middle_of_bigger_w - middle_of_smaller_w;
					var end_w = begin_w + old_png.width; //and (not include) end
					
					var begin_h = middle_of_bigger_h - middle_of_smaller_h;
					var end_h = begin_h + old_png.height; 	
				
					for(var j=0;j<this.height;j++)
					{
						for(var i=0;i<this.width;i++)
						{
							var idx = (this.width * j + i) << 2;	
							
							if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
							{
								
								var n =	i - begin_w;
								var m = j - begin_h;
								
								var idx2 = old_png.width * m + n << 2;
								
								result_png.data[idx+0] = old_png.data[idx2+0];
								result_png.data[idx+1] = old_png.data[idx2+1];
								result_png.data[idx+2] = old_png.data[idx2+2];
								result_png.data[idx+3] = 255;
								
								
							}
							else
							{
								
								
								result_png.data[idx+0] = this.data[idx+0];
								result_png.data[idx+1] = this.data[idx+1];
								result_png.data[idx+2] = this.data[idx+2];
								result_png.data[idx+3] = 255;
							}
						}
					}
				}
				
				
				
				
				
				sendImage(result_png,res,'\nImages xcombined\n');
				
				
				
				
				
				
			}
			else  
			{
				
				error( req, res, "xcombo: error: odd first image but even second image. need both odd or even");
				
				return; //need error processing
			}
			
		
		
	});
	
}
	

	
	
	
	
	/********** END OF XCOMBO ***************/
	
	
	
	
	
	
	
	

var fill_settings = null;

function get_seed(req, res)
{
	console.log('\nIn get_seed(...)\n');
	
	var small_image = new PNG({filterType: 4});
	
	req.pipe(small_image).on( 'parsed', function()  {
				
		
		fill_settings = {};
		fill_settings.seed = this;
		
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end("ok");
					
	});				
					
}
	

function fill( req, res )
{
	
	console.log('\nIn fill(...)\n');
		
	if(fill_settings == null)
	{
		
		res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("fill: error: call /send_seed before");
		req.connection.destroy();
		return;

	}
	
	
	
	var small_image = fill_settings.seed; 
	
	var big_image = new PNG({filterType: 4});
	
	req.pipe(big_image).on('parsed', function() {
		
		if(big_image.width * small_image.width > 1200 || big_image.height *  small_image.height > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			console.log("fill: error: too big size (need result width * height <= 1200)");
			res.end("fill: error: too big size (need result width * height <= 1200)");
			//req.connection.destroy();
			return;
			
		}
					var newpng = new PNG ( {
						
							width: big_image.width * small_image.width,
							height: big_image.height * small_image.height,
							filterType: 4
					} );
					
					
	
		
		//16%3 = 012
		
		//console.log("big_image.width="+big_image.width);
		//console.log("small_image.width="+small_image.width);
		//console.log("newpng.width="+newpng.width);
		
		//var testError = new Error('for test only');
		//testError.status = 500;
		//throw testError;
		
			for (var y = 0; y < big_image.height; y++) {
				
				for (var x = 0; x < big_image.width; x++) {
					
					
					var idxBig = ( big_image.width * y + x ) << 2;
					
					
					for (var m = 0; m < small_image.height; m++) {
						
						for (var n = 0; n < small_image.width; n++) {
							
								var idxSim = ( small_image.width * m + n ) << 2;
								
								k=x*small_image.width+n;
								p=y*small_image.height+m;
								var idxRes = newpng.width*p + k << 2;
								
								newpng.data[idxRes+0] = getColDec( big_image.data[idxBig+0] , small_image.data[idxSim+0]);
					
								newpng.data[idxRes+1] = getColDec( big_image.data[idxBig+1] , small_image.data[idxSim+1]);
								
								newpng.data[idxRes+2] = getColDec( big_image.data[idxBig+2] , small_image.data[idxSim+2]);
								
								newpng.data[idxRes+3] = 255;
								
						}
					}
					
					
				}
			}

			fill_settings = null;			
			
			sendImage(newpng,res,'\nImage seeded\n');
		
		
	});
	
}
	
	
app.post('/fill', fill );	
app.post('/prepare_combo', prepare_combo );	
app.post('/combo', combo );	
app.post('/prepare_xcombo', prepare_xcombo );	
app.post('/xcombo', xcombo );	
app.post('/send_seed', get_seed );
app.post('/crop', crop );
app.post('/precrop', precrop );
app.post('/random', random );
app.post('/mdown', mdown );
app.post('/mright', mright );
app.post('/vortex', vortex );
app.post('/rotate', rotate );
app.post('/half', half );
app.post('/median', median );
app.post('/axes', axes );
app.post('/multiply', multiply );
app.post('/rotateff', rotateff );
app.post('/plus', plus );
app.post('/minus', minus );
app.post('/blackwhite', blackwhite );
app.post('/inverse', inverse );
app.post('/borderplus', borderplus );
app.post('/borderminus', borderminus );

app.post('/paste',function(request, response) {

				request.pipe(response);
					/*******
					var old_fullpath = './canvas1' + '/' + getCurrentImageCanvasName();
					
					var newname = generateFileName()+".png";
					var new_fullpath = './canvas1' + '/' + newname;
					
					var wstream = fs.createWriteStream( new_fullpath );
					req.pipe(wstream);
					
					request.on('end', function()
					{
						console.log("Stream "+new_fullpath+" is wrote and closed");
						//setCurrentCanvasImageName(newname);
						
						console.log("Now we try to unlink "+old_fullpath);
						fs.unlinkSync(old_fullpath);
						console.log("success");
						
						returnNewCanvasImageName(res);
						
					});
					******/
					
				   
});  








app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


