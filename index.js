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
	return s;
}



app.post('/load_div_first', function(request, response) {
  

	fs.readFile( __dirname + '/views/pages/index.html', 'utf8', function (err,data) {
	  
	  if (err) { return console.log(err);  }

	  var strData = data.toString();
	  strData = strData.replace("[seed-list]",getSeedListFromFS());
	  strData = strData.replace("[init-path]","/initial-image.png");
	  data = new Buffer(strData); 
	  
	  response.writeHead(200, {  'Content-Type': 'text/html' } );
	  response.end(data);
	  
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
				
				console.log("returning new canvas image name (plused) ");
				
			});
			
	
			
			//dummy(res);
			
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
				
				console.log("retu 12345 rning new canvas image name (inverted) ");
				
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
		
		console.log("w="+w);
		throw err;
		
		
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


function mdown( req, res )
{
	req.pipe(new PNG({filterType: 4})).on('parsed', function() {
		
		
		
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


	var crop_settings = null;
	
	
	
	function crop( req, res )
	{
		console.log('\nIn crop(...)\n');
		
		if(crop_settings == null)
		{
			
			res.writeHead( 503, { 'Content-Type':'text/plain' } );
			res.end("error: call /precrop before");
			req.connection.destroy();
			return;

		}
				
		
		
		var a1x = 0;
		var a1y = 0;
		var a2x = 0;
		var a2y = 0;
		
		var flag = crop_settings.flag;
		
		
		console.log("x="+crop_settings.x);
		console.log("y="+crop_settings.y);
		console.log("w="+crop_settings.w);
		console.log("h="+crop_settings.h);
		console.log("flag="+flag);
		
		
		if(flag==1)
		{
			a1x = crop_settings.x;
			a1y = crop_settings.y;
			a2x = crop_settings.w;
			a2y = crop_settings.h;	
			
		}
		
		else if(flag==2)
		{
			
			a2x = crop_settings.x+1;
			a2y = crop_settings.y+1;
		}
		
		
		req.pipe(new PNG({filterType: 4})).on('parsed', function() {
	

	
	
						
						
						if((a1x >= 0) && (a1y >=0) && (a2x >= 1) && (a2y >= 1) )
						{
							
		
							
								var x0 = Math.min(a1x,a2x);
								var x1 = Math.max(a1x,a2y);
								
								var y0 = Math.min(a1y,a2y);
								var y1 = Math.max(a1y,a2y);
								
								var w = Math.abs(x1-x0);
								var h = Math.abs(y1-y0);
			
								if(w>0 && h>0)
								{
									 
									
											var arr = [ x0, y0, w, h ];
						
							
											var newpng = new PNG ( {
												
													width: w,
													height: h,
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
													
													
													newpng.data[idx2] = this.data[idx];
													//console.log(typeof(newpng.data[idx2]));
													newpng.data[idx2+1] = this.data[idx+1];
													newpng.data[idx2+2] = this.data[idx+2];
													
													newpng.data[idx2+3] = this.data[idx+3];
													n++;
												}
												m++;
											}
							 
								
											crop_settings = null;
											
											
											sendImage(newpng, res, '\nImage cropped\n');
									
								}
						}		
							
		
		});
							
		
		
		
	}
	

function precrop( req, res)
{
	
									
		console.log("entering precrop");
		
		
		var body = '';

		req.on('data', function (data) {
			
			//console.log("when req.on data");
			
			body += data;

			// Too much POST data, kill the connection!
			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 1e6*50)
			{
				res.writeHead( 503, { 'Content-Type':'text/plain' } );
				res.end("error: data too big");
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

function error( res, msg )
{
	res.writeHead( 503, { 'Content-Type':'text/plain' } );
	res.end( msg );
	req.connection.destroy();
	return;	
}

	

function combo( req, res )
{
	
	console.log('\nIn combo(...)\n');
		
	if(combo_settings == null)
	{
		
		res.writeHead( 503, { 'Content-Type':'text/plain' } );
		res.end("error: call /prepare_combo before");
		req.connection.destroy();
		return;

	}
	
	var old_png = combo_settings.second_image; 
	
	var big_image = new PNG({filterType: 4});
	
	req.pipe(big_image).on('parsed', function() {
		
		
				
					
					
					
			if(old_png.width != old_png.height) 
			{
				error( res, "error: old_png.width != old_png.height");
				return;
				
			}
			
			if(this.width != this.height) {
				error( res, "error: this.width != this.height");
				
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
				
						
				
				
				sendImage(newpng,res,'\nImages combined\n');
				
				
				
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
				
				
				
				
				
				sendImage(newpng,res,'\nImages combined\n');
				
				
				
				
				
				
			}
			else  
			{
				
				error( res, "error: odd first image but even second image. need both odd or even");
				
				return; //need error processing
			}
			
		
		
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
		
		res.writeHead( 503, { 'Content-Type':'text/plain' } );
		res.end("error: call /send_seed before");
		req.connection.destroy();
		return;

	}
	
	var small_image = fill_settings.seed; 
	
	var big_image = new PNG({filterType: 4});
	
	req.pipe(big_image).on('parsed', function() {
		
		
					var newpng = new PNG ( {
						
							width: big_image.width * small_image.width,
							height: big_image.height * small_image.height,
							filterType: 4
					} );
					
					
	
		
		//16%3 = 012
		
		//console.log("big_image.width="+big_image.width);
		//console.log("small_image.width="+small_image.width);
		//console.log("newpng.width="+newpng.width);
		
		
		
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
app.post('/send_seed', get_seed );
app.post('/crop', crop );
app.post('/precrop', precrop );
app.post('/random', random );
app.post('/mdown', mdown );
app.post('/mright', mright );
app.post('/rotate', rotate );
app.post('/median', median );
app.post('/multiply', multiply );
app.post('/plus', plus );
app.post('/minus', minus );
app.post('/inverse', inverse );

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


