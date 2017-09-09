function get_array_of_colors()
{
		
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	
	var im0 = context.getImageData(0,0,canvas.width,canvas.height);
	
	/*****		
	var canvas2 = document.createElement("canvas");
	canvas2.width = w;
	canvas2.height = h;
	var context2 = canvas2.getContext("2d");
		
	var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

	
	var r = n1;
	var g = n2;
	var b = n3;
	var a = 0;
	****/		
			var obj = {};
			var arr = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						arr.push(col); 
						obj[key]= {cnt:1,arr:col};
					
					}
					else
					{
						var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			setTimeout( function(){
				
				console.log ( "count="+arr.length);
				var div = document.createElement("div");
				div.className = "hint";
				div.id = "msg0";
				div.innerHTML = "Counted "+arr.length+" colors";
				document.body.appendChild(div);
				
				setTimeout( function(){ document.body.removeChild( div) }, 1000);
				
			}, 100);
			
			
			var obj2={};
			for(var ob in obj)
			{
				
				// console.log ( "count="+obj[ob].cnt+" color: "+ob);
				obj2[ob] = {cnt:obj[ob].cnt,arr:obj[ob].arr};
			}
			
			
			var arr2 = [];
			var count = arr.length;
			while(true)
			{
				var max = 0;
				var max_ob = "";
				for(var ob in obj2)
				{
					if (obj2[ob]==undefined) continue;
					
						if( max < obj2[ob].cnt)
						{
							max = obj2[ob].cnt;
							max_ob = ob;
							
							
						}
					
					//console.log ( "ob.count="+obj[ob]);
				}
				
				if (max_ob == "") break;
				
				{
					arr2.push(obj2[max_ob].arr);
					obj2[max_ob] = undefined;
					count--;
					if (count <0 ) break;
				}
			}
		/****	
			for (var i = 0; i < arr2.length; i++) 
			{
				console.log ( arr2[i]);
			}
			****/
			
			return [arr2,obj];
}

function get_array_of_colors_pre(colors)
{
	//arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент
	var s = prompt("enter number",colors.length);
	if 	(s==null) return null;
	
	var wh = Number(s.trim());
	if(wh <= 0) return null;
	else if(wh > colors.length) wh=colors.length; 
	else if(wh < colors.length) ; 
	else return null;
	
	var colors2 = [];
	
		var ii = 0;
		for (var i = 0;  i < colors.length; i++) 
		{
			colors2.push(colors[ii]);
			ii++;
			if (ii == wh ) ii=0; 
	
		}
		
		return [wh,colors2];
		
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


function min_colors()
{
	var ish_colors = get_array_of_colors()[0];
	var res = get_array_of_colors_pre( ish_colors )
	var vsego_colors = res[0];
	var colors = res[1];
	//var normal_colors = get_array_of_normal_colors( vsego_colors); 

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
					
					var nc =  colors[ get_index_of_color (ish_colors, im0, idx)%vsego_colors];
					
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
				logg('min colors('+vsego_colors+')'); //after or before? what question
			}, 100 );	
			
			
				
}