function mirror_right ()
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	
		
		if( w * 2 > 1200 || h > 1200 )
		{
			
			errror("mod_mright: error: too big size (need result width * 2 <= 1200 || height <= 1200)");
			return;
			
		}
		
		var im0 = context.getImageData(0,0,canvas.width,canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w*2;
		canvas2.height = h;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

			for (var y = 0; y < canvas2.height; y++) {
				
				n=0;
				for (var x = 0; x < canvas2.width; x++) {
					
					var idx = 0;
					var new_idx1 = canvas2.width * y + x << 2;
					if(x < w)
					{
					
						idx = (w * y + x) << 2;
						
						
						n++;
					}
					else
					{
						idx = (w * y + (n-1)) << 2;
									
						
						n--;

					}
					
					im.data[new_idx1+0] = im0.data[idx+0];
					im.data[new_idx1+1] = im0.data[idx+1];
					im.data[new_idx1+2] = im0.data[idx+2];
					im.data[new_idx1+3] = im0.data[idx+3];
					
					
					
				}
				
			}
			
			canvas.width = w*2;
			canvas.height = h;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('mirror right'); //after or before? what question
			}, 100 );	
			
			//sendImage(newpng, res, '\nImage mirror righted\n');	
	
}