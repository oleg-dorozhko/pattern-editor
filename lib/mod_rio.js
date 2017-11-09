//!() !
console.log('mod rio on');
var PNG = require('pngjs').PNG;
module.exports.rioForImageData = rioForImageData;

function context_getImageData( im, w, i, j )
{
	var idx = (w * j + i) << 2;
	var rgb = [];
	rgb[0] = im.data[idx];
	rgb[1] = im.data[idx+1];
	rgb[2] = im.data[idx+2];
	return rgb;
}


function arr_equals(data1, data2)
{
	
	for(var j=0;j<data1.length;j++)
	{
		if(data1[j] != data2[j]) return false; 
	}
	
	return true;
}



function countNeigh (im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	imgData[6] = context_getImageData(im,w,i,j-dh);
	imgData[7] = context_getImageData(im,w,i+dw,j-dh);
	imgData[0] = context_getImageData(im,w,i+dw,j);
	imgData[1] = context_getImageData(im,w,i+dw,j+dh);
	imgData[2] = context_getImageData(im,w,i,j+dh);
	imgData[3] = context_getImageData(im,w,i-dw,j+dh);
	imgData[4] = context_getImageData(im,w,i-dw,j);
	imgData[5] = context_getImageData(im,w,i-dw,j-dh);
	imgData[8] = context_getImageData(im,w,i,j);
	
	var counter=0;
	for(var i=0;i<imgData.length;i++)
	{
		if (arr_equals(imgData[8], imgData[i])) counter++;
	}
	
	return counter;
	
}

function rio() 
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	var im = context.getImageData(0,0,canvas.width,canvas.height);

	var canvas2 = document.createElement("canvas");
	canvas2.width = w;
	canvas2.height = h;
	var context2 = canvas2.getContext("2d");
		
	var im2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var nn = w-1;
	var mm = h-1;
			

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
					
						
						var cnt = countNeigh( im, w, x, y, 1, 1 );
						//console.log("x="+x+", y="+y+" cnt="+cnt);
						var idx = (w * y + x) << 2;
						if (x==0 || y==0)
						{
							im2.data[idx] = im.data[idx];
							im2.data[idx+1] = im.data[idx+1];
							im2.data[idx+2] = im.data[idx+2];
							im2.data[idx+3] = 255;
						}
						else if (x==nn || y==mm)
						{
							im2.data[idx] = im.data[idx];
							im2.data[idx+1] = im.data[idx+1];
							im2.data[idx+2] = im.data[idx+2];
							im2.data[idx+3] = 255;
						}
						else if (cnt==9)   
						{
							im2.data[idx] = im.data[idx];
							im2.data[idx+1] = im.data[idx+1];
							im2.data[idx+2] = im.data[idx+2];
							im2.data[idx+3] = 255;
						}						
						else
						{
							im2.data[idx] = 255-im.data[idx];
							im2.data[idx+1] = 255-im.data[idx+1];
							im2.data[idx+2] = 255-im.data[idx+2];
							im2.data[idx+3] = 255;
						}							
						
				}
			
			}
			
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im2,0,0);
}


function rioForImageData(im) 
{
	var w = im.width;
	var h = im.height;
	
	var im2 = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );

	var nn = w-1;
	var mm = h-1;
			

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
					
						
						var cnt = countNeigh( im, w, x, y, 1, 1 );
						//console.log("x="+x+", y="+y+" cnt="+cnt);
						var idx = (w * y + x) << 2;
						if (x==0 || y==0)
						{
							im2.data[idx] = im.data[idx];
							im2.data[idx+1] = im.data[idx+1];
							im2.data[idx+2] = im.data[idx+2];
							im2.data[idx+3] = 255;
						}
						else if (x==nn || y==mm)
						{
							im2.data[idx] = im.data[idx];
							im2.data[idx+1] = im.data[idx+1];
							im2.data[idx+2] = im.data[idx+2];
							im2.data[idx+3] = 255;
						}
						else if (cnt==9)   
						{
							im2.data[idx] = im.data[idx];
							im2.data[idx+1] = im.data[idx+1];
							im2.data[idx+2] = im.data[idx+2];
							im2.data[idx+3] = 255;
						}						
						else
						{
							im2.data[idx] = 255-im.data[idx];
							im2.data[idx+1] = 255-im.data[idx+1];
							im2.data[idx+2] = 255-im.data[idx+2];
							im2.data[idx+3] = 255;
						}							
						
				}
			
			}
			
			return im2;
}