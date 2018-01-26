function colors(txt)
{
	setTimeout( function(){
				
				console.log ( "count="+txt);
				var div = document.createElement("div");
				div.className = "hint";
				div.id = "msg0";
				div.innerHTML = "Counted "+txt+" colors";
				document.body.appendChild(div);
				
				setTimeout( function(){ document.body.removeChild( div) }, 1000);
				
			}, 100);
			
}


function get_array_of_normal_colors(vsego_colors)
{
	
	
	
	//colors.splice(wh, colors.length+1);
	
	var normal_colors = [];
	var count = vsego_colors-1;
	var red = 0;
	var green = 0;
	var blue = 0;
	
	while(true)
	{
		var c = count % 3;
		if (c == 1)
		{
			green++;
		}
		else if ( c == 2)
		{
			blue++;
		}
		else
		{
			red++;
		}
		count--;
		if (count<0) break;
	}
	
	count = vsego_colors-1;
	
	var dred = 255/red|0;
	var dgreen = 255/green|0;
	var dblue = 255/blue|0;
	
	var xred = dred;
	var xgreen = dgreen;
	var xblue = dblue;
	
	
	while(true)
	{
		var c = count % 3;
		if (c == 0)
		{
			
			//normal_colors.push([xred,0,0,255]);	xred += dred;
			normal_colors.push([xred,xgreen,xblue,255]);	xred += dred;
			
		}
		else if (c == 1)
		{
			
			//normal_colors.push([0,xgreen,0,255]);xgreen += dgreen;
			normal_colors.push([xred,xgreen,xblue,255]);	xgreen += dgreen;
			
		}
		else
		{
			
			//normal_colors.push([0,0,xblue,255]);xblue += dblue;
			normal_colors.push([xred,xgreen,xblue,255]); xblue += dblue;
			
		}
		
		count--;
		if (count<0) break;
	}
	
	return normal_colors;
	
}

function get_index_of_color (colors, im0, idx)
{
	for (var i = 0; i < colors.length; i++) 
	{
		if (
		
		im0.data[idx] == colors[i][0] &&
		im0.data[idx+1] == colors[i][1] &&
		im0.data[idx+2] == colors[i][2] 
		) 
		{
			return i;
		}
		
	}
	
	return null;
	
}

function normal_colors()
{
	var ish_colors = get_array_of_colors()[0];
	//var res = get_array_of_colors_pre( ish_colors )
	var vsego_colors = ish_colors.length;
	var colors = ish_colors;
	var normal_colors = get_array_of_normal_colors( vsego_colors); 

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

/*****	
	var r = n1;
	var g = n2;
	var b = n3;
	var a = 0;
*****/			
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					var nc =  normal_colors[ get_index_of_color (ish_colors, im0, idx)%vsego_colors];
					
					im.data[new_idx] =  nc[0];
					im.data[new_idx+1] =  nc[1]; //cyclic_random_plus ( im0.data[idx+1], g );
					im.data[new_idx+2] =  nc[2];  //cyclic_random_plus ( im0.data[idx+2], b );
					im.data[new_idx+3] =  255; //cyclic_random_plus ( im0.data[idx+3], a );
					
					
					
					
				}
			}

			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('normal colors'); //after or before? what question
			}, 100 );	
			
			
				
}
