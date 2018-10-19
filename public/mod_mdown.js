function mirror_down ()
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	
		
		if( h * 2 > 1200 || w > 1200 )
		{
			
			errror("mod_mdown: error: too big size (need result height * 2 <= 1200 || width <= 1200)");
			return;
			
		}
		
		var im0 = context.getImageData(0,0,canvas.width,canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w;
		canvas2.height = h*2;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

		
		var m=0;
		
		for (var x = 0; x < canvas2.width; x++) {
			
			m=0;

			for (var y = 0; y < canvas2.height; y++) {
				
				
					var idx = 0;
					
					var new_idx1 = w * y + x << 2;
					
					if( y < h )
					{
					
						idx = (w * y + x) << 2;
											
						m++;
						
					}
					else
					{
						idx = (w * (m-1) + x) << 2;
						
						m--;

					}
					
					im.data[new_idx1+0] = im0.data[idx+0];
					im.data[new_idx1+1] = im0.data[idx+1];
					im.data[new_idx1+2] = im0.data[idx+2];
					im.data[new_idx1+3] = im0.data[idx+3];
					
					
					
				}
				
			}
			
			canvas.width = w;
			canvas.height = h*2;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('mirror down'); //after or before? what question
			}, 100 );	
			
			
}