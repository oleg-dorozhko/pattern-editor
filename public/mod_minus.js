function minus( )
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( h == 1 || w==1 )
		{
			
			errror("mod_mdown: error: too small size (need result height > 1 || width > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,canvas.width,canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w/2|0;
		canvas2.height = h/2|0;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

	
			
			

		for (var y = 0; y < h; y+=2) {
			for (var x = 0; x < w; x+=2) {
				
				var idx = (w * y + x) << 2;
				
				var new_idx = canvas2.width * (y/2) + (x/2) << 2;
				//var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
				
				im.data[new_idx] = im0.data[idx];
				im.data[new_idx+1] = im0.data[idx+1];
				im.data[new_idx+2] = im0.data[idx+2];
				im.data[new_idx+3] = im0.data[idx+3];

				
				
			}
		}


			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('minus'); //after or before? what question
			}, 100 );	
			
			
			
			
}			