console.log('mod rotate any on');
var PNG = require('pngjs').PNG;
module.exports.rotate_any = rotate_any;

function rotate_any(im,params)
{
	
	
	var w = im.width;
	var h = im.height;

	var lim=params.degree;
	for (var y = 0; y < lim; y++) {
				
		
				
		for (var x = 0; x < lim; x++) {
					
			
					
				var idx = (w * y + x) << 2;
			
				im.data[idx+0]=255;
				im.data[idx+1]=255;
							
		}
	}
	
	
	return im;
	
	
}