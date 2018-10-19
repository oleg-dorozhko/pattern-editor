console.log('mod black white on');
var PNG = require('pngjs').PNG;
module.exports.black_white = black_white;

function black_white(ish_png) 
{  
	var result_png = new PNG ( {
						
							width: ish_png.width,
							height: ish_png.height,
							filterType: 4
					} );

			for (var y = 0; y < ish_png.height; y++) {
				for (var x = 0; x < ish_png.width; x++) {
					var idx = (ish_png.width * y + x) << 2;

					
					var maxind = -1;
					var maxred = 0;
					
					var arr = [];
					arr[0] = ish_png.data[idx];
					arr[1] = ish_png.data[idx+1];
					arr[2] = ish_png.data[idx+2];
					
					for(var n=0;n<3;n++)
					{
						if(arr[n]>=maxred)
						{
							maxind=n;
							maxred = arr[n];
						}
					}
					
					result_png.data[idx] = arr[maxind];
					result_png.data[idx+1] = arr[maxind];
					result_png.data[idx+2] = arr[maxind];
					result_png.data[idx+3] = ish_png.data[idx+3];
					
					
				}
			}
			
			
			
			
			
			return result_png;
			
			
}