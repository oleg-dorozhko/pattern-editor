function both_axes_minus_with_param( s, callback )
{
	var n = Number(s.trim());
	if(isNaN(n)) return;
	for (var i = 0; i < n; i++) {
		
		both_axes_minus();
		
	}
	callback();
}

function both_axes_minus()
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	var im0 = context.getImageData(0,0,canvas.width,canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w-1;
		canvas2.height = h-1;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	
		
		var dx = w/2|0; 
		var dy = h/2|0;
		
		//7/2 = 3 //012[3]456
		//8/2 = 4 //012[3][4]567
		
			for (var y = 0; y < w; y++) {
				
				if(y == dy) continue;
				
				for (var x = 0; x < h; x++) {
					
					if(x == dx) continue;
					
					var idx = (w * y + x) << 2;
					
					var new_idx1 = 0;
					
					if(x < dx && y < dy)
					{			
						new_idx1 = canvas2.width * y + x << 2;
					}	
					else if(x > dx && y < dy)
					{
						new_idx1 = canvas2.width * y + (x-1) << 2;
					}
					else if(x > dx && y > dy)
					{
						new_idx1 = canvas2.width * (y-1) + (x-1) << 2;
					}
					else if(x < dx && y > dy)
					{
						new_idx1 = canvas2.width * (y-1) + x << 2;
					}
					
						im.data[new_idx1+0] = im0.data[idx+0];
						im.data[new_idx1+1] =  im0.data[idx+1];
						im.data[new_idx1+2] =  im0.data[idx+2];
						im.data[new_idx1+3] =  im0.data[idx+3];
						
					
					
					
				}
				
			}
			
			canvas.width =  canvas2.width;
			canvas.height =  canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			//setTimeout( function(){	logg('axes minus'); }, 100 );	
			
			
}

function horizontal_axe_minus( ) //minus one horizontal line
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( h==1 )
		{
			
			errror("mod_axes: horizontal_axe_minus: error: too small size (need height > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,canvas.width,(canvas.height/2|0));
	var im1 = context.getImageData(0,(canvas.height/2|0)+1,canvas.width,(canvas.height/2|0));
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w;
		canvas2.height = h-1;
		var context2 = canvas2.getContext("2d");
		
		context2.putImageData(im0, 0,0);
		context2.putImageData(im1, 0,(canvas.height/2|0));
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
		
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			// setTimeout( function(){			logg('horizontal_axe_minus'); 		}, 200 );	
			
			
			
			
}			


function vertical_axe_minus( ) //minus one vertical line
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( w==1 )
		{
			
			errror("mod_axes: vertical_axe_minus: error: too small size (need width > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,(canvas.width/2|0),canvas.height);
	var im1 = context.getImageData((canvas.width/2|0)+1,0,(canvas.width/2|0),canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w-1;
		canvas2.height = h;
		var context2 = canvas2.getContext("2d");
		
		context2.putImageData(im0, 0,0);
		context2.putImageData(im1, (canvas.width/2|0),0);
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
		
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
		//	setTimeout( function(){ logg('vertical_axe_minus'); 	}, 200 );	
			
			
			
			
}			