function generate_seed(params,callback)
{
	gen();

	if(callback) callback();
}

function generate_random_seed(params,callback)
{
	gen_rnd(params);

	
	
	if(callback) callback();
}

function generate_seed_with_param(params, callback)
{
	gen_p(Number(params[0].trim()));

	
	if(callback) callback();
	
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

function gen()
{
	var s = prompt("enter number");
	if(s==null) return; 	
	
	var wh = Number(s.trim());
	
	var canvas5 = document.createElement("canvas");
	canvas5.width = wh;
	canvas5.height = wh;
	var context5 = canvas5.getContext("2d");
	
	var s2 = prompt("enter number of random colors");
	if(s2==null) return; 
	
	var wh2 = Number(s2.trim());
	
	if(wh2==0) wh2=wh*wh;
	
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
	
	
	
	
	
	var imageData = context5.getImageData(0,0,wh,wh);
	
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
		
		var canvas = document.getElementById("canvas");
		canvas.width = wh;
		canvas.height = wh;
		var context = canvas.getContext("2d");
		context.putImageData(imageData,0,0);
		
		
	
}


function gen_rnd(params)
{
	var wh = getRandomInt(3,20);
	
	
	var wh2 = getRandomInt(2,8);
	
	var canvas5 = document.createElement("canvas");
	canvas5.width = wh;
	canvas5.height = wh;
	var context5 = canvas5.getContext("2d");
	
	if(params)
	{
		wh = Number(params[0].trim());
		if(wh<3) return;
		if(wh>20) return;
		
		 wh2 = Number(params[1].trim());
		if(wh2<2) return;
		if(wh2>8) return;
		
	}
	
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
	
	
	
	
	
	var imageData = context5.getImageData(0,0,wh,wh);
	
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
		
		var canvas = document.getElementById("canvas");
		canvas.width = wh;
		canvas.height = wh;
		var context = canvas.getContext("2d");
		context.putImageData(imageData,0,0);
			
			
	
}

function gen_p(wh)
{
	var canvas5 = document.createElement("canvas");
	canvas5.width = wh;
	canvas5.height = wh;
	var context5 = canvas5.getContext("2d");
	
	var imageData = context5.getImageData(0,0,wh,wh);
	
	var arr = [];
	
		for(var j=0;j<wh;j++)
		{
			for(var i=0;i<wh;i++)
			{
				
				//var imgData = context2.getImageData(i,j,1,1);
				var rgba = getRndColor();
				
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
		
		var canvas = document.getElementById("canvas");
		canvas.width = wh;
		canvas.height = wh;
		var context = canvas.getContext("2d");
		context.putImageData(imageData,0,0);
		
}



