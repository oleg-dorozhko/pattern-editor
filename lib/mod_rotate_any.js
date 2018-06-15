console.log('mod rotate any on');
var PNG = require('pngjs').PNG;
module.exports.rotate_any = rotate_any;

function rotate_any(im,params)
{
	
	
	return __rotate_any(im,params.degree);
	
	
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


function __rotate_any(im,degree)
{
	
	
	
	var w = im.width;
	var h = im.height;
	
	// var canvas2 = document.createElement('canvas');
	// canvas2.width=w*1;
	// canvas2.height=h*1;
	// var ctx2 = canvas2.getContext("2d");
	// var im2 = ctx2.getImageData(0,0,canvas2.width,canvas2.height);
	
	
	var im2 = new PNG ( {
						
							width: w,
							height: h,
							filterType: 4
					} );
	
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
	
return im2;
	
	
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
















