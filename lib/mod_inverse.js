console.log('mod inverse on');
var PNG = require('pngjs').PNG;
module.exports.inverse = inverse;

function inv ( a )
{
	return (255 - a);
}


function inverse(im0)
{

	var w = im0.width;
	var h = im0.height;
	
	
	var im = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
				
	
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   inv ( im0.data[idx] );
					im.data[new_idx+1] =  inv ( im0.data[idx+1] );
					im.data[new_idx+2] =  inv ( im0.data[idx+2] );
					im.data[new_idx+3] =  255;
					
					
					
					
				}
			}

			return im;
			
			
			
}			

