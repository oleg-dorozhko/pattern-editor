function border_minus()
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	var im0 = context.getImageData(1,1,canvas.width-1,canvas.height-1);
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = w-2;
	canvas2.height = h-2;
	var context2 = canvas2.getContext("2d");
	context2.putImageData(im0,0,0);
	
	var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	canvas.width = w-2;
	canvas.height = h-2;
	canvas.getContext("2d").putImageData(im,0,0);
	
	setTimeout( function(){
				logg('border minus'); //after or before? what question
			}, 100 );	
			
}

function border_plus()
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	var im0 = context.getImageData(0,0,canvas.width,canvas.height);
	
	var im_left = context.getImageData(0,0,1,canvas.height-1);
	var im_top = context.getImageData(0,0,canvas.width-1,1);
	var im_right = context.getImageData(canvas.width-1,0,1,canvas.height-2);
	var im_bottom = context.getImageData(0,canvas.height-1,canvas.width-2,1);
	
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = w+2;
	canvas2.height = h+2;
	var context2 = canvas2.getContext("2d");
	context2.putImageData(im0,1,1);
	
	context2.putImageData(im_left,0,1);
	context2.putImageData(im_top,1,0);
	context2.putImageData(im_right,canvas2.width-1,1);
	context2.putImageData(im_bottom,1,canvas2.height-1);
	
	var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	canvas.width = w+2;
	canvas.height = h+2;
	canvas.getContext("2d").putImageData(im,0,0);
	
	setTimeout( function(){
				logg('border plus'); //after or before? what question
			}, 100 );	
			
}