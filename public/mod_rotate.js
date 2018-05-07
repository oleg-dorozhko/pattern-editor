function rotate_plus_90(params,callback)
{
	var n = 1;// Number( document.getElementById("cell_size").value);
	
	var canvas2 = document.getElementById("canvas")
	var w = canvas2.width;
	var h = canvas2.height;
	
	var context2 = canvas2.getContext("2d");
	
	var canvas4 = document.createElement("canvas");
	canvas4.width = h;
	canvas4.height = w;
	var context4 = canvas4.getContext("2d");
	
	var im0 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var im = context4.getImageData(0,0,canvas4.width,canvas4.height);
	
	for(var j=0;j<h;j+=n)
	{
		for(var i=0;i<w;i+=n)
		{
			
			var idx0 = w*j+i <<2;
			var idx1 = h*i+j <<2;
			
			im.data[idx1] = im0.data[idx0];
			im.data[idx1+1] = im0.data[idx0+1];
			im.data[idx1+2] = im0.data[idx0+2];
			im.data[idx1+3] = im0.data[idx0+3];
			
		}
	}
	
	
	canvas2.width = canvas4.width;
	canvas2.height = canvas4.height;
	canvas2.getContext("2d").putImageData(im,0,0);
	
	setTimeout( function(){
				logg('rotate(90)'); //after or before? what question
			}, 100 );	
			
	
}



function rotate(params,callback)
{
	if(n==45) rotate_plus_45();
	else if(n==90) rotate_plus_90();
}





function rotate_plus_45(params,callback)
{
	
		var canvas2 = document.getElementById("canvas")
	var w = canvas2.width;
	var h = canvas2.height;
	
	if(w * 2 > 1200 || h * 2 > 1200 )
		{
			
			
			errror("rotate plus 45: error: too big size (need result width * 2 or height * 2 <= 1200)");
			return;
			
		}
		
	transform("canvas",'/rotate_ff',callback);
	
	/**	
	im = __rotateff( im0, im, function(){
		
		
			
	canvas2.width = canvas4.width;
	canvas2.height = canvas4.height;
	canvas2.getContext("2d").putImageData(im,0,0);
	
	setTimeout( function(){
			//	logg('rotate(45)'); //after or before? what question
			
			if(callback) callback();
			
			}, 100 );	
		
		
		
	} );
	
	**/
	
				
		
}

