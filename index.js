//var opbeat = require('opbeat').start()
var mod_rio = require('./lib/mod_rio');
var mod_up = require('./lib/mod_up');
var mod_mirror = require('./lib/mod_mirror');
//var mod_half = require('./lib/mod_half');
//var mod_axes = require('./lib/mod_axes');
var mod_generate_random_seed = require('./lib/mod_generate_random_seed');
var mod_inverse = require('./lib/mod_inverse');
var mod_random = require('./lib/mod_random');
var mod_median = require('./lib/mod_median');
var mod_magik_rotate = require('./lib/mod_magik_rotate');
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
var mod_maximus = require('./lib/mod_maximus');
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



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});








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


function __getCountOfColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			//var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					if (obj[key]==undefined)obj[key]=0;
					obj[key]++;
					// if (obj[key]==undefined) { 
					
						
						// var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						// colors.push(col); 
						// obj[key]= {cnt:1,arr:col};
					
					// }
					// else
					// {
						// var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						// obj[key] = obj4;
					// }
					
					
					
					
					
				}
			}
			var n=0;
			for(var p in obj){n++;
			//console.log (p +" ="+obj[p]);
			}
			
			return n;
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

function __plus(img)
{
	
			//here we create new png (same as result bufferedImage (in java))
		var newpng = new PNG ( {
			
				width: img.width*2,
				height: img.height*2,
				filterType: 4
		} );
		

			for (var y = 0; y < img.height; y++) {
				for (var x = 0; x < img.width; x++) {
					
					var idx = (img.width * y + x) << 2;
					
					var new_idx = newpng.width * (y*2) + (x*2) << 2;
					var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
					
					newpng.data[new_idx] = img.data[idx];
					newpng.data[new_idx+1] = img.data[idx+1];
					newpng.data[new_idx+2] = img.data[idx+2];
					newpng.data[new_idx+3] = img.data[idx+3];
					
					newpng.data[new_idx+4] = img.data[idx];
					newpng.data[new_idx+5] = img.data[idx+1];
					newpng.data[new_idx+6] = img.data[idx+2];
					newpng.data[new_idx+7] = img.data[idx+3];
					
					newpng.data[new_idx2] = img.data[idx];
					newpng.data[new_idx2+1] = img.data[idx+1];
					newpng.data[new_idx2+2] = img.data[idx+2];
					newpng.data[new_idx2+3] = img.data[idx+3];
					
					newpng.data[new_idx2+4] = img.data[idx];
					newpng.data[new_idx2+5] = img.data[idx+1];
					newpng.data[new_idx2+6] = img.data[idx+2];
					newpng.data[new_idx2+7] = img.data[idx+3];
					
					
				}
			}
	
	return newpng;
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
		var newpng = __plus(this);

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

function create_png_from_global(ind)
{

		var old_png =  new PNG({
			
			width: global_memory[ind].img.width,
			height: global_memory[ind].img.height,
			filterType: 4
			
			
			});
		
		
		
		
		var arr = global_memory[ind].img.data;
		
		
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
		return old_png;
}
		

function execute_script(req, res)
{
	console.log('execute_script:');
	var s = '';
	for(var key in req.body)	{ 
		s +='\nreq.body['+key+']: '+req.body[key];
		
	}
	console.log(s); 
	
	var arr = req.body['commands'].split(",");
	var res_png=null;
	var ind=null;
	var md5=req.body['md5'];
	console.log(md5); 
	if(md5 != null)
	{
		ind = isDataPNGObjectByMD5(md5);
		if(ind==null)
		{
			console.log('execute_script: not found obj with this md5:'+md5);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('execute_script: not found obj with this md5:'+md5);
				req.connection.destroy();
				return;
		}
		else 
		{
			res_png =  create_png_from_global(ind);
			
			
		}
	
	
	
	}
	
	
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=arr[i].trim();
		console.log("executing ["+arr[i]+"]"); 
		
		if(arr[i].indexOf("generate random seed")===0)
		{
			var t = arr[i].replace("generate random seed",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=t.split(" ");
				if(params.length>0)
				{
					for(var ii=0;ii<params.length;ii++) params[ii]=Number(params[ii]);
					
				}
				else
				{
					params =[15,3];
				}
			}
			else
			{
				params =[15,3];
			}
			res_png = mod_generate_random_seed.generate_random_seed(params);
			
			
		}
		else if(arr[i]=="median")
		{
			
			res_png = mod_median.__median(res_png);
			
		}
		else if(arr[i].indexOf("magik rotate")===0)
		{
			var t = arr[i].replace("magik rotate",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=Number(t);
				
			}
			else
			{
				params =1;
			}
			res_png = mod_magik_rotate.magik_rotate(res_png,params);
			
		}
		else if(arr[i]=="up")
		{
			res_png = mod_up.upForImageData(res_png);
		}
		else if(arr[i]=="smooth")
		{
			
			res_png = mod_smooth.smooth(res_png);
			
		}
		else if(arr[i]=="rotate plus 45")
		{
			res_png = mod_rotate_ff.rotate_ff(res_png);
		}
		else if(arr[i]=="paint over")
		{
		
			res_png = mod_paint_over.paint_over(res_png);
		
		}
		else if(arr[i]=="nineth")
		{
		
			res_png = mod_nineth.nineth(res_png);
		
		}
		else if(arr[i]=="nonineth")
		{
		
			res_png = mod_nineth.nonineth(res_png);
		
		}
		else if(arr[i]=="maximus")
		{
		
			res_png = mod_maximus.maximus(res_png);
		
		}
		else if(arr[i]=="plus")
		{
			if(res_png.width * 2 > 1200 || res_png.height * 2 > 1200 )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("plus: error: too big size (need result width * 2 <= 1200 or height * 2 <= 1200 )");
				return;
				
			}
			
			res_png = __plus(res_png);
			
			
		}
		
		else if(arr[i]=="mirror right")
		{
			if(res_png.width * 2 > 1200  )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("mright: error: too big size (need result width * 2 <= 1200 )");
				return;
				
			}
			
			res_png = mod_mirror.mirror_right(res_png);
			
			
			
		}
		else if(arr[i]=="mirror down")
		{
			
			if( res_png.height * 2 > 1200 )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("mdown: error: too big size (need result height * 2 <= 1200)");
				return;
				
			}
			
			res_png = mod_mirror.mirror_down(res_png);
			
			
		}
		
		else if(arr[i]=="axes minus")
		{
		
		
		
			res_png = mod_axes.bothAxesMinus(res_png);
		
		
		
		}
		
		
	}
	
	if(ind !=null) global_memory.splice(ind,1);
	
	sendImage( res_png, res, 'script executed' );
	
}
function maximus(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_maximus.maximus(this),res,"maximus");
		
	});
		
}
function nonineth(req, res)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		sendImage(mod_nineth.nonineth(this),res,"\nnonineth");
		
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
		else 
		{
			var respng = mod_rotate_any.rotate_any(this,global_memory[ind]);
			global_memory.splice(ind,1);
			sendImage(respng,res,"\nrotate_any");
		}
		
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

	
function old_random( req, res )
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
				global_memory.splice(ind,1);
				sendImage(newpng,res,'\nImage was LT croped \n');
				
			}
			
			else if(flag==2)
			{
				
				
				var newpng = newcroprb(this,res,crop_settings);
				global_memory.splice(ind,1);
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
					
					global_memory.splice(nm1,1);		
					global_memory.splice(nm2,1);
					
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
					
					
					
					global_memory.splice(nm1,1);
					global_memory.splice(nm2,1);
					
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
		
		for(var key in req.body)	console.log('req.body['+key+']: '+req.body[key]);
	
	var md51 = (''+req.body['md51']).trim();
	var md52 = (''+req.body['md52']).trim();
	
	var nm1 = isDataPNGObjectByMD5(md51);
	if(nm1==null)
	{
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("xcombo: error: call /ident before");
		req.connection.destroy();
		return;
		
		
	}
	var nm2 = isDataPNGObjectByMD5(md52);
	if(nm2==null)
	{
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("xcombo: error: call /ident before");
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
		
		
		
		
		
		
				
					
					console.log("old_png.width= " +old_png.width);	
			console.log("big_image.width= " +big_image.width);	
					
			if(old_png.width != old_png.height) 
			{
				error( req, res, "xcombo: error: old_png.width != old_png.height");
				return;
				
			}
			
			if(big_image.width != big_image.height) {
				error( req, res, "xcombo: error: this.width != this.height");
				
				return;  
			}
			
	if((big_image.width == old_png.width)&&(big_image.height == old_png.height))
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
								
								
								
								var idx = (old_png.width * j + i) << 2;
								
								var n=i-t4;
								var m=j-k4;
								
								var new_idx1 = big_image.width * m + n << 2;
						
						
						if(
								(big_image.data[new_idx1]==old_png.data[idx])&&
								(big_image.data[new_idx1+1]==old_png.data[idx+1])&&
								(big_image.data[new_idx1+2]==old_png.data[idx+2])
						)
						{
												
								// result_png.data[idx] = 0;
								// result_png.data[idx+1] = 0;
								// result_png.data[idx+2] = 255;
								// result_png.data[idx+3] = 255;
								
								result_png.data[idx] = old_png.data[idx];
								result_png.data[idx+1] = old_png.data[idx+1];
								result_png.data[idx+2] = old_png.data[idx+2];
								result_png.data[idx+3] = 255;
								
								
								
								
						}
						else{
								result_png.data[idx] = 255;
								result_png.data[idx+1] = 10;
								result_png.data[idx+2] = 10;
								result_png.data[idx+3] = 255;
							
						}							
								
							}
					}
		
		
			
				
				sendImage(result_png,res,'\nImages xcombined\n');
				
				return;
		
		
		
		
		
	}


			
			
			
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
						
						
						if(
								(big_image.data[new_idx1]==old_png.data[idx])&&
								(big_image.data[new_idx1+1]==old_png.data[idx+1])&&
								(big_image.data[new_idx1+2]==old_png.data[idx+2])
						)
						{
												
								result_png.data[idx] = big_image.data[new_idx1];
								result_png.data[idx+1] = big_image.data[new_idx1+1];
								result_png.data[idx+2] = big_image.data[new_idx1+2];
								result_png.data[idx+3] = 255;
						}
						else{
								result_png.data[idx] = big_image.data[new_idx1];
								result_png.data[idx+1] = big_image.data[new_idx1+1];
								result_png.data[idx+2] = big_image.data[new_idx1+2];
								result_png.data[idx+3] = 255;
							
						}							
								
								
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
								
								var idx2 = (old_png.width * n + m) << 2;
						
									if(
								(big_image.data[new_idx1]==old_png.data[idx2])&&
								(big_image.data[new_idx1+1]==old_png.data[idx2+1])&&
								(big_image.data[new_idx1+2]==old_png.data[idx2+2])
						)
						{
												
								result_png.data[idx] = big_image.data[idx];
								result_png.data[idx+1] = big_image.data[idx+1];
								result_png.data[idx+2] = big_image.data[idx+2];
								result_png.data[idx+3] = 255;
						}
						else{
								result_png.data[idx] = old_png.data[idx2];
								result_png.data[idx+1] = old_png.data[idx2+1];
								result_png.data[idx+2] = old_png.data[idx2+2];
								result_png.data[idx+3] = 255;
							
						}		
								
								
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
				
						
				
				
				sendImage(result_png,res,'\nImages xcombined\n');
				
				
				
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
								
								result_png.data[idx+0] = big_image.data[idx2+0];
								result_png.data[idx+1] = big_image.data[idx2+1];
								result_png.data[idx+2] = big_image.data[idx2+2];
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
								
								result_png.data[idx+0] = old_png.data[idx2+0];
								result_png.data[idx+1] = old_png.data[idx2+1];
								result_png.data[idx+2] = old_png.data[idx2+2];
								result_png.data[idx+3] = 255;
								
								
							}
							else
							{
								
								
								result_png.data[idx+0] = big_image.data[idx+0];
								result_png.data[idx+1] = big_image.data[idx+1];
								result_png.data[idx+2] = big_image.data[idx+2];
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
		var n = __getCountOfColors(this);	
if(n>500)
{
	res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("razn_colors(): error: > 500 colors found");
		req.connection.destroy();
		return;
	
	
}	
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
		
		if(big_image.width * small_image.width > 1600 || big_image.height *  small_image.height > 1600 )
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
app.post('/nonineth', nonineth);
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
app.post('/maximus', maximus );
app.post('/rotateff', rotateff );
app.post('/plus', plus );
app.post('/minus', minus );
app.post('/execute_script', execute_script );
app.post('/blackwhite', blackwhite );
app.post('/inverse', inverse );
app.post('/borderplus', borderplus );
app.post('/borderminus', borderminus );
//app.get('/get_color_for_pass', get_color_for_pass );
app.post('/rotate_ff', rotate_ff );
//app.get('/get_color_for_pass', get_color_for_pass );
app.post('/is_buzzy',is_buzzy);
app.get('/all_buzy_free',all_buzy_free);
app.post('/clear_stones',clear_stones);
app.get('/show_buzy',show_buzy);
app.get('/show_users',show_users);
app.post('/commit_labirints_changes',commit_labirints_changes);
app.post('/array_buffer_to_server',array_buffer_to_server);
app.post('/blob_to_server_and_echo_from_server',blob_to_server_and_echo_from_server);
app.post('/blob_from_server',blob_from_server);
app.post('/get_array_of_all_generated_stones',get_array_of_all_generated_stones);
app.post('/get_labirint_id', init_pixels );
app.post('/pixels', pixels );
app.post('/test245', test245 );
app.post('/right_pixels', right_pixels );
app.post('/add_boh_pixel', add_boh_pixel );
app.post('/get_qty_neighbours',get_qty_neighbours);
app.post('/set_collected_pixels',set_collected_pixels);	
app.post('/init_pixels', init_pixels );
app.post('/get_error_message', get_error_message );
app.post('/get_xy_labirint', get_xy_labirint);
//app.post('/init_boh_pixels', init_boh_pixels );
app.post('/init_labirint_settings', init_labirint_settings );
app.post('/get_chaosed_labirint',get_chaosed_labirint);
app.post('/get_collected', get_collected );
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


//var global_memory=[];

function array_buffer_to_server(req, res)
{
		
	var data=[];
	  req.on('data', function(chunk) {
        data.push(chunk); //data is an array of Buffers
    }).on('end', function() {
        
        var buffer = Buffer.concat(data);//make a new Buffer from array of Buffers(all of them together)
		console.log(buffer.length);
		
		/***
		
					var newpng = new PNG ( {
						
							width: 248,
							height: 248,
							filterType: 4
					} );
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = buffer[idx];
								newpng.data[idx+1] = buffer[idx+1];
								newpng.data[idx+2] = buffer[idx+2];;
								newpng.data[idx+3] = buffer[idx+3];;
								
								
						}
					}
					
			***/		
					
					// for(var j=0;j<10;j++)
					// {
						// for(var i=0;i<10;i++)
						// {
							
								
								// var idx = newpng.width * j + i << 2;
								
								// newpng.data[idx+0] = 0;
								// newpng.data[idx+1] = 0;
								// newpng.data[idx+2] = 0;
								// newpng.data[idx+3] = 255;
								
								
						// }
					// }
					
					
					//sendImage(newpng,res,'\nBlack square send');
					var md5 = generate_md5_id();	
					var obj = {};
		obj.id = md5;
		obj.png = buffer;
		global_memory.push(obj);
		
		
		console.log('\nIn blob_to_server(...)\nin memory we store buffer\n(and we need w&h for transform to png)\nid of obj='+md5+'\nindex in global_memory unknown');
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(""+md5);
		
    });
	
				
}


function blob_to_server_and_echo_from_server(req, res)
{
	//
	//  from client
	///
	// var data = new Uint8Array([
  // 137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,8,0,0,
  // 0,8,8,2,0,0,0,75,109,41,220,0,0,0,34,73,68,65,84,8,215,99,120,
  // 173,168,135,21,49,0,241,255,15,90,104,8,33,129,83,7,97,163,136,
  // 214,129,93,2,43,2,0,181,31,90,179,225,252,176,37,0,0,0,0,73,69,
  // 78,68,174,66,96,130]);
// var blob = new Blob([data], { type: "image/png" });
// var url = URL.createObjectURL(blob);
// var img = new Image();
// img.src = url;
// console.log("data length: " + data.length);
// console.log("url: " + url);
// document.body.appendChild(img);
///	
///img { width: 100px; height: 100px; image-rendering: pixelated; }
///	
	
	
	// var big_image = new PNG({filterType: 4});
	
	// req.pipe(big_image).on('parsed', function() {
		
		
		// sendImage(big_image,res,'\nImage got and echoed\n');
		
		
		
	// });
	
	
	
	
	
	var data=[];
	  req.on('data', function(chunk) {
        data.push(chunk);
    }).on('end', function() {
        //at this point data is an array of Buffers
        //so Buffer.concat() can make us a new Buffer
        //of all of them together
        var buffer = Buffer.concat(data);
		console.log(buffer.length);
		//var s='';
		//for(var i=0;i<2500;i++){s+='[';for(var j=0;j<4;j++)s+=buffer[i*4+j]+',';s+=']\n';} console.log(s);
        //console.log(buffer.toString('base64'));
		
		
					var newpng = new PNG ( {
						
							width: 248,
							height: 248,
							filterType: 4
					} );
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = buffer[idx];
								newpng.data[idx+1] = buffer[idx+1];
								newpng.data[idx+2] = buffer[idx+2];;
								newpng.data[idx+3] = buffer[idx+3];;
								
								
						}
					}
					
					for(var j=0;j<10;j++)
					{
						for(var i=0;i<10;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = 0;
								newpng.data[idx+1] = 0;
								newpng.data[idx+2] = 0;
								newpng.data[idx+3] = 255;
								
								
						}
					}
					
					
					sendImage(newpng,res,'\nBlack square send');
							
		
    });
	
	
	
	// var reader = fs.createReadStream();
	// reader.readAsArrayBuffer(req.body);
	
 // reader.addEventListener("loadend", function() {
	// var s='';
   // for(var i=0;i<40;i++)s+=''+reader.result[i]; console.log(s);
 // });
	
	// reader.on('readable', function(){
		// var data = reader.read();
		// console.log('['+data+']');
	// });
	
	// req.pipe(reader).on('end', function(){
		// console.log("THE END");
	// });
	
	/*****************
	req.pipe(reader).on( 'parsed', function()  {
		
	});
	
// reader.addEventListener("loadend", function() {
	
// });
// reader.readAsArrayBuffer(req.body);
	
	var png = new PNG({filterType: 4});
	req.pipe(png).on( 'parsed', function()  {
		
	
		var md5 = generate_md5_id();
		//var obj2 ={};
		//obj2.width=this.width;
		//obj2.height=this.height;
		
			// var arr=[];
						// for(var j=0;j<this.height;j++)
						// {
							// for(var i=0;i<this.width;i++)
							// {
								// var idx = (this.width * j + i) << 2;	
							
								
								// arr.push(this.data[idx]);
								// arr.push(this.data[idx+1]);
								// arr.push(this.data[idx+2]);
								// arr.push(this.data[idx+3]);
							// }
						// }
		
		
		
		
		
		//obj2.data=arr;
		var obj = {};
		obj.id = md5;
		obj.img= png;
		global_memory.push(obj);
		
		
		console.log('\nIn blob_to_server(...)\nin memory (this is not index)md5='+md5);
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(""+md5);
		
					
	});				
	******************/				
}


function test245(req, res)
{

	var data=[];
	  req.on('data', function(chunk) {
        data.push(chunk); //data is an array of Buffers
    }).on('end', function() {
        //at this point 
        //we can make a new Buffer of all of them 
        var buffer = Buffer.concat(data);
		console.log(buffer.length);
		
		
		var newpng = createPNGfromBuffer(248,248,buffer);
					
					for(var j=0;j<10;j++)
					{
						for(var i=0;i<10;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = 0;
								newpng.data[idx+1] = 0;
								newpng.data[idx+2] = 0;
								newpng.data[idx+3] = 255;
								
								
						}
					}
				
					var buffer2 = createBufferfromPNG(newpng);
					
					sendImage( createPNGfromBuffer(248,248,buffer2),res,'\nDuble of Black square send');
							
		
    });
	
	
	
}



function blob_from_server(req, res)
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
				res.end("blob_from_server: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
					
		
			var post = qs.parse(body);
			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('blob_from_server:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('blob_from_server:error:  not found obj with this md5:'+md5);
				req.connection.destroy();
				return;
			}
		
			var obj = glob_labirint_memory[ind];
			//console.log(obj);
			var pixelsPro_pg_main_image= get_main_image(obj);
			//console.log("----------------->  "+pixelsPro_pg_main_image);
			if(pixelsPro_pg_main_image==null)
			{
				
					console.log('blob_from_server:error: may be white');
					res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('blob_from_server:error: may be white');
					req.connection.destroy();
					return;
				
			}
		
		console.log('\nIn blob_from_server(...)\nmd5='+md5);
		
		sendImage(pixelsPro_pg_main_image,res,'\nLast version send');
					
	});				
					
}

function get_main_image(obj)
{
	var id = obj.glob_pixelsPro_pg_main_image_id;
	
	var buf = get_array_buffer_by_id(id);
	
	var ind = get_index_of_main_image(id);
	
	return createPNGfromBuffer(global_patterns_objects_array[ind].width, global_patterns_objects_array[ind].height, buf);
}

function all_buzy_free(req,res)
{
	 global_buzy_object = null;
}

var global_buzy_object = null;
function is_buzy(pat_id,set_id)
{
	if(global_buzy_object==null) { global_buzy_object = [{ pat_id:pat_id,set_id:set_id,buzy:false }]; return false; }
	else if(global_buzy_object.length==0) { global_buzy_object.push({ pat_id:pat_id,set_id:set_id,buzy:false }); return false; }
	else {
		
		for(var i=0;i<global_buzy_object.length;i++)
		{
			if(global_buzy_object[i].buzy)
			{
				if(global_buzy_object[i].pat_id==pat_id)
				{
					if(global_buzy_object[i].set_id!=set_id) return true;
					
					global_buzy_object[i].buzy=false; //we yesterday buzy this channel and now free it
					
					return false; 
				}
			}
		}
		
		for(var i=0;i<global_buzy_object.length;i++)
		{
			
				if(global_buzy_object[i].pat_id==pat_id)
				{
					if(global_buzy_object[i].set_id==set_id) return false;
					
				}
			
		}
		
		global_buzy_object.push({ pat_id:pat_id,set_id:set_id,buzy:false });
		return false;
	}
}

function clear_buzy(pat_id,set_id)
{
	for(var i=0;i<global_buzy_object.length;i++)
	{
		if(global_buzy_object[i].pat_id==pat_id)
		{
			if(global_buzy_object[i].set_id==set_id) {

				//console.log();
				global_buzy_object[i].buzy=false;
				return;
			
			}
			
		}
	}
}
function show_users(req,res)
{
	var s='<div class="flex_container">';
	for(var i=0;i<glob_labirint_memory.length;i++)
	{
		
		s+='<div>'+glob_labirint_memory[i].id+'</div>'+'<div>Image ID: '+glob_labirint_memory[i].glob_pixelsPro_pg_main_image_id+'</div>';
		
		
	}
	s+='</div>';
	res.writeHead( 200, { 'Content-Type':'text/plain' } );
			res.end(""+s);
}

function show_buzy(req,res)
{
	var s='<div class="flex_container">';
	if(global_buzy_object==null){}
	else
	{
	
	for(var i=0;i<global_buzy_object.length;i++)
	{
		
		s+='<div>'+global_buzy_object[i].pat_id+'</div>'+'<div>'+global_buzy_object[i].set_id+'</div>';
		
		
	}
	}
	s+='</div>';
	
	
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
			res.end(""+s);
		
}

function is_buzzy(req,res)
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
				res.end("is_buzzy: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
					
		
			var post = qs.parse(body);
			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('is_buzzy:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('is_buzzy:error:  not found obj with this md5:'+md5);
				req.connection.destroy();
				return;
			}
		
			var obj = glob_labirint_memory[ind];
			var buzy = is_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id);	

				
			//console.log('\nIn is_buzzy(...)\nmd5='+obj.id+'\nresult='+buzy);
			res.writeHead( 200, { 'Content-Type':'text/plain' } );
			res.end(""+buzy);
		
			
		});
}

function commit_labirints_changes(req, res)
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
				res.end("commit_labirints_changes: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
		
			var post = qs.parse(body);
			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('commit_labirints_changes:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('commit_labirints_changes:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
			var nm1 =  post['data_id'];
			console.log('nm1='+nm1);
			// console.log(global_memory[nm1]);
			//now we can to check semaphorus of right access
			if(is_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id)==false)
			{
					var pixelsPro_pg_main_image= get_main_image(obj);;
					if(pixelsPro_pg_main_image==null)
					{
						
						console.log('commit_labirints_changes:error: may be white');
						res.writeHead( 500, { 'Content-Type':'text/plain' } );
						res.end('get_chaosed_labirint:error: may be white');
						req.connection.destroy();
						return;
						
					}
					else
					{
						if(combo_old_main_image_and_changed_main_image(obj.glob_pixelsPro_pg_main_image_id,nm1))
						//if(set_buffer_by_id(obj.glob_pixelsPro_pg_main_image_id,nm1))
						{
						clear_buzy(obj.glob_pixelsPro_pg_main_image_id,obj.id);
						console.log(global_buzy_object);
						console.log("changes commited");
						
						res.writeHead( 200, { 'Content-Type':'text/plain' } );
						res.end("changes commited");
						}
						else{
							console.log('commit_labirints_changes:error: something wrong');
						res.writeHead( 500, { 'Content-Type':'text/plain' } );
						res.end('commit_labirints_changes:error: may be white');
						req.connection.destroy();
						return;
							
						}
					}
			}
			
		});
	
	
	
	
	
}

////////////////////////////////////////////
var glob_labirint_memory=[]; 
var global_patterns_objects_array=[];
////////////////////////////////////////////
function get_index_of_main_image(main_image_id)
{
	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
		if(obj.id==main_image_id) return i;
		
	}
	return null;
}

function get_array_buffer_by_id(main_image_id)
{
	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
		if(obj.count<5) 
		{
			
			if(obj.id==main_image_id) return obj.png;
			
			
		}
		
	}
	return null;
}
function createBufferfromPNG(newpng)
{
	
	var buffer = new ArrayBuffer(newpng.width*newpng.height*4);
	var buf8 = new Uint8ClampedArray(buffer);
	
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								buffer[idx]=newpng.data[idx+0];
								buffer[idx+1]=newpng.data[idx+1];
								buffer[idx+2]=newpng.data[idx+2];
								buffer[idx+3]=newpng.data[idx+3];
								
								
						}
					}
					
					return buffer;
}

function createPNGfromBuffer(w,h,buffer)
{
	var newpng = new PNG ( {
						
							width: w,
							height: h,
							filterType: 4
					} );
					
		
					for(var j=0;j<newpng.height;j++)
					{
						for(var i=0;i<newpng.width;i++)
						{
							
								
								var idx = newpng.width * j + i << 2;
								
								newpng.data[idx+0] = buffer[idx];
								newpng.data[idx+1] = buffer[idx+1];
								newpng.data[idx+2] = buffer[idx+2];;
								newpng.data[idx+3] = buffer[idx+3];;
								
								
						}
					}
					
					return newpng;
}

function colors_equals(old_png,idx,new_png,idx)
{
	if(  
			(old_png.data[idx] == new_png.data[idx]) &&
			(old_png.data[idx+1] == new_png.data[idx+1]) &&
			(old_png.data[idx+2] == new_png.data[idx+2]) &&
			(old_png.data[idx+3] == new_png.data[idx+3])
	)
	{
		return true;
	}
	
	return false;
}

function is_white(old_png,idx)
{
	if(  
			(old_png.data[idx] == 255) &&
			(old_png.data[idx+1] == 255) &&
			(old_png.data[idx+2] == 255) &&
			(old_png.data[idx+3] == 255)
	)
	{
		return true;
	}
	
	return false;
}

function combo_by_white_two_array_buffers(old_ab,new_ab,w,h)
{
	var old_png = createPNGfromBuffer(w,h,old_ab);
	var new_png = createPNGfromBuffer(w,h,new_ab);
	var result_png = new PNG ( {
						
							width: w,
							height: h,
							filterType: 4
					} );
					
		
					for(var j=0;j<result_png.height;j++)
					{
						for(var i=0;i<result_png.width;i++)
						{
							
								
								var idx = result_png.width * j + i << 2;
								if(colors_equals(old_png,idx,new_png,idx)==false)
								{
									if(is_white(old_png,idx))
									{
										result_png.data[idx] = old_png.data[idx];
										result_png.data[idx+1] = old_png.data[idx+1];
										result_png.data[idx+2] = old_png.data[idx+2];
										result_png.data[idx+3] = old_png.data[idx+3];
									}
									else if(is_white(new_png,idx))
									{
										result_png.data[idx] = new_png.data[idx];
										result_png.data[idx+1] = new_png.data[idx+1];
										result_png.data[idx+2] = new_png.data[idx+2];
										result_png.data[idx+3] = new_png.data[idx+3];
									}
									else
									{
										result_png.data[idx] = 0;
										result_png.data[idx+1] = 0;
										result_png.data[idx+2] = 0;
										result_png.data[idx+3] = 255;
									}
								}
								else
								{
									result_png.data[idx] = new_png.data[idx];
									result_png.data[idx+1] = new_png.data[idx+1];
									result_png.data[idx+2] = new_png.data[idx+2];
									result_png.data[idx+3] = new_png.data[idx+3];
								}
								
								
						}
					}
					
					return createBufferfromPNG(result_png);
}



function combo_old_main_image_and_changed_main_image(where_png_id,in_memory_id)
{

	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
			
		if(obj.id==where_png_id) {
			//now we found older main as buffer
			
					var ind=isDataPNGObjectByMD5(in_memory_id);
					if(ind!=null)
					{
			
						obj.png=combo_by_white_two_array_buffers(obj.png,global_memory[ind].png,obj.width,obj.height); //we buffer have here, newest buffer
						
						global_patterns_objects_array[i]=obj;
						
						
						return true;
					}
					else
					{
						console.log("combo_old_main_image_and_changed_main_image:in global_memory not found object with id:"+in_memory_id);
						return false;
					}
			
			}
		
	}
	
	
	return false;
}










function set_buffer_by_id(where_png_id,in_memory_id)
{

	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
			
		if(obj.id==where_png_id) {
			
			
					var ind=isDataPNGObjectByMD5(in_memory_id);
					if(ind!=null)
					{
						//	obj.width=	 //old value or unknown
						//	obj.height=		//old value or unknown			
						obj.png = global_memory[ind].png; //we buffer have here
						return true;
					}
					else
					{
						console.log("set_buffer_by_id:in global_memory not found object with id:"+in_memory_id);
						return false;
					}
			
			}
		
	}
	
	
	return false;
}

function check_is_not_white(png)
{
	return true; //not white
}	
	
function  get_allowed_pattern_id()
{
	var ind=null;
	for(var i=0;i<global_patterns_objects_array.length;i++)
	{
		var obj = global_patterns_objects_array[i];
		if(obj.white) continue;
		if(obj.count<5)
		{
			ind=i; 
			break;
		}
		
	}
	//////////////
	//splice from global_patterns_objects_array all whole white
	/////////////////
	if(ind==null)
	{
		
		var obj = {};
		obj.id=generate_md5_id();
		obj.count=1;
		obj.white=false;
		var rnd='number of pattern schema';
		var png = generate_new_pattern(rnd); //new PNG({filterType: 4});
		if(png == null) return null;
		
		obj.width = png.width;
		obj.height = png.height;
		
		obj.png=createBufferfromPNG(png);
		global_patterns_objects_array.push(obj);
		
		return obj.id;
	}
	
	
	return global_patterns_objects_array[ind].id;
	
}






function __execute_script(commands)
{
	console.log('In __execute_script:');
		
	var arr = commands.split(",");
	var res_png=null;
	res_png = new PNG({filterType: 4});
		
	
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=arr[i].trim();
		console.log("executing ["+arr[i]+"]"); 
		
		if(arr[i].indexOf("generate random seed")===0)
		{
			var t = arr[i].replace("generate random seed",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=t.split(" ");
				if(params.length>0)
				{
					for(var ii=0;ii<params.length;ii++) params[ii]=Number(params[ii]);
					
				}
				else
				{
					params =[15,3];
				}
			}
			else
			{
				params =[15,3];
			}
			res_png = mod_generate_random_seed.generate_random_seed(params);
			
			
		}
		else if(arr[i]=="median")
		{
			
			res_png = mod_median.__median(res_png);
			
		}
		else if(arr[i].indexOf("magik rotate")===0)
		{
			var t = arr[i].replace("magik rotate",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=Number(t);
				
			}
			else
			{
				params =1;
			}
			res_png = mod_magik_rotate.magik_rotate(res_png,params);
			
		}
		else if(arr[i]=="up")
		{
			res_png = mod_up.upForImageData(res_png);
		}
		else if(arr[i]=="smooth")
		{
			
			res_png = mod_smooth.smooth(res_png);
			
		}
		else if(arr[i]=="rotate plus 45")
		{
			res_png = mod_rotate_ff.rotate_ff(res_png);
		}
		else if(arr[i]=="paint over")
		{
		
			res_png = mod_paint_over.paint_over(res_png);
		
		}
		else if(arr[i]=="nineth")
		{
		
			res_png = mod_nineth.nineth(res_png);
		
		}
		else if(arr[i]=="nonineth")
		{
		
			res_png = mod_nineth.nonineth(res_png);
		
		}
		else if(arr[i]=="maximus")
		{
		
			res_png = mod_maximus.maximus(res_png);
		
		}
		else if(arr[i]=="plus")
		{
			if(res_png.width * 2 > 1200 || res_png.height * 2 > 1200 )
			{
				
				
				return null;
				
			}
			
			res_png = __plus(res_png);
			
			
		}
		
		else if(arr[i]=="mirror right")
		{
			if(res_png.width * 2 > 1200  )
			{
				
				
				return null;
				
			}
			
			res_png = mod_mirror.mirror_right(res_png);
			
			
			
		}
		else if(arr[i]=="mirror down")
		{
			
			if( res_png.height * 2 > 1200 )
			{
				
				
				return null;
				
			}
			
			res_png = mod_mirror.mirror_down(res_png);
			
			
		}
		
		else if(arr[i]=="axes minus")
		{
		
		
		
			res_png = mod_axes.bothAxesMinus(res_png);
		
		
		
		}
		
		
	}
	
	return res_png;
	
}

function generate_new_pattern()
{
	var txt=[];
	txt[0] = "generate random seed 9 5, mirror right, mirror down, axes minus, axes minus, mirror right, mirror down, axes minus, plus,plus,plus,median,rotate plus 45,median,plus";
	
	return __execute_script(txt[0]);
	
	
}


function pixelsPro_array_equals(color,color2)
{
	for (var i = 0;  i < color.length; i++) 
	{
		if(Number(color[i])!=Number(color2[i])) return false;
		
	}
	return true;
}




function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}
/***
function copy_image(oldpng)
{
	//console.log('\nIn copy_image(...)\n');
	
		
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
***/




function get_xy_labirint(request, response) {
	
	console.log(request.body);
	var md5 =  (''+request.body['md5']).trim();
	
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('get_xy_labirint:error: not found obj with this md5:'+md5);
				response.writeHead( 500, { 'Content-Type':'text/plain' } );
					response.end('get_xy_labirint:error:  not found obj with this md5:'+md5);
					request.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
	
	response.writeHead(200, {  'Content-Type': 'text/html' } );
	response.end('{"x":'+obj.glob_pixelsPro_x_left_top+',"y":'+obj.glob_pixelsPro_y_left_top+',"nn":'+obj.glob_pixelsPro_pg_pixels_scale+'}');
}





function get_array_of_all_generated_stones(request, response) {

console.log(request.body);
	//var md5 =  post['md5'];
	var md5 =  (''+request.body['md5']).trim();
	
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('get_array_of_all_generated_stones:error: not found obj with this md5:'+md5);
				response.writeHead( 500, { 'Content-Type':'text/plain' } );
					response.end('get_array_of_all_generated_stones:error:  not found obj with this md5:'+md5);
					request.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];

	response.writeHead(200, {  'Content-Type': 'text/html' } );
	var res=JSON.stringify(obj.global_inside_stones);
	response.end(res);
}

function get_chaosed_labirint(req, res)
{
	
	console.log('\nIn get_chaosed_labirint(...)\n');
	console.log(req.body);
		//var md5 =  post['md5'];
		var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('get_chaosed_labirint:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('get_chaosed_labirint:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
	
	var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				
				console.log('get_chaosed_labirint:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('get_chaosed_labirint:error: may be white');
					req.connection.destroy();
					return;
				
			}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
	pixelsPro_pg_main_image = setChaosPixels(obj);
				
	sendImage(obj.copy_image(pixelsPro_pg_main_image), res, '\n get_chaosed_labirint ok\n');	
}

// function init_boh_pixels(req, res)
// {
	// console.log('\nIn init_boh_pixels(...)\n');
	
		// if(glob_pixelsPro_pg_main_image==null)
		// {
			
			
		// }
		// else
		// {
			
			
			// var newpng = new PNG(
			// {
				// width: glob_pixelsPro_pg_main_image.width,
				// height: glob_pixelsPro_pg_main_image.height,
				// filterType: 4
			// });
			
			// for(var i=0;i<glob_pixelsPro_pg_main_image.width;i++)
			// {
				// for(var j=0;j<glob_pixelsPro_pg_main_image.height;j++)
				// {
					
					// var index2 = glob_pixelsPro_pg_main_image.width * j + i << 2;
					
					// newpng.data[index2+0] = 127;
					// newpng.data[index2+1] = 127;
					// newpng.data[index2+2] = 127;
					// newpng.data[index2+3] = 255;
					
					
				// }
			// }	
			// global_karman_stones=[];
			// global_inside_stones=[];
			// var w = glob_pixelsPro_pg_main_image.width;
			// var h = glob_pixelsPro_pg_main_image.height;
			// var n=glob_num_of_strawbery;
			// for(var i=0;i<n;i++)
			// {
				// var rx = getRandomInt(0, w);
				// var ry = getRandomInt(0, h);
				// var rgba = getRndColor();
				// var ind = ry*w + rx << 2;
				// newpng.data[ind] = rgba[0];
				// newpng.data[ind+1] = rgba[1];
				// newpng.data[ind+2] = rgba[2];
				// newpng.data[ind+3] = rgba[3];
				// if(stone_in_array(rx,ry,rgba)==false)
				// addStone(rx,ry,cloneColor(rgba),global_inside_stones);
			// }
	
		
		// }
		
		// glob_pixelsPro_pg_boh_image = newpng;
		
		// /***
		// var x=glob_pixelsPro_x_left_top;
		// var y=glob_pixelsPro_y_left_top;
		
		// var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
				// var color = [
					// glob_pixelsPro_pg_main_image.data[index],
					// glob_pixelsPro_pg_main_image.data[index+1],
					// glob_pixelsPro_pg_main_image.data[index+2],
					// glob_pixelsPro_pg_main_image.data[index+3]
				// ];
				// glob_pixelsPro_pg_main_color=color;
		// // res.writeHead( 200, { 'Content-Type':'text/plain' } );
		// // res.end("ok");
		// sendImage(glob_pixelsPro_pg_main_image,res,'\nLabirint initiation success\n');
		// ***/
		
				
					
// }

function add_boh_pixel(req, res)
{
	console.log('\nIn add_boh_pixel(...)\n');
	
		
			
			
			var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("add_boh_pixel: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
		
			var post = qs.parse(body);
			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('add_boh_pixel:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('add_boh_pixel:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
			
		
			var x =  +post['x'];
			var y =  +post['y'];
			var nx=6;
			var ny=6;
			console.log("x="+x);
			console.log("y="+y);
			obj.glob_pixelsPro_x_left_top=x;
			obj.glob_pixelsPro_y_left_top=y;
			 // +post['scale_koeficient'];
			var nn = obj.glob_pixelsPro_pg_pixels_scale;//=nn;
			obj.glob_num_of_strawbery =  +post['num_of_strawbery'];
			
			
			
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				console.log('add_boh_pixel:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('add_boh_pixel:error: may be white');
					req.connection.destroy();
					return;
			}
			obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
			
			
			var newpng = new PNG(
			{
				width: pixelsPro_pg_main_image.width,
				height: pixelsPro_pg_main_image.height,
				filterType: 4
			});
			
			for(var i=0;i<pixelsPro_pg_main_image.width;i++)
			{
				for(var j=0;j<pixelsPro_pg_main_image.height;j++)
				{
					
					var index2 = pixelsPro_pg_main_image.width * j + i << 2;
					
					newpng.data[index2+0] = 127;
					newpng.data[index2+1] = 127;
					newpng.data[index2+2] = 127;
					newpng.data[index2+3] = 255;
					
					
				}
			}	
			//global_karman_stones=[];
			//global_inside_stones=[];
			var w = pixelsPro_pg_main_image.width;
			var h = pixelsPro_pg_main_image.height;
			var n=obj.glob_num_of_strawbery;
			
			var rgba = getRndColor();
				var ind = (y+1)*w + x << 2;
				newpng.data[ind] = rgba[0];
				newpng.data[ind+1] = rgba[1];
				newpng.data[ind+2] = rgba[2];
				newpng.data[ind+3] = rgba[3];
				if(stone_in_array(obj,x,y+1,rgba)==false)
				addStone(obj,x,y+1,cloneColor(rgba),obj.global_inside_stones);
			
			
			
			
			
			
			
			for(var i=1;i<n;i++)
			{
				var kx = getRandomInt(0, 2);
				var ky = getRandomInt(0, 2);
				if(kx==0)kx=-1;
				if(ky==0)ky=-1;
				var rx = getRandomInt(2, nx)*kx+x;
				var ry = getRandomInt(2, ny)*ky+y;
				var rgba = getRndColor();
				var ind = ry*w + rx << 2;
				newpng.data[ind] = rgba[0];
				newpng.data[ind+1] = rgba[1];
				newpng.data[ind+2] = rgba[2];
				newpng.data[ind+3] = rgba[3];
				if(stone_in_array(obj,rx,ry,rgba)==false)
				addStone(obj,rx,ry,cloneColor(rgba),obj.global_inside_stones);
			}
	
			obj.glob_pixelsPro_pg_boh_image = newpng;
		
		
			pixelsPro_pg_main_image = setChaosPixels(obj);
				
			var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
								
			sendImage(result_png, res, '\nLabirint initiation step 2 success\n');	
			
			
			
			
			
			
			
		});
			
			
			
		
		
		
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


function clear_stones(req, res)
{
		console.log('\nIn clear_stones(...)\n');
		
		var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("clear_stones: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
		
			var post = qs.parse(body);
			
			
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('clear_stones:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('clear_stones:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
			
			if(obj.global_inside_stones.length==0)
			{console.log('\nIn clear_stones(...)');
				obj.number_of_collected_stones=obj.global_karman_stones.length;
				obj.global_karman_stones=[];
				obj.global_inside_stones=[];
				glob_labirint_memory[ind]=obj;
			}
			
			
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end('counted');
			
			
			
			
		});	
			
}




function stone_in_array(obj,rx,ry,rgba)
{
	for(var n=0;n<obj.global_inside_stones.length;n++)
	{
		
		var i=obj.global_inside_stones[n].x;
		var j=obj.global_inside_stones[n].y;
		var c=obj.global_inside_stones[n].color;
		if((i==rx)&&(j==ry))
		{
			
			if(pixelsPro_array_equals(c,rgba))return true;
		}
	}
		return false;		
}



			
function pixelsPro_getNeighborsColorsAllArray(obj,x,y,pixelsPro_pg_main_image)
{
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	var colors=[];
	//if(color==undefined)colors.push(color);
	
	
		var index = pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
				
	 colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];

				colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
	 colors.push(color);
				
				index = pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				
		 colors.push(color);
				
				//color=glob_pixelsPro_pg_main_color;
				
				var grey_color = [127,127,127,255];
				
				for(var i=0;i<colors.length;i++)
				{
					// if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					// {
						
						// colors.splice(i,1);
						// break;
						
					// }
					
					if(pixelsPro_array_equals(colors[i],grey_color)) colors.splice(i,1);
				}
				
				return colors;
	
}



			
function pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image)
{
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	var colors=[];
	//if(color==undefined)colors.push(color);
	
	
		var index = pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
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
				
				index = pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
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
				
				index = pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
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
				
				index = pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
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
				
				//color=glob_pixelsPro_pg_main_color;
				
				var grey_color = [127,127,127,255];
				
				for(var i=0;i<colors.length;i++)
				{
					// if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					// {
						
						// colors.splice(i,1);
						// break;
						
					// }
					
					if(pixelsPro_array_equals(colors[i],grey_color)) colors.splice(i,1);
				}
				
				return colors;
	
}

// function define_color_for_pass(x,y,color)
// {
	// var colors = pixelsPro_getNeighborsColors(x,y,color);
	// if(colors.length==0) return [];
	// return colors[getRandomInt(0,colors.length)];
// }

// function get_color_for_pass(req, res)
// {
	// if(glob_pixelsPro_color_for_pass.length==0) result_text='255,255,255,255';
	// else result_text=glob_pixelsPro_color_for_pass.join(",");
	// sendText(result_text, res, 'get_color_for_pass');
// }

function getIndexObjectByMD5(md5)
{
	
	for(var i=0;i<glob_labirint_memory.length;i++)
	{
		
		if(glob_labirint_memory[i].id===md5)
		{
			
			return i;
		}
	  
	}
	return null;
	
}

function generate_md5_id()
{
	
	var d = new Date();
	var ms = d.getTime();
	var s = '';
	var arr = ['a','b','c','d','e','f','g','h','i','j','K','L','M','N','O','P',')','[',']',')','0','4','7'];
	for(var i=0;i<16;i++)
	{
		var rnd=Math.floor(Math.random() * (arr.length - 0)) + 0;
		
		s += arr[rnd];
	}
	return get_md5_hex(''+s+''+ms);
	
}

function init_pixels(req, res)
{
	console.log('\nIn init_pixels(...)\n');
	
	
	var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 99)
			{
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("init_pixels: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
				
			var post = qs.parse(body);
			var md5 =  post['md5'];
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{

	/////////////////////////////////////////
	//create_glob_labirint_memory_object();
	/////////////////////////////////////////
	
	var obj = {};
	obj.id = generate_md5_id();
	obj.glob_pixelsPro_x_left_top = 0;
	obj.glob_pixelsPro_y_left_top = 0;
	obj.glob_pixelsPro_point = null;
	obj.glob_pixelsPro_collected = [];
	obj.glob_pixelsPro_pg_main_color = null;
	obj.glob_pixelsPro_showing_scale_div = false;
	obj.glob_pixelsPro_scale_div = null;
	obj.global_karman_stones=[];
	obj.global_inside_stones=[];
	obj.number_of_collected_stones=0;
	obj.glob_pixelsPro_errorMessage='none';
	obj.glob_pixelsPro_pg_boh_image = null;
	obj.glob_pixelsPro_pg_map_image = null;
	obj.glob_pixelsPro_pg_pixels_scale = 2;
	
	obj.copy_image = function(oldpng)
	{
		//console.log('\nIn copy_image(...)\n');
	
		
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
	
	obj.glob_pixelsPro_pg_main_image_id = get_allowed_pattern_id();
	console.log('init_pixels:obj.glob_pixelsPro_pg_main_image_id ='+obj.glob_pixelsPro_pg_main_image_id );	
	if(obj.glob_pixelsPro_pg_main_image_id==null)
	{
		res.writeHead( 500, { 'Content-Type':'text/plain' } );
		res.end("init_pixels: error: something wrong");
		req.connection.destroy();
		return;	
	}
	
	var pixelsPro_pg_main_image = get_main_image(obj);
	if(pixelsPro_pg_main_image==null)
			{
				console.log('init_pixels:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('init_pixels:error: may be white');
					req.connection.destroy();
					return;
			}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
	//req.pipe(obj.glob_pixelsPro_pg_main_image).on( 'parsed', function()  {
		
	
		var x=obj.glob_pixelsPro_x_left_top;
		var y=obj.glob_pixelsPro_y_left_top;
		
		var index = pixelsPro_pg_main_image.width * (y) + (x) << 2;
				var color = [
					pixelsPro_pg_main_image.data[index],
					pixelsPro_pg_main_image.data[index+1],
					pixelsPro_pg_main_image.data[index+2],
					pixelsPro_pg_main_image.data[index+3]
				];
				obj.glob_pixelsPro_pg_main_color=color;
				
				obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
				
				glob_labirint_memory.push(obj);
				
				ind = getIndexObjectByMD5(obj.id);		
			
				//obj.glob_pixelsPro_color_for_pass = obj.define_color_for_pass(x,y,color);
	
				
		}
			
		
				var obj = glob_labirint_memory[ind];
				
						
				res.writeHead( 200, { 'Content-Type':'text/plain' } );
				res.end(""+obj.id);	
						
				return;
			
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
				res.end("init_labirint_settings: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
		
			var post = qs.parse(body);
			
		var md5 =  post['md5'];
		var ind = getIndexObjectByMD5(md5);
		if(ind==null)
		{
			console.log('init_labirint_settings:error: not found obj with this md5:'+md5);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('init_labirint_settings:error:  not found obj with this md5:'+md5);
				req.connection.destroy();
				return;
		}
	
		var obj = glob_labirint_memory[ind];
		
		
		var pixelsPro_pg_main_image= get_main_image(obj);
		if(pixelsPro_pg_main_image==null)
		{
			console.log('init_labirint_settings:error: not found labirint with this md5:'+md5);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
			res.end('init_labirint_settings:error: not found labirint with this md5:'+md5);
			req.connection.destroy();
			return;
			
		}
		obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
		
			var x =  +post['x'];
			var y =  +post['y'];
			
			console.log("x="+x);
			console.log("y="+y);
			obj.glob_pixelsPro_x_left_top=x;
			obj.glob_pixelsPro_y_left_top=y;
			var nn =  +post['scale_koeficient'];
			obj.glob_pixelsPro_pg_pixels_scale = nn;
			obj.glob_num_of_strawbery =  +post['num_of_strawbery'];
				
				var newpng = new PNG(
			{
				width: pixelsPro_pg_main_image.width,
				height: pixelsPro_pg_main_image.height,
				filterType: 4
			});
			
			for(var i=0;i<pixelsPro_pg_main_image.width;i++)
			{
				for(var j=0;j<pixelsPro_pg_main_image.height;j++)
				{
					
					var index2 = pixelsPro_pg_main_image.width * j + i << 2;
					
					newpng.data[index2+0] = 127;
					newpng.data[index2+1] = 127;
					newpng.data[index2+2] = 127;
					newpng.data[index2+3] = 255;
					
					
				}
			}	
			obj.global_karman_stones=[];
			obj.global_inside_stones=[];
			var w = pixelsPro_pg_main_image.width;
			var h = pixelsPro_pg_main_image.height;
			var n=obj.glob_num_of_strawbery;
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
				if(stone_in_array(obj,rx,ry,rgba)==false)
				addStone(obj,rx,ry,cloneColor(rgba),obj.global_inside_stones);
			}
	
		
	
		
		obj.glob_pixelsPro_pg_boh_image = newpng;
	
			pixelsPro_pg_main_image = setChaosPixels(obj);
				
			var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
								
			sendImage(result_png, res, '\nLabirint initiation step 2 success\n');	
			
			
			
			
		});
		
	
					
}


function setChaosPixels(obj)
{
		
	var copy_map_image = obj.copy_image(obj.glob_pixelsPro_pg_map_image);
	
	
		
					for(var n=0;n<obj.global_inside_stones.length;n++)
					{
						
						var i=obj.global_inside_stones[n].x;
						var j=obj.global_inside_stones[n].y;
							
						var index = copy_map_image.width * j + i << 2;
						
						copy_map_image.data[index] = obj.global_inside_stones[n].color[0];
						copy_map_image.data[index+1] = obj.global_inside_stones[n].color[1];
						copy_map_image.data[index+2] = obj.global_inside_stones[n].color[2];
						copy_map_image.data[index+3] = obj.global_inside_stones[n].color[3];
						
					
				}
				
			
			return copy_map_image;
}


function get_error_message(req,res)	
{			

var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('get_error_message:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('get_error_message:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];


					
		console.log("\nIn get_error_message: "+obj.glob_pixelsPro_errorMessage);
		res.writeHead( 200, { 'Content-Type':'text/plain' } );
		res.end(""+obj.glob_pixelsPro_errorMessage);
		req.connection.destroy();
		obj.glob_pixelsPro_errorMessage='none';		
}

function get_qty_neighbours(req,res)	
{
		console.log("\nIn get_qty_neighbours: ");
		
		var body = '';

			req.on('data', function (data) {
				
				//console.log("when req.on data");
				
				body += data;

				// Too much POST data, kill the connection!
				// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				if (body.length > 99)
				{
					res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end("get_qty_neighbours: error: data.length > 99 too big");
					req.connection.destroy();
					return;
				}
				
			});

			req.on('end', function () {
				
				
				
				
				var post = qs.parse(body);
				var md5 = post['md5'];
				//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('get_qty_neighbours:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('get_qty_neighbours:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
				
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				console.log('get_qty_neighbours:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('get_qty_neighbours:error: may be white');
					req.connection.destroy();
					return;
			}
			obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);	
				
				console.log(post);
				
				var x =  +post['x'];
				var y =  +post['y'];
				
				
				
				console.log('Before: \n'+pixelsPro_pg_main_image.width);
				
				pixelsPro_pg_main_image = setChaosPixels(obj);
				console.log('After: \n'+pixelsPro_pg_main_image.width);
				console.log('-=7878=-');
				
				var arr = pixelsPro_getNeighborsColorsAllArray(obj,x,y,pixelsPro_pg_main_image);
				console.log("arr.length="+arr.length);
				
				res.writeHead(200, {  'Content-Type': 'text/html' } );
				var res0=JSON.stringify(arr);
				res.end(res0);
				
				req.connection.destroy();
				
				
			});
				
	
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
				res.end("pixels: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
			
			
			var post = qs.parse(body);
			
			
			var md5 = post['md5'];
			//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('pixels:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('pixels:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
			
			var pixelsPro_pg_main_image= get_main_image(obj);
				if(pixelsPro_pg_main_image==null)
				{
					
					console.log('pixels:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('pixels:error: may be white');
					req.connection.destroy();
					return;
					
				}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
			
			
			
			console.log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			
			
			
			pixelsPro_pg_main_image = setChaosPixels(obj);
			console.log('-=7878=-');
			
			
			
			if( is_color_ishodn(obj,pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image))==false)
			{
				console.log('-=7979=-');
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				
				obj.glob_pixelsPro_errorMessage='1. labirint not ok';
				sendImage(result_png, res, '\n1. labirint not ok\n');	
				
				return;
			}
			
			else if(x<0||x>=pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				
				obj.glob_pixelsPro_errorMessage='2. labirint not ok';
				sendImage(result_png, res, '\n2. labirint not ok\n');	
				
				return;
				
			}
			else if(y<0||y>=pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='3. labirint not ok';
				sendImage(result_png, res, '\n3. labirint not ok\n');	
				
				return;
			}
			
			
			
			
			
			var color_prev = pixelsPro_getColorArrayFromImageData(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
				if(pixelsPro_array_equals(color_prev,color)==false)
				{
					console.log('-=791791=-');
					
					
					
					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
						console.log('-=79999=-');
						if(stone_neighbours_of(obj,x,y)==0)
						{
							console.log('-=7988889=-');
							var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.27 stone_neighbours_of not ok';
								sendImage(result_png, res, '\n6.1.27 stone_neighbours_of not ok\n');	
							
							return;
						}
						else{
						
						console.log('-=7988fmhfvuff889=-');
						obj.glob_pixelsPro_x_left_top = x;
						obj.glob_pixelsPro_y_left_top = y;
						 
					
						obj.glob_pixelsPro_pg_main_color = color;
						
						pixelsPro_pg_main_image = setChaosPixels(obj);
			
						var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.255. labirint ok';
						sendImage(result_png, res, '\n6.1.255. labirint ok\n');	
						
						}
						
					}
					else
					{
					
						
								var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.25 labirint not ok';
								sendImage(result_png, res, '\n6.1.25 labirint not ok\n');	
					}
								
					
					return;
				}
			
			
			
			
			
			
			
			
			
			
			if((Math.abs(x-obj.glob_pixelsPro_x_left_top)>1)||(Math.abs(y-obj.glob_pixelsPro_y_left_top)>1)){
				
				// if(xy_is_near_karman_points(x,y)==false)
			
				
					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
						
						
						var color_prev = pixelsPro_getColorArrayFromImageData(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
						if(pixelsPro_array_equals(color_prev,color)==false)
						{
						
							
							var neh = pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image);
							console.log("neh.length="+neh.length);
							var f=false;
							for(var inh=0;inh<neh.length;inh++)
							{
								for(var in2=0;in2<obj.global_inside_stones.length;in2++)
								{
									if(pixelsPro_array_equals(obj.global_inside_stones[in2].color,neh[inh])==true) {f=true;break;}
								}
								if(f)break;
							}
							
							if(f==false)
							{
								var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='6.1.23 labirint not ok';
								sendImage(result_png, res, '\n6.1.23 labirint not ok\n');	
								
								return;
							}
							
							
						
						}
						else{
							
							
							
							
							
								
						obj.glob_pixelsPro_x_left_top = x;
						obj.glob_pixelsPro_y_left_top = y;
						 
						var color =  pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
						obj.glob_pixelsPro_pg_main_color = color;
			
						console.log("testing 8888.000");	

						
			
						pixelsPro_pg_main_image = setChaosPixels(obj);
						
						console.log("testing 8888.222");
						
						var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
						
						console.log("testing 8888.111");
						//obj.glob_pixelsPro_color_for_pass = define_color_for_pass(x,y,color);
				//		console.log("testing 222 "+glob_pixelsPro_color_for_pass);
				console.log("testing 8888.77777");
				obj.glob_pixelsPro_errorMessage='5. labirint ok';
						sendImage(result_png, res, '\n5. labirint ok\n');
							
							
							
						}
									
					
					}
					else
					{
						//var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						obj.glob_pixelsPro_errorMessage='6. labirint not ok';
						sendImage(result_png, res, '\n6. labirint not ok\n');	
					}
					return;
				}
				
			
				
				

					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
						
						
						
							
			var color_prev = pixelsPro_getColorArrayFromImageData(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
				if(pixelsPro_array_equals(color_prev,color)==false)
				{
					
					
					
					
					var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='6.4321 labirint not same colors';
						sendImage(result_png, res, '\n6.4321 labirint not same colors\n');	
					
					
					
					return;
					
					
					
				}
					
						
						
						obj.glob_pixelsPro_x_left_top = x;
						obj.glob_pixelsPro_y_left_top = y;
						 
					
						obj.glob_pixelsPro_pg_main_color = color;
						
						pixelsPro_pg_main_image = setChaosPixels(obj);
			
						var result_png = pixelsPro_redrawPixels_main(obj,x,y,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='5.7777ab labirint not ok';
						sendImage(result_png, res, '\n5.7777ab labirint not ok\n');	
					}
					else
					{
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='6.7777ab labirint not ok';
						sendImage(result_png, res, '\n6.7777ab labirint not ok\n');	
					}
				
			
			
		});
		
}

// function drakon()
// {
	// var colors = pixelsPro_getNeighborsColors(x,y,color);
	// //glob_pixelsPro_pg_main_image
// }






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
				res.end("right_pixels: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			
						
			var post = qs.parse(body);
			
			
			var md5 = post['md5'];
			//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('right_pixels:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('right_pixels:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var obj = glob_labirint_memory[ind];
			
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				
				console.log('right_pixels:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('right_pixels:error: may be white');
					req.connection.destroy();
					return;
				
			}
	obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);
			
			
			console.log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			var color = null;
			
			
			
				
			pixelsPro_pg_main_image = setChaosPixels(obj); 
			
			var neh = pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image);
			console.log("neh.length="+neh.length);
			
			var color = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
			if( post['color'] ) color = cloneColor( post['color'].split(',') );
			var color_on_place = pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image);
		
			
				
			
			if(x<0||x>=pixelsPro_pg_main_image.width) {
				console.log("y444");
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='1. chaos not ok';
				sendImage(result_png, res, '\n1. chaos not ok\n');	
				
				return;
				
			}
			else if(y<0||y>=pixelsPro_pg_main_image.height) {
				console.log("y15555");
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			obj.glob_pixelsPro_errorMessage='2. chaos not ok';
				sendImage(result_png, res, '\n2. chaos not ok\n');	
				
				return;
				
				
			}
			
			
			else	
			{
				if(is_color_ishodn(obj,color_on_place)==true)
				{
					
					
					
					 __set__collected__pixels(req,res,obj,x,y,color);
					return;
				
					
				}
				
			
				else
				{ 
				
					if(is_color_ishodn(obj,color_on_place)||is_color_in(getColors(obj.glob_pixelsPro_pg_map_image),color_on_place))
					{
						
						
						console.log("y1888");
						
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
					obj.glob_pixelsPro_errorMessage='3. chaos not ok';
						sendImage(result_png, res, '\n3. chaos not ok\n');	
						
						return;
				
					}
					
					var ctrlz = obj.copy_image(pixelsPro_pg_main_image);
					
					
							take_chaos(obj,x,y,color_on_place);	
									
							pixelsPro_pg_main_image = setChaosPixels(obj);
									
							var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
									
						var x2=x;
						var y2=y;
						
						x=obj.glob_pixelsPro_x_left_top;
						y=obj.glob_pixelsPro_y_left_top;
									
					if(left(obj,x,y,pixelsPro_pg_main_image)||right(obj,x,y,pixelsPro_pg_main_image)||floor(obj,x,y,pixelsPro_pg_main_image))
					{
					
							

						obj.glob_pixelsPro_errorMessage='4. chaos ok';
								
							sendImage(result_png, res, '\n4. chaose ok\n');
							
					}
					
					else{
						
						
						
						 throw_collected(obj,x2,y2,color_on_place);
						pixelsPro_pg_main_image=ctrlz;
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						obj.glob_pixelsPro_errorMessage='5. chaos not ok';
							sendImage(result_png, res, '\n5. chaos not ok\n');	
					}
					
					
				
				}
						
						
					
			}								
								
			
			
		});
		
}


function getColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			var colors = [];

			for (var y = 0; y < im0.data.length; y+=4) {
		
				
					
					var idx = y;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						colors.push(col); 
						obj[key]= true;
					
					}
					
					
				}
			
			
		//console.log ( "count="+colors.length);
			
			return colors;
}




function is_color_in(colors,color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(pixelsPro_array_equals(colors[i],color)) return true;
	}
	
	return false;
	
}

function is_color_ishodn(obj,color)
{
	var colors=getColors(obj.glob_pixelsPro_pg_map_image);
	
	for(var i=0;i<colors.length;i++)
	{
		if(pixelsPro_array_equals(color,colors[i])) return true;
	}
	
	return false;
	
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
				res.end("set_collected_pixels: error: data.length > 99 too big");
				req.connection.destroy();
				return;
			}
			
		});

		req.on('end', function () {
			
			var post = qs.parse(body);
			
			
			var md5 = post['md5'];
			//var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('set_collected_pixels:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('set_collected_pixels:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
	
	
			var obj = glob_labirint_memory[ind];
			
			
			
			//console.log("22");
			console.log(post);
			
			var x =  +post['x'];
			var y =  +post['y'];
			var color = post['color'].split(',');

			 __set__collected__pixels(req,res,obj,x,y,color);
				
			
			
		});
		
}

function __set__collected__pixels(req,res,obj,x,y,color)
{
			color=cloneColor(color);
			
			// console.log("x="+x);
			// console.log("y="+y);
			// console.log("color="+color);
			
			
			var pixelsPro_pg_main_image= get_main_image(obj);
			if(pixelsPro_pg_main_image==null)
			{
				
				console.log('set_collected_pixels:error: may be white');
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('set_collected_pixels:error: may be white');
					req.connection.destroy();
					return;
				
			}
			obj.glob_pixelsPro_pg_map_image = obj.copy_image(pixelsPro_pg_main_image);	
			
			pixelsPro_pg_main_image = setChaosPixels(obj);
			
			if(x<0||x>=pixelsPro_pg_main_image.width) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			
				sendImage(result_png, res, '\nset_collected_pixels not ok\n');	
				
			}
			else if(y<0||y>=pixelsPro_pg_main_image.height) {
				
				var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
			
				sendImage(result_png, res, '\nset_collected_pixels not ok\n');	
				
			}
			
			// else if((Math.abs(x-glob_pixelsPro_x_left_top)>1)||(Math.abs(y-glob_pixelsPro_y_left_top)>1)){
				
				// var result_png = pixelsPro_redrawPixels_main(glob_pixelsPro_x_left_top,glob_pixelsPro_y_left_top);
			
				// sendImage(result_png, res, '\n444.1 set_collected_pixels not ok\n');	
				
			// }
			
			else if(obj.global_karman_stones.length==0)
			{
				if((is_color_ishodn(obj,color)||is_color_in(getColors(obj.glob_pixelsPro_pg_map_image),color))==false)
				{
						take_chaos(obj,x,y,color);
				
				
						pixelsPro_pg_main_image = setChaosPixels(obj);
						
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						
						sendImage(result_png, res, '\ntake stone ok\n');	
						
				}
				
				else
				
				{
					
					
					
					
								var neh = pixelsPro_getNeighborsColors(obj,x,y,color,pixelsPro_pg_main_image);
							console.log("neh.length="+neh.length);
							var f=false;
							for(var inh=0;inh<neh.length;inh++)
							{
								for(var in2=0;in2<obj.global_inside_stones.length;in2++)
								{
									if(pixelsPro_array_equals(obj.global_inside_stones[in2].color,neh[inh])==true) {f=true;break;}
								}
								if(f)break;
							}
							
							if(f==false)
							{
								
					var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
				
					sendImage(result_png, res, '\n544.1 set_collected_pixels not ok\n');	
					
					
								return;
							}
							
					
					
					
					
					return;
					
					
					
					
				}
			}
			
			else
			{ 
				
						//glob_pixelsPro_pg_boh_image = 
						throw_collected(obj,x,y,color);	
						
						pixelsPro_pg_main_image = setChaosPixels(obj);
						
						var result_png = pixelsPro_redrawPixels_main(obj,obj.glob_pixelsPro_x_left_top,obj.glob_pixelsPro_y_left_top,pixelsPro_pg_main_image);
						
						sendImage(result_png, res, '\nset stone ok\n');	
						
						
				
			}
}

function get_collected(req, res)
{
	
	//var md5 = post['md5'];
			var md5 =  (''+req.body['md5']).trim();
		
			var ind = getIndexObjectByMD5(md5);
			if(ind==null)
			{
				console.log('get_collected:error: not found obj with this md5:'+md5);
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
					res.end('get_collected:error:  not found obj with this md5:'+md5);
					req.connection.destroy();
					return;
			}
		
			var objj = glob_labirint_memory[ind];
	
	
	var s='';
	for(var i=0;i<objj.glob_pixelsPro_collected.length;i++)
	{
		var obj = objj.glob_pixelsPro_collected[i];
		var rgba = 'rgba('+obj.color[0]+','+obj.color[1]+','+obj.color[2]+','+(obj.color[3]/255)+')';
		var idd = 'span_collected_pixels'+i;
		var attr_color=obj.color.join(',');
		s += '<span class=\'flex-item\' attr_color=\''+attr_color+'\' id=\''+idd;
		// s += '\' style=\'margin:2px;border:2px solid '+rgba+';width:20px;height:20px;display: inline-block;background-color: '+rgba+'\' >';
		s += '\' style=\'width:20px;height:20px;display: inline-block;background-color: '+rgba+'\' >';
		s += '</span>';
	}
	 
		  res.writeHead(200, {  'Content-Type': 'text/html' } );
		  res.end(s);

	
}

function throw_collected(objj,x,y,color)
{
	///////////////////////
	addStone(objj,x,y,color,objj.global_inside_stones);
	removeStone(objj,x,y,color,objj.global_karman_stones);
	///////////////////////
	for(var i=0;i<objj.glob_pixelsPro_collected.length;i++)
	{
		var obj = objj.glob_pixelsPro_collected[i];
		if( pixelsPro_array_equals(obj.color,color)==true )
		{
			objj.glob_pixelsPro_collected.splice(i,1);
			break;
		}
	}
	
	// var index2 = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	// glob_pixelsPro_pg_boh_image.data[index2] = color[0];
	// glob_pixelsPro_pg_boh_image.data[index2+1] = color[1];
	// glob_pixelsPro_pg_boh_image.data[index2+2] = color[2];
	// glob_pixelsPro_pg_boh_image.data[index2+3] = color[3];
	

	
	// return glob_pixelsPro_pg_boh_image;
}

function stone_neighbours_of(objj,x,y)
{
	var n=0;
	for(var i=0;i<objj.global_inside_stones.length;i++)
	{
		var obj = objj.global_inside_stones[i];
		if((Math.abs(Number(obj.x)-Number(x))<=1)&&(Math.abs(Number(obj.y)-Number(y))<=1)) n++;
		
	}
	return n;
}

function take_chaos(objj,x,y,color)
{
	// var color = [];
	// var index = glob_pixelsPro_pg_map_image.width * y + x << 2;
	// color[0] = glob_pixelsPro_pg_map_image.data[index];
	// color[1] = glob_pixelsPro_pg_map_image.data[index+1];
	// color[2] = glob_pixelsPro_pg_map_image.data[index+2];
	// color[3] = glob_pixelsPro_pg_map_image.data[index+3];
	
	// var color2 = [];
	// var index2 = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	// color2[0] = glob_pixelsPro_pg_boh_image.data[index2];
	// color2[1] = glob_pixelsPro_pg_boh_image.data[index2+1];
	// color2[2] = glob_pixelsPro_pg_boh_image.data[index2+2];
	// color2[3] = glob_pixelsPro_pg_boh_image.data[index2+3];
	
	var obj = {};
	obj.x = Number(x);
	obj.y = Number(y);
	obj.color = color;
	objj.glob_pixelsPro_collected.push(obj);
	
	////////////////////////
	addStone(objj,x,y,color,objj.global_karman_stones);
	removeStone(objj,x,y,color,objj.global_inside_stones);
	///////////////////////
	
	//var color = [];
	/***
	var index = glob_pixelsPro_pg_boh_image.width * y + x << 2;
	glob_pixelsPro_pg_boh_image.data[index]=color[0];
	glob_pixelsPro_pg_boh_image.data[index+1]=color[1];
	glob_pixelsPro_pg_boh_image.data[index+2]=color[2];
	glob_pixelsPro_pg_boh_image.data[index+3]=color[3];
	***/	
	// glob_pixelsPro_pg_boh_image.data[index]=127;
	// glob_pixelsPro_pg_boh_image.data[index+1]=127;
	// glob_pixelsPro_pg_boh_image.data[index+2]=127;
	// glob_pixelsPro_pg_boh_image.data[index+3]=255;
	
	// return glob_pixelsPro_pg_boh_image;
}

function cloneColor(color2)
{
	return [Number(color2[0]),Number(color2[1]),Number(color2[2]),Number(color2[3])];
}

function addStone(objj,x,y,color7,arr)
{
	arr.push({x:Number(x),y:Number(y),color:cloneColor(color7)});
	
}

function removeStone(objj,x,y,color,arr)
{
	for(var i=0;i<arr.length;i++)
	{
		if( pixelsPro_array_equals(arr[i].color,color)==true )
		{
			arr.splice(i,1);
			break;
		}
	}
}


// function is_grey(x,y)
// {
	// var color = [];
	// var index = glob_pixelsPro_pg_boh_image.width * y + x << 2;
					
					
					// color[0] = glob_pixelsPro_pg_boh_image.data[index];
					// color[1] = glob_pixelsPro_pg_boh_image.data[index+1];
					// color[2] = glob_pixelsPro_pg_boh_image.data[index+2];
					// color[3] = glob_pixelsPro_pg_boh_image.data[index+3];
					
	// var grey_color = [127,127,127,255];
	// return pixelsPro_array_equals(color,grey_color);
// }


function left(obj,x,y,p1)
{
	var color = pixelsPro_getColorArrayFromImageData(obj,x,y,p1);
	if(x-1<0)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(obj,x-1,y,p1);
	return !pixelsPro_array_equals(color,color2);
}

function right(obj,x,y,p1)
{
	var color = pixelsPro_getColorArrayFromImageData(obj,x,y,p1);
	if(x+1>=obj.glob_pixelsPro_pg_map_image.width)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(obj,x+1,y,p1);
	return !pixelsPro_array_equals(color,color2);
}

function floor(obj,x,y,p1)
{
	var color = pixelsPro_getColorArrayFromImageData(obj,x,y,p1);
	if(y+1>=obj.glob_pixelsPro_pg_map_image.height)return true;
	var color2 = pixelsPro_getColorArrayFromImageData(obj,x,y+1,p1);
	return !pixelsPro_array_equals(color,color2);
}

function pixelsPro_getColorArrayFromImageData(obj,x,y,pixelsPro_pg_main_image)
{
	/* var c2 = document.getElementById("pixels");
	var ctx = c2.getContext("2d");
	return ctx.getImageData(x,y,1,1).data; */
	
	var index = pixelsPro_pg_main_image.width * (y) + (x) << 2;
	var color = [
		pixelsPro_pg_main_image.data[index],
		pixelsPro_pg_main_image.data[index+1],
		pixelsPro_pg_main_image.data[index+2],
		pixelsPro_pg_main_image.data[index+3]
	];	
	return color;
}
		
function pixelsPro_redrawPixels_main(obj, x,y,pixelsPro_pg_main_image)
{
	var nn=obj.glob_pixelsPro_pg_pixels_scale;
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
			if((y+j)>=pixelsPro_pg_main_image.height) continue;
			if((x+i)<0) continue;
			if((x+i)>=pixelsPro_pg_main_image.width) continue;
			var index = pixelsPro_pg_main_image.width * (y+j) + (x+i) << 2;
			
			var index2 = newpng.width * (j+7)*10*nn + (i+7)*10*nn << 2;
			
			var color = [pixelsPro_pg_main_image.data[index+0],pixelsPro_pg_main_image.data[index+1],pixelsPro_pg_main_image.data[index+2],pixelsPro_pg_main_image.data[index+3]];
			
			fillRectanglePro(newpng, (i+7)*10*nn, (j+7)*10*nn, 10*nn, 10*nn, newpng.width, color);
			
			newpng.data[index2+0] = pixelsPro_pg_main_image.data[index+0];
			newpng.data[index2+1] = pixelsPro_pg_main_image.data[index+1];
			newpng.data[index2+2] = pixelsPro_pg_main_image.data[index+2];
			newpng.data[index2+3] = pixelsPro_pg_main_image.data[index+3];
			
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


