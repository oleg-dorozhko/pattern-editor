//var opbeat = require('opbeat').start()
var mod_rio = require('./lib/mod_rio');
var mod_up = require('./lib/mod_up');
var mod_mirror = require('./lib/mod_mirror');
//var mod_half = require('./lib/mod_half');
var mod_axes = require('./lib/mod_axes');
var mod_generate_random_seed = require('./lib/mod_generate_random_seed');
var mod_inverse = require('./lib/mod_inverse');
var mod_random = require('./lib/mod_random');
var mod_median = require('./lib/mod_median');
var mod_step_colors = require('./lib/mod_step_colors');
var mod_destroy_colors = require('./lib/mod_destroy_colors');
var mod_odin_dva_colors = require('./lib/mod_odin_dva_colors');
var mod_join_colors = require('./lib/mod_join_colors');
var mod_colors = require('./lib/mod_colors');
var mod_rotate_ff = require('./lib/mod_rotate_ff');
var mod_gcombo = require('./lib/mod_gcombo');
var mod_brain = require('./lib/mod_brain');
var mod_min_colors = require('./lib/mod_min_colors');
var mod_razn_colors = require('./lib/mod_razn_colors');
var mod_axes = require('./lib/mod_axes');
var mod_black_white = require('./lib/mod_black_white');
var mod_smooth = require('./lib/mod_smooth');
var mod_nineth = require('./lib/mod_nineth');
var mod_paint_over = require('./lib/mod_paint_over');
var mod_rotate_any = require('./lib/mod_rotate_any');
var mod_md5 = require('./lib/mod_md5');

var PNG = require('pngjs').PNG;
var md5 = require('js-md5');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();  
var fs = require('fs');
//var bodyParser = require('body-parser');
var Readable = require('stream').Readable;
var qs = require('querystring');
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.bodyParser());
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
//app.use(opbeat.middleware.express())

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

app.get('/get_xy_labirint', function(request, response) {
	response.writeHead(200, {  'Content-Type': 'text/html' } );
	response.end('{"x":'+glob_pixelsPro_x_left_top+',"y":'+glob_pixelsPro_y_left_top+',"nn":'+glob_pixelsPro_pg_pixels_scale+'}');
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

function sendText(result_text, response, msg)
{
	console.log(msg);
	response.writeHead(200, {  'Content-Type': 'text/html' } );
	response.end(result_text); 
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
			
		sendImage( mod_black_white.black_white(this), res, 'black white' );
		
			
			
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

function old_median( req, res )
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

function smooth(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_smooth.smooth(this),res,"\nsmooth");
		
	});
		
}


function nineth(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_nineth.nineth(this),res,"\nnineth");
		
	});
		
}

function paint_over(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_paint_over.paint_over(this),res,"\npaint over");
		
	});
		
}


function getDataTxtObjectByMD5(md5)
{
	var arr = fs.readdirSync('./memory');
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==(''+md5+'.id'))
		{
			var s = fs.readFileSync( './memory/'+arr[i]);
			return JSON.parse(s);
		}
	  
	}
	return null;
	
}

function isDataPNGObjectByMD5(md5)
{
	//var arr = fs.readdirSync('./memory');
	for(var i=0;i<global_memory.length;i++)
	{
		//console.log('test '+arr[i]);
		if(global_memory[i].id===md5)
		{
			
			return i;
		}
	  
	}
	return null;
	
}

function pre_rotate_any(req, res)
{
	
	console.log('pre_rotate_any:');
	for(var key in req.body)	console.log('req.body['+key+']: '+req.body[key]);
	
	var s = (''+req.body['md5']).trim();
	
	
	var ind = isDataPNGObjectByMD5(s);
		if(ind==null)
		{
			console.log('pre_rotate_any:error: not found obj with this md5:'+s);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('pre_rotate_any:error:  not found obj with this md5:'+s);
				req.connection.destroy();
				return;
		}
	
	var obj = global_memory[ind];
	obj.hash = s;
	obj.degree = req.body['degree'];
	// fs.writeFile("./memory/"+s+'.id', JSON.stringify(obj), function(err) {
		// if(err) {
			// return console.log(err);
		// }

		// console.log("The file was saved!");
	//}); 
	
	
	res.writeHead(200, {  'Content-Type': 'text/html' } );
	res.end('ok');
	
}
function rotate_any(req, res)
{
	
	console.log('rotate_any:');
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		var s = get_md5_hex(this.data);
		var ind = isDataPNGObjectByMD5(s);
		if(ind==null)
		{
			console.log('rotate_any: not found obj with this md5:'+s);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('rotate_any: not found obj with this md5:'+s);
				req.connection.destroy();
				return;
		}
		else sendImage(mod_rotate_any.rotate_any(this,global_memory[ind]),res,"\nrotate_any");
		
	});
	
}

function rotate_ff(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_rotate_ff.rotate_ff(this),res,"\nImage was ff rotated\n");
		
	});
}

function median(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_median.__median(this),res,"\nImage was medianed\n");
		
	});
		
}


function gcombo(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_gcombo.__gcombo(this),res,"\nImage was gcombed\n");
		
	});
		
}

function brain(req, res)
{
	console.log('In brain:');
	console.log('req:'+req);
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_brain.__brain(this),res,"\nImage was brained\n");
		
	});
		
}


function __half(im)
{
	
	//var arr = get_coordinates(this.width, this.height);
		//if(arr == null) return; 
		
		var n=0;
		var m=0;
		if( im.width%2 == 0  ) n = im.width/2;
		else if( im.width%2 == 1  ) n = (im.width/2|0)+1;
		
		
		if(im.height%2 == 0) {  m = im.height/2;  }
		else if(im.height%2 == 1) { m = (im.height/2|0)+1; }
		// else 
		// {
			// var err = "width %2 != 0 or height %2 != 0 ";
			// console.log(err);
			// res.writeHead(500, {  'Content-Type': 'text/html' } );
			// res.end("/half: error: "+err);
			// return;
			
		// }	


		
		
		var newpng = new PNG ( {
			
				width: n,
				height: m,
				filterType: 4
		} );
		
		

			for (var y = 0; y < m; y++) {
				
				for (var x = 0; x < n; x++) {
					
					var idx = (im.width * y + x) << 2;
					var idx2 = (newpng.width * y + x) << 2;
					
					newpng.data[idx2] = im.data[idx];
					newpng.data[idx2+1] = im.data[idx+1];
					newpng.data[idx2+2] = im.data[idx+2];
					newpng.data[idx2+3] = im.data[idx+3];
					
				}
			}
			
	
	return newpng;
}

function half( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
			var newpng = __half(this);
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


function __vortex(im)
{
	
	
		
		var newpng = new PNG ( {
			
				width: im.width*2,
				height: im.height,
				filterType: 4
		} );
		
		

			for (var y = 0; y < newpng.height; y++) {
				
				n=0;
				for (var x = 0; x < newpng.width; x++) {
					
					var idx = 0;
					var new_idx1 = newpng.width * y + x << 2;
					if(x < im.width)
					{
					
						idx = (im.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = im.data[idx+0];
						newpng.data[new_idx1+1] = im.data[idx+1];
						newpng.data[new_idx1+2] = im.data[idx+2];
						newpng.data[new_idx1+3] = im.data[idx+3];
						n++;
					}
					else
					{
						idx = (im.width * y + (n-1)) << 2;
						
						newpng.data[new_idx1+0] = im.data[idx+0];
						newpng.data[new_idx1+1] = im.data[idx+1];
						newpng.data[new_idx1+2] = im.data[idx+2];
						newpng.data[new_idx1+3] = im.data[idx+3];
						
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
			
			
			return newpng2;
	
	
	
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
		
		
		
			
		
			sendImage(__vortex(this),res,'\nImage vortexed\n');
			
			
			
			
			
			
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
		
		
	
				
		sendImage( mod_mirror.mirror_down(this), res, 'mirror down' );
					
	
		
		/***
		
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
			
			***/
			
		//	sendImage(newpng,res,'\nImage mirror downed\n');
			
			
	});
}

/***

function half( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		if( this.width * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("mright: error: too big size (need result width * 2 <= 1200)");
			return;
			
		}

		
		sendImage(mod_half.half(this), res, 'half');	
			
	});
}

***/

function mright( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		if( this.width * 2 > 1200 )
		{
			
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end("mright: error: too big size (need result width * 2 <= 1200)");
			return;
			
		}
			
		/***
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

		***/
		
		sendImage(mod_mirror.mirror_right(this), res, 'mirror right');	
			
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




function old__axes( req, res )
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













	
	
	function newcroplt(ish_png,  res,crop_settings)
	{
		
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
			for (var y = 0; y < ish_png.height; y++) {
				
				var n=0;
				for (var x = 0; x < ish_png.width; x++) {
					
					/***
					console.log("x="+x);
					console.log("y="+y);
					console.log("n="+n);
					console.log("m="+m);
					***/
					if( x>=xw  && y>=yh )
					{
						var idx = (ish_png.width * y + x) << 2;
						
						var newidx = (newpng.width * m + n) << 2;

						newpng.data[newidx+0] = ish_png.data[idx+0];
						newpng.data[newidx+1] = ish_png.data[idx+1];
						newpng.data[newidx+2] = ish_png.data[idx+2];
						newpng.data[newidx+3] = ish_png.data[idx+3];
						
						n++;
					}
				}
				
				if(y>=yh) m++;
			}


			
			return newpng;
			


											
	}
	
	function newcroprb(ish_png, res,crop_settings)
	{
		
			
			var xw = crop_settings.x;
			var yh = crop_settings.y;
			
			var newpng = new PNG ( {
													
				width: xw+1,
				height: yh+1,
				filterType: 4
				
			} );

			for (var y = 0; y < newpng.height; y++) {
				
				for (var x = 0; x < newpng.width; x++) {
					
					var idx = (ish_png.width * y + x) << 2;
					var newidx = (newpng.width * y + x) << 2;

					newpng.data[newidx+0] = ish_png.data[idx+0];
					newpng.data[newidx+1] = ish_png.data[idx+1];
					newpng.data[newidx+2] = ish_png.data[idx+2];
					newpng.data[newidx+3] = ish_png.data[idx+3];
				}
			}

			return newpng;
			

		
											
	}
	
	
	
	function crop( req, res )
	{
		console.log('\nIn crop(...)\n');
		
		
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
			
			
			var s = get_md5_hex(this.data);
			var ind =	isDataPNGObjectByMD5(s);
			if(ind==null)
			{
				
				console.log('crop: not found crop_settings with this md5:'+s);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('crop: not found crop_settings with this md5:'+s);
					req.connection.destroy();
					return;
				
				
				
			}
			
			
			
			var crop_settings=global_memory[ind].crop_settings;
			
			
					
			
			
			var flag = crop_settings.flag;
			
			
			console.log("x="+crop_settings.x);
			console.log("y="+crop_settings.y);
			console.log("w="+crop_settings.w);
			console.log("h="+crop_settings.h);
			console.log("flag="+flag);
			console.log("md5="+crop_settings.md5);
			
			if(flag==1)
			{
				
			
				var newpng = newcroplt(this,res,crop_settings);
				
				sendImage(newpng,res,'\nImage was LT croped \n');
				
			}
			
			else if(flag==2)
			{
				
				
				var newpng = newcroprb(this,res,crop_settings);
				
				sendImage(newpng,res,'\nImage was RB croped \n');
				
			}
			
		
		});
		
		
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
			
			console.log("md5="+post['md5']);
			
			crop_settings.md5= post['md5'];
			
			// fs.writeFile("./memory/"+post['md5']+'.id', JSON.stringify(crop_settings), function(err) {
				// if(err) {
					// return console.log(err);
				// }
			var ind =	isDataPNGObjectByMD5(crop_settings.md5);
			if(ind==null)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("precrop: error: in call /precrop ind==null");
				req.connection.destroy();
				return;
			}
			else
			{
				var obj = global_memory[ind];
				obj.crop_settings=crop_settings;
				global_memory[ind]=obj;
				
				res.writeHead( 200, { 'Content-Type':'text/plain' } );
				res.end("ok");
			
				
			}
			
			
		});
		
			
					
							
					
}

var combo_settings = null;

function prepare_combo(req, res)
{
	console.log('\nIn prepare_combo(...)\n');
	
	var second_image = new PNG({filterType: 4});
	
	req.pipe(second_image).on( 'parsed', function()  {
				
		
		var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

		var md5 = get_md5_hex(this.data);
		
		require("fs").writeFile("./memory/"+md5+".png", base64Data, 'base64', function(err) {
		  
		  
		  console.log(err);
		  
		  
		  
		  
		});
		
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(md5);
		
		
					
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
	/***	
	if(combo_settings == null)
	{
		
		res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("combo: error: call /prepare_combo before");
		req.connection.destroy();
		return;

	}
	**/
	for(var key in req.body)	console.log('req.body['+key+']: '+req.body[key]);
	
	var md51 = (''+req.body['md51']).trim();
	var md52 = (''+req.body['md52']).trim();
	
	var nm1 = isDataPNGObjectByMD5(md51);
	if(nm1==null)
	{
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("combo: error: call /prepare_combo before");
		req.connection.destroy();
		return;
		
		
	}
	var nm2 = isDataPNGObjectByMD5(md52);
	if(nm2==null)
	{
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("combo: error: call /prepare_combo before");
		req.connection.destroy();
		return;
		
		
	}
	
	//global_memory[nm1].img.pipe(  ).on('parsed', function() {

		var old_png =  new PNG({
			
			width: global_memory[nm1].img.width,
			height: global_memory[nm1].img.height,
			filterType: 4
			
			
			});
		
		
		
		
		var arr = global_memory[nm1].img.data;
		
		
		//	var arr=[];
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
							
							//	console.log('\n'+idx+'\n');
								old_png.data[idx]=arr[idx];
								old_png.data[idx+1]=arr[idx+1];
								old_png.data[idx+2]=arr[idx+2];
								old_png.data[idx+3]=arr[idx+3];
							}
						}
		
		
		
		
		
		var big_image =  new PNG({
			
			width: global_memory[nm2].img.width,
			height: global_memory[nm2].img.height,
			filterType: 4
			
			
			});
		
		
		
		arr = global_memory[nm2].img.data;
		
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
							
						//		console.log('\n'+idx+'\n');
								big_image.data[idx]=arr[idx];
								big_image.data[idx+1]=arr[idx+1];
								big_image.data[idx+2]=arr[idx+2];
								big_image.data[idx+3]=arr[idx+3];
							}
						}
		
		
		
		
		
		
		
		
		
		//console.log('\n777777.)\n');
		
		
		
		
		// old_png.data =JSON.parse(old_png.data);
		//global_memory[nm2].img.pipe( new PNG({filterType: 4}) ).on('parsed', function() {

		
			// var big_image =  global_memory[nm1].img;//JSON.parse();//new PNG({filterType: 4});
			// big_image.data =JSON.parse(big_image.data);
	
		//	req.pipe(big_image).on('parsed', function() {
				
				
					
					
								
				// if(old_png.width != old_png.height) 
				// {
					// error( req, res, "combo: error: old_png.width != old_png.height");
					// return;
					
				// }
				
				// if(this.width != this.height) {
					// error( req, res, "combo: error: this.width != this.height");
					
					// return;  
				// }
					
				if((old_png.width % 2 == 0) && (big_image.width % 2 ==  0))
				{
					//even
					if(old_png.width > big_image.width)
					{
						
						
						
						var result_png = new PNG ( {
							
								width: old_png.width,
								height: old_png.height,
								filterType: 4
						} );
						

						var t4 = (old_png.width-big_image.width)/2;
						var k4 = (old_png.height-big_image.height)/2;
						
						
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								if( (i>=t4) && (i<(t4+big_image.width)) && (j>=k4) && (j<(k4+big_image.height))	)
								{
									
									
									
									var idx = (old_png.width * j + i) << 2;
									
									var n=i-t4;
									var m=j-k4;
									
									var new_idx1 = big_image.width * m + n << 2;
							
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[new_idx1+0], old_png.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[new_idx1+1], old_png.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[new_idx1+2], old_png.data[idx+2] );
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
							
								width: big_image.width,
								height: big_image.height,
								filterType: 4
						} );
						
						
						
						
						
						var t4 = (big_image.width-old_png.width)/2;
						var k4 = (big_image.height-old_png.height)/2;
						
						
						
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								if( (i>=t4) && (i<(t4+old_png.width)) && (j>=k4) && (j<(k4+old_png.height))	)
								{
									
									
									
									var idx = (big_image.width * j + i) << 2;
									
									var n=i-t4;
									var m=j-k4;
									
									var new_idx1 = old_png.width * m + n << 2;
							
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[idx+0], old_png.data[new_idx1+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[idx+1], old_png.data[new_idx1+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[idx+2], old_png.data[new_idx1+2] );
									result_png.data[idx+3] = 255;
									
									
									
								}
								else
								{
									
									
									var idx = (big_image.width * j + i) << 2;
									
									result_png.data[idx+0] = big_image.data[idx+0];
									result_png.data[idx+1] = big_image.data[idx+1];
									result_png.data[idx+2] = big_image.data[idx+2];
									result_png.data[idx+3] = 255;
									
								}
							}
						}
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
					}
					
					global_memory.splice(nm1);		
					global_memory.splice(nm2);
					
					sendImage(result_png,res,'\nImages combined\n');
					
					
					
				}
				else if ((old_png.width % 2 == 1) && (big_image.width % 2 ==  1))
				{
					//odd
					if(old_png.width > big_image.width)
					{
						
						
						var result_png = new PNG ( {
							
								width: old_png.width,
								height: old_png.height,
								filterType: 4
						} );
						
						var middle_of_bigger_w = old_png.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_w = big_image.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
						
						var begin_w = middle_of_bigger_w - middle_of_smaller_w;
						var end_w = begin_w + big_image.width; //and (not include) end
						
						var middle_of_bigger_h = old_png.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_h = big_image.height / 2 | 0; 
						
						var begin_h = middle_of_bigger_h - middle_of_smaller_h;
						var end_h = begin_h + big_image.height; 	
						
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
								
								if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
								{
								
									var n =	i - begin_w;
									var m = j - begin_h;
									
									var idx2 = big_image.width * m + n << 2;
									
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[idx2+0], old_png.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[idx2+1], old_png.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[idx2+2], old_png.data[idx+2] );
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
							
								width: big_image.width,
								height: big_image.height,
								filterType: 4
						} );
						
						var middle_of_bigger_w = big_image.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_w = old_png.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
						
						var middle_of_bigger_h = big_image.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_h = old_png.height / 2 | 0; 
						
						var begin_w = middle_of_bigger_w - middle_of_smaller_w;
						var end_w = begin_w + old_png.width; //and (not include) end
						
						var begin_h = middle_of_bigger_h - middle_of_smaller_h;
						var end_h = begin_h + old_png.height; 	
					
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
								
								if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
								{
									
									var n =	i - begin_w;
									var m = j - begin_h;
									
									var idx2 = old_png.width * m + n << 2;
									
									result_png.data[idx+0] = slozhenie_cvetov( old_png.data[idx2+0], big_image.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( old_png.data[idx2+1], big_image.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( old_png.data[idx2+2], big_image.data[idx+2] );
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
				
		
		
//	});
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
		
		
				
					
					
		
	
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
	
	
function rio(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_rio.rioForImageData(this), res, 'rio' );
					
	});				
					
}

var num_colors=null;
function set_num_colors(request, res)
{
	var body = [];
  request.on('error', function (err) {
    console.error(err);
  });
  
  
  request.on('data',  function (chunk){
    body.push(chunk);
  });
  
  
   request.on('end', function() {
    body = Buffer.concat(body).toString();
	
	 var obj = JSON.parse(body);
	   num_colors=obj.num_colors;
	   console.log(body);
	   console.log(''+body);
	    console.log(''+JSON.parse(body));
		 console.log(''+JSON.parse(body).num_colors);
	   sendText(""+num_colors, res, 'set num colors '+num_colors );
	
   });

  
   
}

function razn_colors(req, res)
{
	
	
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_razn_colors.raznColors(this), res, 'razn colors' );
					
	});				
					
}


function min_colors(req, res)
{
	
	if(num_colors == null)
	{
		
		res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("min_colors(): error: call /set_num_colors before");
		req.connection.destroy();
		return;

	}
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage(mod_min_colors.minColors(num_colors,this), res, 'min colors '+num_colors );
					
	});				
					
}

// function axes(req, res)
// {
	// req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		// sendImage( module.bothAxesMinus(this), res, 'axes' );
					
	// });	

// }

function colors(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendText(""+mod_colors.getCountOfColors(this), res, 'colors' );
					
	});				
					
}

function step_colors(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_step_colors.stepColorsForImageData(this), res, 'step colors' );
					
	});				
					
}

function destroy_colors(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
				var im = this;
				//for(var i=0;i<20; i++)
				{
					im = mod_destroy_colors.destroyColorsForImageData(im);
					
				}
					sendImage( im, res, 'destroy colors' );
	});				
					
}
		
function odin_dva_colors(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_odin_dva_colors.odinDvaColorsForImageData(this), res, 'odin dva colors' );
					
	});				
					
}

function get_md5_hex(data)
{
		var s =md5(data);
		//console.log('In get_md5_hex:'+s);
		return s;
		
		
	
		
}

function unident(req, res)
{
	
   var filepath = './server/upload/my.csv';
   fs.stat(filepath, function (err, stats) {
   
			console.log(stats);//here we got all information of file in stats variable

		   if (err) {
			   return console.error(err);
		   }

		   fs.unlink(filepath,function(err){
				if(err) return console.log(err);
				console.log('file deleted successfully');
		   });  
	});
}

var global_memory=[];

function ident(req, res)
{
	var png = new PNG({filterType: 4});
	req.pipe(png).on( 'parsed', function()  {
		
		var d = new Date();
		var ms = d.getTime();
		var md5 = get_md5_hex(this.data);
		var obj2 ={};
		obj2.width=this.width;
		obj2.height=this.height;
		
			var arr=[];
						for(var j=0;j<this.height;j++)
						{
							for(var i=0;i<this.width;i++)
							{
								var idx = (this.width * j + i) << 2;	
							
								
								arr.push(this.data[idx]);
								arr.push(this.data[idx+1]);
								arr.push(this.data[idx+2]);
								arr.push(this.data[idx+3]);
							}
						}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		obj2.data=arr;
		var obj = {};
		obj.id = md5;
		obj.img= obj2;
		global_memory.push(obj);
		
		//png.pack().pipe(fs.createWriteStream("memory/"+md5+".png"));
		
		
		
		
		
		console.log('\nIn ident(...)\nmd5='+md5);
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(""+md5);
		
					
	});				
					
}
function join_colors(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_join_colors.joinColorsForImageData(this), res, 'join colors' );
					
	});				
					
}
	
function up(req, res)
{
	//console.log('\nIn rio(...)\n');
	
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_up.upForImageData(this), res, 'up' );
					
	});				
					
}	
	
function axes_minus(req, res)
{
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		//var newpng = __half(this);	
		var prom = 	mod_axes.bothAxesMinus(this);
		
		sendImage( prom, res, 'both axes minus' );
					
	});	
}	

function axes_plus(req, res)
{
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_axes.bothAxesPlus(this), res, 'both axes plus' );
					
	});	
}

function inverse(req, res)
{
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_inverse.inverse(this), res, 'inverse' );
					
	});	
}

function random(req, res)
{
	req.pipe(new PNG({filterType: 4})).on( 'parsed', function()  {
				
		sendImage( mod_random.random(this), res, 'random' );
					
	});	
}

function generate_random_seed(req, res)
{
	console.log('in generate_random_seed'+req.body);
	var body = [];
  req.on('error', function (err) {
    console.error(err);
  });
  
  
  req.on('data',  function (chunk){
    body.push(chunk);
  });
  
  
   req.on('end', function() {
    body = Buffer.concat(body).toString();
	
	 var obj = JSON.parse(body); //params
	var params = [obj.size,obj.num_colors];
	  
	   console.log(''+body);
	     console.log(''+params);
		
		 sendImage( mod_generate_random_seed.generate_random_seed(params), res, 'generate random seed' );
		 
	   //sendText(""+num_colors, res, 'set num colors '+num_colors );
	
   });
	
	
	
}


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
app.post('/rio', rio );	
app.post('/set_num_colors', set_num_colors);
app.post('/min_colors', min_colors);
app.post('/colors', colors);
app.post('/brain', brain);
app.post('/gcombo', gcombo);
app.post('/inverse', inverse);
app.post('/smooth', smooth);
app.post('/nineth', nineth);
app.post('/razn_colors', razn_colors);		
app.post('/step_colors', step_colors);	
app.post('/paint_over', paint_over);

app.post('/destroy_colors', destroy_colors);	
app.post('/odin_dva_colors', odin_dva_colors);	
app.post('/join_colors', join_colors);	
app.post('/send_seed', get_seed );
app.post('/crop', crop );
app.post('/precrop', precrop );
app.post('/random', random );
app.post('/generate_random_seed',generate_random_seed);
app.post('/mdown', mdown );
app.post('/mright', mright );
app.post('/up', up );
app.post('/vortex', vortex );
app.post('/rotate', rotate );
app.post('/pre_rotate_any', pre_rotate_any );
app.post('/rotate_any', rotate_any );
app.post('/half', half );
app.post('/median', median );
//shift shift lt w/2+1
app.post('/axes_minus', axes_minus );
app.post('/axes_plus', axes_plus );
//app.post('/axes', axes );
app.post('/ident', ident );
app.post('/multiply', multiply );
app.post('/rotateff', rotateff );
app.post('/plus', plus );
app.post('/minus', minus );
app.post('/blackwhite', blackwhite );
app.post('/inverse', inverse );
app.post('/borderplus', borderplus );
app.post('/borderminus', borderminus );
app.get('/get_color_for_pass', get_color_for_pass );
app.post('/rotate_ff', rotate_ff );
app.post('/pixels', pixels );
app.post('/right_pixels', right_pixels );
app.post('/set_collected_pixels',set_collected_pixels);	
app.post('/init_pixels', init_pixels );
app.post('/init_boh_pixels', init_boh_pixels );
app.post('/init_labirint_settings', init_labirint_settings );
app.get('/get_chaosed_labirint',get_chaosed_labirint);
app.get('/get_collected', get_collected );
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

/***==============***/

//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------
var glob_pixelsPro_x_left_top = 0;
var glob_pixelsPro_y_left_top = 0;
var glob_pixelsPro_point = null;
var glob_pixelsPro_collected = [];
var glob_pixelsPro_pg_main_color = null;
var glob_pixelsPro_showing_scale_div = false;
var glob_pixelsPro_scale_div = null;

var glob_pixelsPro_pg_main_image = null;
var glob_pixelsPro_pg_boh_image = null;
var glob_pixelsPro_pg_map_image = null;
var glob_pixelsPro_pg_pixels_scale = 2;

function pixelsPro_array_equals(color,color2)
{
	for (var i = 0;  i < color.length; i++) 
	{
		if(color[i]!=color2[i]) return false;
		
	}
	return true;
}

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}

function copy_image(oldpng)
{
	console.log('\nIn copy_image(...)\n');
	
		
	var newpng = new PNG(
	{
		width: oldpng.width,
		height: oldpng.height,
		filterType: 4
	});
	
	for(var i=0;i<newpng.width;i++)
	{
		for(var j=0;j<newpng.height;j++)
		{
			
			var index = newpng.width * j + i << 2;
			
			newpng.data[index] = oldpng.data[index];
			newpng.data[index+1] = oldpng.data[index+1];
			newpng.data[index+2] = oldpng.data[index+2];
			newpng.data[index+3] = oldpng.data[index+3];
			
			
		}
	}	
	
	return newpng;
			
}

function get_chaosed_labirint(req, res)
{
	glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_map_image);
				
	sendImage(copy_image(glob_pixelsPro_pg_main_image), res, '\n get_chaosed_labirint ok\n');	
}

function init_boh_pixels(req, res)
{
	console.log('\nIn init_boh_pixels(...)\n');
	
		if(glob_pixelsPro_pg_main_image==null)
		{
			
			
		}
		else
		{
			
			
			var newpng = new PNG(
			{
				width: glob_pixelsPro_pg_main_image.width,
				height: glob_pixelsPro_pg_main_image.height,
				filterType: 4
			});
			
			for(var i=0;i<glob_pixelsPro_pg_main_image.width;i++)
			{
				for(var j=0;j<glob_pixelsPro_pg_main_image.height;j++)
				{
					
					var index2 = glob_pixelsPro_pg_main_image.width * j + i << 2;
					
					newpng.data[index2+0] = 127;
					newpng.data[index2+1] = 127;
					newpng.data[index2+2] = 127;
					newpng.data[index2+3] = 255;
					
					
				}
			}	
			var w = glob_pixelsPro_pg_main_image.width;
			var h = glob_pixelsPro_pg_main_image.height;
			var n=glob_num_of_strawbery;
			for(var i=0;i<n;i++)
			{
				var rx = getRandomInt(0, w);
				var ry = getRandomInt(0, h);
				var rgba = getRndColor();
				var ind = ry*w + rx << 2;
				newpng.data[ind] = rgba[0];
				newpng.data[ind+1] = rgba[1];
				newpng.data[ind+2] = rgba[2];
				newpng.data[ind+3] = rgba[3];
			
			}
	
			
		}
		
		glob_pixelsPro_pg_boh_image = newpng;
		
		/***
		var x=glob_pixelsPro_x_left_top;
		var y=glob_pixelsPro_y_left_top;
		
		var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
				var color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				glob_pixelsPro_pg_main_color=color;
		// res.writeHead( 200, { 'Content-Type':'text/plain' } );
		// res.end("ok");
		sendImage(glob_pixelsPro_pg_main_image,res,'\nLabirint initiation success\n');
		***/
		
				
					
}

function pixelsPro_getNeighborsColors(x,y,color)
{
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	
	
	var colors=[color];
		var index = glob_pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				
				
	var f=false;
	for(var i=0;i<colors.length;i++)
	{
		if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
		{
			f=true;
			break;
		}
	}
	if(f==false) colors.push(color);
				
				index = glob_pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				
				f=false;
	for(var i=0;i<colors.length;i++)
	{
		if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
		{
			f=true;
			break;
		}
	}
	if(f==false) colors.push(color);
				
				index = glob_pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				
				f=false;
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						f=true;
						break;
					}
				}
				if(f==false) colors.push(color);
				
				index = glob_pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				var color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				
				f=false;
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						f=true;
						break;
					}
				}
				if(f==false) colors.push(color);
				
				color=glob_pixelsPro_pg_main_color;
				
				var grey_color = [127,127,127,255];
				
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						
						colors.splice(i,1);
						break;
						
					}
					
					if(pixelsPro_array_equals(colors[i],grey_color)) colors.splice(i,1);
				}
				
				return colors;
	
}

function define_color_for_pass(x,y,color)
{
	var colors = pixelsPro_getNeighborsColors(x,y,color);
	if(colors.length==0) return [];
	return colors[getRandomInt(0,colors.length)];
}

function get_color_for_pass(req, res)
{
	if(glob_pixelsPro_color_for_pass.length==0) result_text='255,255,255,255';
	else result_text=glob_pixelsPro_color_for_pass.join(",");
	sendText(result_text, res, 'get_color_for_pass');
}

function init_pixels(req, res)
{
	console.log('\nIn init_pixels(...)\n');
	
	glob_pixelsPro_pg_main_image = new PNG({filterType: 4});
	
	req.pipe(glob_pixelsPro_pg_main_image).on( 'parsed', function()  {
		
		glob_pixelsPro_x_left_top = 0;
		glob_pixelsPro_y_left_top = 0;
		var x=glob_pixelsPro_x_left_top;
		var y=glob_pixelsPro_y_left_top;
		
		var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
				var color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				glob_pixelsPro_pg_main_color=color;
		glob_pixelsPro_pg_map_image = copy_image(glob_pixelsPro_pg_main_image);
			glob_pixelsPro_collected = [];
			
			glob_pixelsPro_color_for_pass = define_color_for_pass(x,y,color);
			
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end("ok");
		
		
	});				
					
}

function init_labirint_settings(req, res)
{
	
	var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("pixels(): error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
		
			var post = qs.parse(body);
		
			var x =  +post['x'];
			var y =  +post['y'];
			
			console.log("x="+x);
			console.log("y="+y);
			
			var nn =  +post['scale_koeficient'];
			
			glob_num_of_strawbery =  +post['num_of_strawbery'];
				
			init_boh_pixels(req, res);
	
			glob_pixelsPro_pg_main_image = setChaosPixels();
				
			var result_png = pixelsPro_redrawPixels_main(x,y);
								
			sendImage(result_png, res, '\nLabirint initiation step 2 success\n');	
			
			
			
			
		});
		
	
					
}

function setChaosPixels()
{
	var copy_map_image = copy_image(glob_pixelsPro_pg_map_image);
	var newpng = glob_pixelsPro_pg_boh_image;
	
			for(var i=0;i<newpng.width;i++)
			{
				for(var j=0;j<newpng.height;j++)
				{
					
					var index = newpng.width * j + i << 2;
					
					if((newpng.data[index] == 127) && (newpng.data[index+1] == 127) && 
					(newpng.data[index+2] == 127) && (newpng.data[index+3] == 255))
					{
						continue;
					}
					
					copy_map_image.data[index] = newpng.data[index];
					copy_map_image.data[index+1] = newpng.data[index+1];
					copy_map_image.data[index+2] = newpng.data[index+2];
					copy_map_image.data[index+3] = newpng.data[index+3];
					
					
				}
			}	
			
			return copy_map_image;
}


function pixels(req,res)	
{								
		console.log("\nIn pixels");
		
		
		var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("pixels(): error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
			console.log("11");
			var post = qs.parse(body);
			console.log("22");
			console.log(post);
			console.log(post.x);
			var x =  +post['x'];
			var y =  +post['y'];
			console.log("x="+x);
			console.log("y="+y);
			glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_map_image);
			if( is_grey(x,y)==false)
			{
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\n1. labirint not ok\n');	
			}
			
			else if(x<0||x>=glob_pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\n2. labirint not ok\n');	
				
			}
			else if(y<0||y>=glob_pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\n3. labirint not ok\n');	
				
			}
			
			else if((Math.abs(x-glob_pixelsPro_x_left_top)>1)||(Math.abs(y-glob_pixelsPro_y_left_top)>1)){
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\n4. labirint not ok\n'+Math.abs(x-glob_pixelsPro_x_left_top));	
				
			}
			
			
			
			else
			{ 
				
				
				
				var color = pixelsPro_getColorArrayFromImageData(x,y);
				
				//wall
				if(glob_pixelsPro_color_for_pass.length>0)
				{
					if(pixelsPro_array_equals(glob_pixelsPro_color_for_pass,color)==false)
					{
						console.log("#777");
						if(pixelsPro_array_equals(glob_pixelsPro_pg_main_color,color)==false)
						{
							console.log("#888");
								var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
							console.log("#999");
								sendImage(result_png, res, '\n5. labirint not ok\n');	
								
								return;
						}
					}
				}
				// {
					// var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
					// sendImage(result_png, res, '\nlabirint not ok\n');	
				// }
				// else
				{
					console.log("left(x,y)="+left(x,y));
					if(left(x,y)||right(x,y)||floor(x,y))
					{
						glob_pixelsPro_x_left_top = x;
						glob_pixelsPro_y_left_top = y;
						 
					
						glob_pixelsPro_pg_main_color = color;
						
						glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_map_image);
						
					//	var context = e.target.getContext("2d");
					//	var imageData = context.getImageData(x,y,1,1);
							
						var result_png = pixelsPro_redrawPixels_main(x,y);
						console.log("testing 111");
						glob_pixelsPro_color_for_pass = define_color_for_pass(x,y,color);
						console.log("testing 222 "+glob_pixelsPro_color_for_pass);
						sendImage(result_png, res, '\n5. labirint ok\n');	
					}
					else
					{
						var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
						sendImage(result_png, res, '\n6. labirint not ok\n');	
					}
				}
				
			}
		/***
		
			res.writeHead( 200, {  'Content-Type': 'blob' } ); 
			result_png.pipe(res);
			result_png.on('end', function()	{
				console.log('labirint ok');
			});
		***/	
			
		});
		
}


function right_pixels(req,res)	
{								
		console.log("\nIn right_pixels");
		
		
		var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("pixels(): error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
			console.log("11");
			var post = qs.parse(body);
			console.log("22");
			console.log(post);
			console.log(post.x);
			var x =  +post['x'];
			var y =  +post['y'];
			console.log("x="+x);
			console.log("y="+y);
			
			glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_main_image);
			if( is_grey(x,y)==true)
			{
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nchaos not ok\n');	
			}
			
			else if(x<0||x>=glob_pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nchaos not ok\n');	
				
			}
			else if(y<0||y>=glob_pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nchaos not ok\n');	
				
			}
			
			else if((Math.abs(x-glob_pixelsPro_x_left_top)>1)||(Math.abs(y-glob_pixelsPro_y_left_top)>1)){
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nchaos not ok\n');	
				
			}
			
			
			
			else
			{ 
				/***
				glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_main_image);
				
				var color = pixelsPro_getColorArrayFromImageData(x,y);
				//wall
				// if(pixelsPro_array_equals(glob_pixelsPro_pg_main_color,color)==false)
				// {
					// var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
					// sendImage(result_png, res, '\nlabirint not ok\n');	
				// }
				// else
				{
					console.log("left(x,y)="+left(x,y));
					if(left(x,y)||right(x,y)||floor(x,y))
					{
						
						***/
						
					//	glob_pixelsPro_x_left_top = x;
					//	glob_pixelsPro_y_left_top = y;
						 
					
					//	glob_pixelsPro_pg_main_color = color;
						
					//	var context = e.target.getContext("2d");
					//	var imageData = context.getImageData(x,y,1,1);
					
						glob_pixelsPro_pg_boh_image = take_chaos(x,y);	
						
						glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_map_image);
						
						var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
						
						sendImage(result_png, res, '\nchaose ok\n');	
						
						/***
					}
					else
					{
						var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
						sendImage(result_png, res, '\nlabirint not ok\n');	
					}
				}
				
				***/
				
			}
		/***
		
			res.writeHead( 200, {  'Content-Type': 'blob' } ); 
			result_png.pipe(res);
			result_png.on('end', function()	{
				console.log('labirint ok');
			});
		***/	
			
		});
		
}


function set_collected_pixels(req,res)	
{								
		console.log("\nIn set_collected_pixels");
		
		
		var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("pixels(): error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			var post = qs.parse(body);
			//console.log("22");
			console.log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			var color = post['color'].split(',');
			console.log("x="+x);
			console.log("y="+y);
			console.log("color="+color);
			glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_main_image);
			
			if(x<0||x>=glob_pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nset_collected_pixels not ok\n');	
				
			}
			else if(y<0||y>=glob_pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nset_collected_pixels not ok\n');	
				
			}
			
			else if((Math.abs(x-glob_pixelsPro_x_left_top)>1)||(Math.abs(y-glob_pixelsPro_y_left_top)>1)){
				
				var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				sendImage(result_png, res, '\nset_collected_pixels not ok\n');	
				
			}
			
			
			
			else
			{ 
				/***
				glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_main_image);
				
				var color = pixelsPro_getColorArrayFromImageData(x,y);
				//wall
				// if(pixelsPro_array_equals(glob_pixelsPro_pg_main_color,color)==false)
				// {
					// var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
					// sendImage(result_png, res, '\nlabirint not ok\n');	
				// }
				// else
				{
					console.log("left(x,y)="+left(x,y));
					if(left(x,y)||right(x,y)||floor(x,y))
					{
						
						***/
						
					//	glob_pixelsPro_x_left_top = x;
					//	glob_pixelsPro_y_left_top = y;
						 
					
					//	glob_pixelsPro_pg_main_color = color;
						
					//	var context = e.target.getContext("2d");
					//	var imageData = context.getImageData(x,y,1,1);
					
						glob_pixelsPro_pg_boh_image = throw_collected(x,y,color);	
						
						glob_pixelsPro_pg_main_image = setChaosPixels(glob_pixelsPro_pg_map_image);
						
						var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
						
						sendImage(result_png, res, '\nchaose ok\n');	
						
						/***
					}
					else
					{
						var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
						sendImage(result_png, res, '\nlabirint not ok\n');	
					}
				}
				
				***/
				
			}
		/***
		
			res.writeHead( 200, {  'Content-Type': 'blob' } ); 
			result_png.pipe(res);
			result_png.on('end', function()	{
				console.log('labirint ok');
			});
		***/	
			
		});
		
}


function get_collected(req, res)
{
	var s='';
	for(var i=0;i<glob_pixelsPro_collected.length;i++)
	{
		var obj = glob_pixelsPro_collected[i];
		var rgba = 'rgba('+obj.color[0]+','+obj.color[1]+','+obj.color[2]+','+(obj.color[3]/255)+')';
		var idd = 'span_collected_pixels'+i;
		var attr_color=obj.color.join(',');
		s += '<span class=\'flex-item\' attr_color=\''+attr_color+'\' id=\''+idd+'\' style=\'margin:2px;width:20px;height:20px;display: inline-block;border:2px solid '+rgba+';background-color: '+rgba+'\' > </span>';
	}
	 
		  res.writeHead(200, {  'Content-Type': 'text/html' } );
		  res.end(s);

	
}

function throw_collected(x,y,color)
{
	
	for(var i=0;i<glob_pixelsPro_collected.length;i++)
	{
		var obj = glob_pixelsPro_collected[i];
		if( pixelsPro_array_equals(obj.color,color)==true )
		{
			glob_pixelsPro_collected.splice(i,1);
			break;
		}
	}
	
	var index2 = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	glob_pixelsPro_pg_boh_image.data[index2] = color[0];
	glob_pixelsPro_pg_boh_image.data[index2+1] = color[1];
	glob_pixelsPro_pg_boh_image.data[index2+2] = color[2];
	glob_pixelsPro_pg_boh_image.data[index2+3] = color[3];
	
	
	return glob_pixelsPro_pg_boh_image;
}


function take_chaos(x,y)
{
	var color = [];
	var index = glob_pixelsPro_pg_map_image.width * y + x << 2;
	color[0] = glob_pixelsPro_pg_map_image.data[index];
	color[1] = glob_pixelsPro_pg_map_image.data[index+1];
	color[2] = glob_pixelsPro_pg_map_image.data[index+2];
	color[3] = glob_pixelsPro_pg_map_image.data[index+3];
	
	var color2 = [];
	var index2 = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	color2[0] = glob_pixelsPro_pg_boh_image.data[index2];
	color2[1] = glob_pixelsPro_pg_boh_image.data[index2+1];
	color2[2] = glob_pixelsPro_pg_boh_image.data[index2+2];
	color2[3] = glob_pixelsPro_pg_boh_image.data[index2+3];
	
	var obj = {};
	obj.x = x;
	obj.y = y;
	obj.color = color2;
	glob_pixelsPro_collected.push(obj);
	
	//var color = [];
	/***
	var index = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	glob_pixelsPro_pg_boh_image.data[index]=color[0];
	glob_pixelsPro_pg_boh_image.data[index+1]=color[1];
	glob_pixelsPro_pg_boh_image.data[index+2]=color[2];
	glob_pixelsPro_pg_boh_image.data[index+3]=color[3];
	***/	
	glob_pixelsPro_pg_boh_image.data[index]=127;
	glob_pixelsPro_pg_boh_image.data[index+1]=127;
	glob_pixelsPro_pg_boh_image.data[index+2]=127;
	glob_pixelsPro_pg_boh_image.data[index+3]=255;
	
	return glob_pixelsPro_pg_boh_image;
}



function is_grey(x,y)
{
	var color = [];
	var index = glob_pixelsPro_pg_boh_image.width * y + x << 2;
					
					
					color[0] = glob_pixelsPro_pg_boh_image.data[index];
					color[1] = glob_pixelsPro_pg_boh_image.data[index+1];
					color[2] = glob_pixelsPro_pg_boh_image.data[index+2];
					color[3] = glob_pixelsPro_pg_boh_image.data[index+3];
					
	var grey_color = [127,127,127,255];
	return pixelsPro_array_equals(color,grey_color);
}


function left(x,y)
{
	var color = pixelsPro_getColorArrayFromImageData(x,y);
	if(x-1<0)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(x-1,y);
	return !pixelsPro_array_equals(color,color2);
}

function right(x,y)
{
	var color = pixelsPro_getColorArrayFromImageData(x,y);
	if(x+1>=glob_pixelsPro_pg_main_image.width)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(x+1,y);
	return !pixelsPro_array_equals(color,color2);
}

function floor(x,y)
{
	var color = pixelsPro_getColorArrayFromImageData(x,y);
	if(y+1>=glob_pixelsPro_pg_main_image.height)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(x,y+1);
	return !pixelsPro_array_equals(color,color2);
}

function pixelsPro_getColorArrayFromImageData(x,y)
{
	/* var c2 = document.getElementById("pixels");
	var ctx = c2.getContext("2d");
	return ctx.getImageData(x,y,1,1).data; */
	
	var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
	var color = [
		glob_pixelsPro_pg_main_image.data[index],
		glob_pixelsPro_pg_main_image.data[index+1],
		glob_pixelsPro_pg_main_image.data[index+2],
		glob_pixelsPro_pg_main_image.data[index+3]
	];	
	return color;
}
		
function pixelsPro_redrawPixels_main( x,y)
{
	var nn=glob_pixelsPro_pg_pixels_scale;
	var newpng = new PNG ( {
						
			width: 150*nn, //glob_pixelsPro_pg_main_image.width,
			height: 150*nn, //glob_pixelsPro_pg_main_image.height,
			filterType: 4
	} );
		
	for(var i=0;i<newpng.width;i++)
	{
		for(var j=0;j<newpng.height;j++)
		{
			
			var index2 = newpng.width * j + i << 2;
			
			newpng.data[index2+0] = 127;
			newpng.data[index2+1] = 127;
			newpng.data[index2+2] = 127;
			newpng.data[index2+3] = 255;
			
			
		}
	}		
	
	
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			if((y+j)<0) continue;
			if((y+j)>=glob_pixelsPro_pg_main_image.height) continue;
			if((x+i)<0) continue;
			if((x+i)>=glob_pixelsPro_pg_main_image.width) continue;
			var index = glob_pixelsPro_pg_main_image.width * (y+j) + (x+i) << 2;
			
			var index2 = newpng.width * (j+7)*10*nn + (i+7)*10*nn << 2;
			
			var color = [glob_pixelsPro_pg_main_image.data[index+0],glob_pixelsPro_pg_main_image.data[index+1],glob_pixelsPro_pg_main_image.data[index+2],glob_pixelsPro_pg_main_image.data[index+3]];
			
			fillRectanglePro(newpng, (i+7)*10*nn, (j+7)*10*nn, 10*nn, 10*nn, newpng.width, color);
			
			newpng.data[index2+0] = glob_pixelsPro_pg_main_image.data[index+0];
			newpng.data[index2+1] = glob_pixelsPro_pg_main_image.data[index+1];
			newpng.data[index2+2] = glob_pixelsPro_pg_main_image.data[index+2];
			newpng.data[index2+3] = glob_pixelsPro_pg_main_image.data[index+3];
			
			//console.log('i='+i+' j='+j);
		}
	}
	
	
	

	return drawRedPoint(newpng,(7)*10*nn, (7)*10*nn, 10*nn, 10*nn);
	/***
	for(var i=0;i<150;i++)
	{
		for(var j=0;j<150;j++)
		{
			
			var index2 = newpng.width * j + i << 2;
			
			newpng.data[index2+0] = arr[index2+0];
			newpng.data[index2+1] = arr[index2+1];
			newpng.data[index2+2] = arr[index2+2];
			newpng.data[index2+3] = arr[index2+3];
			
			
		}
	}
	
	return newpng;
	***/
	
}



function fillRectanglePro(imgData2, i0, j0, n, m, width, col)
{
	
	
	for(var j=j0;j<j0+m;j++)
	{
		for(var i=i0;i<i0+n;i++)
		{
			var idx2 = (width * j + i ) << 2;
			imgData2.data[idx2] = col[0];
			imgData2.data[idx2+1] = col[1];
			imgData2.data[idx2+2] = col[2];
			imgData2.data[idx2+3] = col[3];
			
		}
	}
	
	return imgData2;
	
	/***
	
	for(var i=0;i<imgData2.width;i++)
	{
		for(var j=0;j<imgData2.height;j++)
		{
			
			var index2 = imgData2.width * j + i << 2;
			
			data[index2+0] = imgData2.data[index2+0];
			data[index2+1] = imgData2.data[index2+1];
			data[index2+2] = imgData2.data[index2+2];
			data[index2+3] = imgData2.data[index2+3];
			
			
		}
	}
	
	return data;
	
	***/
}


function drawRedPoint(newpng,xn, xm, w, h)
{
	var color = [255,0,0,255];
	return fillRectanglePro(newpng, xn, xm, w, h, newpng.width, color);
}

/*******
function pixelsPro_whenClickedOnCanvas(e)
{
			
	evt = (e) ? e : event;   
	if(evt.button == 0) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		glob_pixelsPro_x_left_top = x;
		glob_pixelsPro_y_left_top = y;
						
		var context = e.target.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		glob_pixelsPro_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		pixelsPro_showScaleDiv(e.target,x,y);
		pixelsPro_redrawPixels_main(context, x,y);
		
	}
			
}	

function pixelsPro_getColorArrayFromImageData(x,y)
{
	var c2 = document.getElementById("pixels");
	var ctx = c2.getContext("2d");
	return ctx.getImageData(x,y,1,1).data;
}


	
function pixelsPro_setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					var color = pixelsPro_getColorArrayFromImageData(x,y);
					var all_ok=false;
					if(glob_pixelsPro_point==null)all_ok=true;
					else if(pixelsPro_array_equals(color,glob_pixelsPro_point.color)) all_ok=true;
					
					if(all_ok) {
					
						glob_pixelsPro_point={};
						glob_pixelsPro_point.xy=[x,y];
						glob_pixelsPro_point.nm=[n,m];
						glob_pixelsPro_point.color=color;
						glob_pixelsPro_x_left_top += n;
						glob_pixelsPro_y_left_top += m;
						
						pixelsPro_redrawPixels_main(document.getElementById("canvas").getContext("2d"),  glob_pixelsPro_x_left_top, glob_pixelsPro_y_left_top );
					}
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function pixelsPro_initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	scale_div.style.visibility = 'hidden'; //visible
		
	pixelsPro_setEventListenersOnTri_Btns();
	pixelsPro_setEventListenersOnPixels();
}		
		
function pixelsPro_showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";
	document.getElementById('canvas_width_height').innerHTML = ""+document.getElementById('canvas').width+" x "+document.getElementById('canvas').height;
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}



function pixelsPro_setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			server_crop(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top,1);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			server_crop(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top,2);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden'; //visible
		
		}

}


***/

/*******/

// function pixelsPro_crop(x,y,flag)
// {
	
	
	// var sx,sy,w,h;
	// var canvas =  document.getElementById("canvas");
	
	// if(flag == 1)
	// {
		// sx = x;
		// sy = y;
		// w = canvas.width - sx;
		// h = canvas.height - sy;
	// }
	// else
	// {
		// sx = 0;
		// sy = 0;
		// w = x+1;
		// h = y+1;
	// }
	
	
	// var context = canvas.getContext("2d");
	// var imageData = context.getImageData(sx, sy, w, h);
	
	// ///////
	// //var buffer = imageData.data.buffer;  // ArrayBuffer
	// //////
	
	// canvas.width = w;
	// canvas.height = h;
	// canvas.getContext("2d").putImageData(imageData,0,0);
	
	// /*********
	// var imageData = context.createImageData(w, h);
	// imageData.data.set(buffer);
	
	// var params = [];
			
	// params['x']= x;
	// params['y']= y;
	// params['flag']= flag;
	// params['imgdata_base64']= dataurl;
			
	// sendPostWithParametersOnServer( params ); 
	// *********/
	
// }


// function pixelsPro_sendPostWithParametersOnServer( action, params  )
// {
	
				
	// var xhr = new XMLHttpRequest();
	
	// xhr.open('POST', action, true);
////	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// xhr.responseType = "blob";
	
	// xhr.onload = function(e) {  
		
			// if (xhr.readyState != 4) return;
			
			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			// /*******
    
            // var buffer = xhr.response;
            // var dataview = new DataView(buffer);
            // var ints = new Uint8ClampedArray(buffer.byteLength);
            // for (var i = 0; i < ints.length; i++) {
                // ints[i] = dataview.getUint8(i);
            // }
			
			// alert(ints[10]);
			
			// ************/
            // var blob = xhr.response;
			// getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas" ); } );
			
	// }

	// xhr.send(params);
	
// }


// function pixelsPro_server_crop(x,y,flag)
// {
	
	// var canvas =  document.getElementById("canvas");

	// var w = canvas.width;
	// var h = canvas.height;
	// var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag;		
	
	// var xhr = new XMLHttpRequest();
	// xhr.open('POST', '/precrop', true);
////	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	// xhr.onload = function(e) {  
		
			// if (xhr.readyState != 4) return;
			
			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			// /*******
    
            // var buffer = xhr.response;
            // var dataview = new DataView(buffer);
            // var ints = new Uint8ClampedArray(buffer.byteLength);
            // for (var i = 0; i < ints.length; i++) {
                // ints[i] = dataview.getUint8(i);
            // }
			
			// alert(ints[10]);
			
			// ************/
			
            // transform("canvas",'/crop');
			
	// }

	// xhr.send(params);
	
	
// }




/***==============***/







app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


