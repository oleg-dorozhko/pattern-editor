console.log('mod destroy colors on');
var PNG = require('pngjs').PNG;
//var mod_mirror = require('./mod_mirror');
//var mod_median = require('./mod_median');
module.exports.destroyColorsForImageData = destroyColorsForImageData;

function get_array_of_colors(im0)
{
	
	
	
	var w = im0.width;
	var h = im0.height;
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
			
			return arr;
			
			// var obj2={};
			// for(var ob in obj)
			// {
				
			////	console.log ( "count="+obj[ob].cnt+" color: "+ob);
				// obj2[ob] = {cnt:obj[ob].cnt,arr:obj[ob].arr};
			// }
			
			
			// var arr2 = [];
			// var count = arr.length;
			// while(true)
			// {
				// var max = 0;
				// var max_ob = "";
				// for(var ob in obj2)
				// {
					// if (obj2[ob]==undefined) continue;
					
						// if( max < obj2[ob].cnt)
						// {
							// max = obj2[ob].cnt;
							// max_ob = ob;
							
							
						// }
					
			////		console.log ( "ob.count="+obj[ob]);
				// }
				
				// if (max_ob == "") break;
				
				// {
					// arr2.push(obj2[max_ob].arr);
					// obj2[max_ob] = undefined;
					// count--;
					// if (count <0 ) break;
				// }
			// }
		
			// for (var i = 0; i < arr2.length; i++) 
			// {
				// console.log ( arr2[i]);
			// }
		
			
			// return [arr2,obj];
}

function get_index_of_color (colors, im0, idx)
{
	//console.log ( "in get_index_of_color colors.length="+colors.length);
	for (var i = 0; i < colors.length; i++) 
	{
		//console.log ( "colors["+i+"][0]="+colors[i][0]); //", x="+x+" y="+y);
		//console.log ( "im0.data["+idx+"][0]="+im0.data[idx]);
		if (
		
		im0.data[idx] == colors[i][0] &&
		im0.data[idx+1] == colors[i][1] &&
		im0.data[idx+2] == colors[i][2] &&
		im0.data[idx+3] == colors[i][3]
		) 
		{
			//console.log ( "out from get_index_of_color #1");
			return i;
			
		}
		
	}
	//console.log ( "out from get_index_of_color #2");
	return null;
	
}

function getRandomInt(min, max) 
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}

function includesColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) && (colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) && (colors[i][3]== color[3])
					
		) 
			{
				return true;
			}
	}
	return false;
}


function getPoint(im0, w, x,y)
{
	var arr = [];
	
	var idx = w * y + x << 2;
	
	arr.push(im0.data[idx]); 
	arr.push(im0.data[idx+1]); 
	arr.push(im0.data[idx+2]); 
	arr.push(im0.data[idx+3]); 
	
	
	return arr;
}

function inv(a)
{
	return 255-a;
}
function invv(a)
{
	return a;
}
function invpair(arr)
{
	var arr2=[];
	for(var n=1; n<arr.length;n+=2)
	{
		arr2.push([arr[n][0],arr[n][1],arr[n][2],arr[n][3]]);
		arr2.push([inv(arr[n-1][0]),inv(arr[n-1][1]),inv(arr[n-1][2]),arr[n-1][3]]);
	}
	return arr2;
}

function destroyColorsForImageData(im0)
{
	var w = im0.width;
	var h = im0.height;
	
	var arr =get_array_of_colors(im0);
	//var arr2=invpair(arr);
	console.log ( "colors.length="+arr.length);
	//var color2 = arr2[]; //getPoint(im0,w,getRandomInt(0,w),getRandomInt(0,h));
	var ind = getRandomInt(0,arr.length);
	var color1 = arr[ind];//getPoint(im0,w,getRandomInt(0,w),getRandomInt(0,h));
	console.log ( "arr[ind]="+color1);
	
	var arr2= JSON.parse( JSON.stringify(arr));
	var color2 =  arr2[getRandomInt(0,arr2.length)];
	
	//arr.splice(ind,1);
								
								ind = getRandomInt(0,arr.length);
								color1 = arr[ind];
								console.log ( "arr[ind]="+color1);
	
	
	
	
	
	
	
	
	
	
	
	
	for(var n=0; n<10;n++)
	{
	
			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
					
						
						var idx = (w * y + x) << 2;
						if(arr.length>1)
						{
							if(
							(im0.data[idx] == color1[0]) &&
							(im0.data[idx+1] == color1[1]) &&
							(im0.data[idx+2] == color1[2]) &&
							(im0.data[idx+3] == color1[3])
							)
							{
								
								im0.data[idx] = invv(color2[0]);
								im0.data[idx+1] = invv(color2[1]);
								im0.data[idx+2] = invv(color2[2]);
								im0.data[idx+3] = color2[3];
							}
						
						}
						
				}
			}
			
			
			arr.splice(ind,1);
								
								ind = getRandomInt(0,arr.length);
								color1 = arr[ind];
								//console.log ( "arr[ind]="+color1);
			
			
			
			
			
			
			
			
	}
			
		return im0;
}