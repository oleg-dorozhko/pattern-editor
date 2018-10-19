console.log('mod razn colors on');
var PNG = require('pngjs').PNG;
//var mod_mirror = require('./mod_mirror');
//var mod_median = require('./mod_median');
module.exports.raznColors = raznColors;

function getArrayOfAllColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"_"+im0.data[idx+1]+"_"+im0.data[idx+2]+"_"+im0.data[idx+3];
					//console.log ( "["+key+"]");
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						colors.push(col); 
						obj[key]= true;//{cnt:1,arr:col};
					
					}
					else
					{
						//var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						//obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			console.log ( "razn colors: counted "+colors.length+" colors");
			
			return colors;
}

function get_razn_colors(colors)
{
	razn_colors = null;
	razn_colors = [];
	
	var ost = colors.length%3;
	var mm = null;
	if(ost==0)  mm = colors.length/3;
	else  mm = (colors.length+ost)/3;
	if(mm<2) mm=2;
	
	var nn = (250/mm|0);
	
	
	for(var r=10;r<250;r+=nn)
	{ 
		for(var g=10;g<250;g+=nn)
		{ 
			for(var b=10;b<250;b+=nn)
			{ 
				razn_colors.push([r,g,b,255]);
			}
		}
	
	}	

	/*****
	
	for(var r=10;r<256;r+=nn)
	{ 
		razn_colors.push(str_rgba(r,0,0));
	}
	
	/****

	for(var r=10;r<256;r+=nn)
	{ 
		razn_colors.push(str_rgba(150,r,150));
		
	}	
	
	for(var r=10;r<256;r+=nn)
	{ 
		razn_colors.push(str_rgba(150,150,r));
	}
	
	*****/
	/****
	razn_colors.push(str_rgba(255,0,0));
	
	
	/*** 
	for(var g=10;g<239;g+=nn)
	{ 
		razn_colors.push(str_rgba(255,g,0));
	}
	
	razn_colors.push(str_rgba(255,255,0));
	
	for(var r=239;r<9;r-=nn)
	{
		razn_colors.push(str_rgba(r,255,0));
	}
	*****/
	//razn_colors.push(str_rgba(0,255,0));
	
	/*****
	for(var b=10;b<239;b+=nn)
	{
		razn_colors.push(str_rgba(0,255,b));
		
	}
	
	razn_colors.push(str_rgba(0,255,255));
	
		for(var g=239;g<9;g-=nn)
		{
			razn_colors.push(str_rgba(0,g,255));	
			 
		}
		
		razn_colors.push(str_rgba(0,0,255));
	
	for(var r=10;r<239;r+=nn)
	{ 
		razn_colors.push(str_rgba(r,0,255));
	}
	
	****/
	
	console.log("razn_colors.length="+razn_colors.length);
	
	shuffle(razn_colors);

	return razn_colors;
}
	/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function raznColors(imgData2)
{
	
	var w = imgData2.width;
	var h = imgData2.height;
	
	var colors = getArrayOfAllColors(imgData2);
	
	var razn_colors = get_razn_colors(colors);
	
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			var idx = (w * j + i) << 2;	
			
			var arr = [];
			arr[0] = imgData2.data[idx];	
			arr[1] = imgData2.data[idx+1];	
			arr[2] = imgData2.data[idx+2];
			arr[3] = imgData2.data[idx+3];	
			
			var n = getIndexOfColor(colors,arr);
			
			arr = razn_colors[n];
			
			imgData2.data[idx]=arr[0];	
			 imgData2.data[idx+1]=arr[1];	
		imgData2.data[idx+2]=arr[2];	
			imgData2.data[idx+3]=arr[3];	

		
			
			
		}
		
		
	}
	
	return imgData2;
}

function getIndexOfColor(colors,color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
		(colors[i][0]==color[0]) && 
						(colors[i][1]==color[1]) && 
						(colors[i][2]==color[2]) && 
						(colors[i][3]==color[3]) 
		
		) return i;
	}
}

