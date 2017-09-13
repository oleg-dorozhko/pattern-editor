function generate_seed()
{
	gen();

	vortex();
}

function generate_seed_with_param(s, callback)
{
	gen_p(Number(s.trim()));

	vortex();
	
	callback();
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


function gen()
{
	var s = prompt("enter number");
		
	var wh = Number(s.trim());
	
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
		
		setTimeout( function(){
				logg('generate seed('+wh+')'); //after or before? what question
			}, 100 );	
			
	
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
		
		setTimeout( function(){
				logg('generate seed '); //after or before? what question
			}, 100 );	
			
	
}



