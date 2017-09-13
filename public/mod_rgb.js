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

function cyclic_plus ( a1, a2 )
{
	return (a1+a2) % 256;
}

function rgb_with_param(n1,n2,n3,n4)
{
	//if()
	/******
	console.log((255+2) % 256 );
	console.log((255+1) % 256 );
	console.log((255+0) % 256 );
	console.log((255+254) % 256 );
	console.log((255+255) % 256 );
	console.log((255+256) % 256 );
	console.log((255+257) % 256 );
	return;
	****/
	
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

	
	var r = n1;
	var g = n2;
	var b = n3;
	var a = 0;
			
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   cyclic_plus ( im0.data[idx], r );
					im.data[new_idx+1] =  cyclic_plus ( im0.data[idx+1], g );
					im.data[new_idx+2] =  cyclic_plus ( im0.data[idx+2], b );
					im.data[new_idx+3] =  cyclic_plus ( im0.data[idx+3], a );
					
					
					
					
				}
			}

			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('random('+r+','+g+','+b+',255)'); //after or before? what question
			}, 100 );	
			
			
			
}

function rgb_plus_plus()
{
	
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

	
	var r = 1;//col[0];
	var g = 1;//col[1];
	var b = 1;//col[2];
	var a = 0;
			
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   cyclic_plus ( im0.data[idx], r );
					im.data[new_idx+1] =  cyclic_plus ( im0.data[idx+1], g );
					im.data[new_idx+2] =  cyclic_plus ( im0.data[idx+2], b );
					im.data[new_idx+3] =  cyclic_plus ( im0.data[idx+3], a );
					
					
					
					
				}
			}

			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('rgb plus plus'); //after or before? what question
			}, 100 );	
			
			
			
			
}			


function rgb_minus_minus()
{
	
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

	
	var r = -1;//col[0];
	var g = -1;//col[1];
	var b = -1;//col[2];
	var a = 0;
			
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   cyclic_plus ( im0.data[idx], r );
					im.data[new_idx+1] =  cyclic_plus ( im0.data[idx+1], g );
					im.data[new_idx+2] =  cyclic_plus ( im0.data[idx+2], b );
					im.data[new_idx+3] =  cyclic_plus ( im0.data[idx+3], a );
					
					
					
					
				}
			}

			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('rgb minus minus'); //after or before? what question
			}, 100 );	
			
			
			
			
}			


function rgb_add_cyclic()
{
	/******
	console.log((255+2) % 256 );
	console.log((255+1) % 256 );
	console.log((255+0) % 256 );
	console.log((255+254) % 256 );
	console.log((255+255) % 256 );
	console.log((255+256) % 256 );
	console.log((255+257) % 256 );
	return;
	****/
	
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

	//var col = getRndColor();
	var r = Number(document.getElementById("red").value);
	var g = Number(document.getElementById("green").value);
	var b = Number(document.getElementById("blue").value);
	var a = 0;
			
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   cyclic_plus ( im0.data[idx], r );
					im.data[new_idx+1] =  cyclic_plus ( im0.data[idx+1], g );
					im.data[new_idx+2] =  cyclic_plus ( im0.data[idx+2], b );
					im.data[new_idx+3] =  cyclic_plus ( im0.data[idx+3], a );
					
					
					
					
				}
			}

			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('random('+r+','+g+','+b+',255)'); //after or before? what question
			}, 100 );	
			
			
			
			
}			