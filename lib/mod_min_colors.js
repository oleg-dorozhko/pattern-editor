console.log('mod min colors on');

var PNG = require('pngjs').PNG;

module.exports.minColors = minColors;




function get_array_of_colors(im0)
{
		
	var w = im0.width;
	var h = im0.height;
		
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
		
			
			var obj2={};
			for(var ob in obj)
			{
				
				// console.log ( "count="+obj[ob].cnt+" color: "+ob);
				obj2[ob] = {cnt:obj[ob].cnt,arr:obj[ob].arr};
			}
			
			
			
			var arr2 = [];
			var count = arr.length;
			
			if(count <1000)
			{
				
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
		
			
			return [arr2,obj];
			
			
			}
			
			else
			{
				
					count=1000;
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
				
					
					return [arr2,obj];
				
				
			}
}

function get_array_of_colors_pre( s, colors )
{
	//arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент
	//var s = prompt("enter number",colors.length);
	//if 	(s==null) return null;
	
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

function minColors( num_colors, im0 )
{
	var ish_colors = get_array_of_colors(im0)[0];
	var res = get_array_of_colors_pre( num_colors, ish_colors )
	var vsego_colors = res[0];
	var colors = res[1];
	//var normal_colors = get_array_of_normal_colors( vsego_colors); 

	
	
	var w = im0.width;
	var h = im0.height;
	
	
	
			
		var im = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
		
	

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

			return im;
				
}