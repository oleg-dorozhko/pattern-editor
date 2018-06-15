function inv ( a )
{
	return (255 - a);
}


function inverse(params, callback)
{
		
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	
	var im0 = context.getImageData(0,0,canvas.width,canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w;
		canvas2.height = h;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

				
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   inv ( im0.data[idx] );
					im.data[new_idx+1] =  inv ( im0.data[idx+1] );
					im.data[new_idx+2] =  inv ( im0.data[idx+2] );
					im.data[new_idx+3] =  255;
					
					
					
					
				}
			}

			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){ if(callback) callback();	}, 100 );	
			
			
			
			
}			

