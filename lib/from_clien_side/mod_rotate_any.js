function rotate_any(params,callback)
{
	if(params==null)
	{
		var s = prompt("enter number from 40 to 90 both include");
		if(s==undefined) return; 	
		if(s==null) return; 	
		var wh = Number(s.trim());
		if(wh<1) return;
		if(wh>359) return;
		params={};
		params.degree=wh;
		logg('rotate_any '+params.degree); 
		
	}
	else
	{
		
		logg('rotate_any '+params.join(" ")); 
		
		
		
		var tparams={};
		tparams.degree=Number(''+params[0]);
		params=tparams;
		
	}
	
	__rotate_any(params.degree);
	
	return;
	
	if(params)
	{
		if(callback)
		{
			
			ident("canvas", 'ident', function(data){
				
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				
				
			});
			
		}
		else{
			
			ident("canvas", 'ident', function(data){
				
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				
				
			});
		
		}
	}
	else{
		
	return;
	}
	
	
}


function getColorArrayFromImageData(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}
function __rotate_any(degree)
{
	
	var canvas = document.getElementById('canvas');
	
	var ctx = canvas.getContext("2d");
	var im = ctx.getImageData(0,0,canvas.width,canvas.height);
	
	var w = im.width;
	var h = im.height;
	
	var canvas2 = document.createElement('canvas');
	canvas2.width=w*1;
	canvas2.height=h*1;
	var ctx2 = canvas2.getContext("2d");
	var im2 = ctx2.getImageData(0,0,canvas2.width,canvas2.height);
	
	
	
	var w2 = im2.width;
	var h2 = im2.height;

	var cx=w/2|0;
	var cy=h/2|0;
	
	for (var y = 0; y < h; y++) {
				
		
				
		for (var x = 0; x < w; x++) {
					
			
				var color = getColorArrayFromImageData(im, x, y);
				
				var arr= rotate_sin_cos(cx, cy, x, y, degree) ;
				
		//		ctx2.fillStyle='rgba('+color.join(',')+')';
		//		ctx2.fillRect(arr[0],arr[1],1,1);
				var n=arr[0];var m=arr[1];
				if((n>=0)&&(n<w2-1)&&(m>=0)&&(m<h2-1))
				{
				var idx2 = w2*m+n << 2;
				im2.data[idx2]=color[0];
				im2.data[idx2+1]=color[1];
				im2.data[idx2+2]=color[2];
				im2.data[idx2+3]=color[3];
				}
				
				
							
		}
	}
	
	canvas.width=w2;
	canvas.height=h2;
	canvas.getContext('2d').putImageData(im2,0,0);
	
	
}
/*
cx, cy = rotation center
x,y = current x,y
nx, ny = new coordinates
*/
function rotate_sin_cos(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
	//	nx = ( (cos * (x - cx)) + (sin * (y - cy)) + cx),
    //    ny = ( (cos * (y - cy)) - (sin * (x - cx)) + cy) ;
      nx = (( (cos * (x - cx)) + (sin * (y - cy)) + cx) |0),
        ny = (( (cos * (y - cy)) - (sin * (x - cx)) + cy) |0);
    return [nx, ny];
}


















