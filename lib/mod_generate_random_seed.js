console.log('mod generate_random_seed on');
var PNG = require('pngjs').PNG;
module.exports.generate_random_seed = generate_random_seed;



function generate_random_seed(params)
{
	
	
	console.log('in generate_random_seed: '+params);
		var wh = getRandomInt(3,20);
	
	
	var wh2 = getRandomInt(2,8);
	
	
	
	if(params)
	{
		wh0 = params[0];
		if(wh0==-1)
		{
		}
		else
		{
			if(wh<3) return -1;
			if(wh>20) return -2;
			wh = params[0];
		}
		
		 wh02 = params[1];
		 if(wh02== -1)
		 {
		 }
		 else
		 {
			if(wh2<2) -3;
			if(wh2>8) -4;
			wh2 = params[1];
		 }
		
	}
	
	
	var imageData = new PNG ( {
						
							width: wh,
							height: wh,
							filterType: 4
					} );
	
	
	
	var randoms = [];
	while(true)
	{
		var rgba = getRndColor();
		if(includesColor(randoms,rgba)==false)
		{
			randoms.push(rgba);
			if(randoms.length==wh2) break;
		}
	}
	
	
	var arr = [];
	
		for(var j=0;j<wh;j++)
		{
			for(var i=0;i<wh;i++)
			{
				
				//var imgData = context2.getImageData(i,j,1,1);
				var rgba = randoms[getRandomInt(0,randoms.length)];
				
				var obj = {};
				obj.i = i;
				obj.j = j;
				obj.r = rgba[0];
				obj.g = rgba[1];
				obj.b = rgba[2];
				obj.a = rgba[3];
					
				arr.push(obj);
					
			}
		}
	
		
		
		
		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			var dd = (obj.j*wh+obj.i)*4;
			imageData.data[dd]  = obj.r;
			imageData.data[dd+1]  = obj.g;
			imageData.data[dd+2]  = obj.b;
			imageData.data[dd+3]  = obj.a;
			
			var dd2 = (obj.i*wh+obj.j)*4;
			imageData.data[dd2]  = obj.r;
			imageData.data[dd2+1]  = obj.g;
			imageData.data[dd2+2]  = obj.b;
			imageData.data[dd2+3]  = obj.a;
		}
		
		return 	imageData;
			
	
}


// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
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




