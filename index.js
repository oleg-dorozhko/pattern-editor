var opbeat = require('opbeat').start()

var PNG = require('pngjs').PNG;
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


