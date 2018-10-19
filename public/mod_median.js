console.log('mod median on');
var PNG = require('pngjs').PNG;
module.exports.__median = median;

function median(im)
{

/********************* for oddd -----------

=========================
mod_median.js:25 w=9   w+1=10    (w+1)/2=5
mod_median.js:26 w-n=4  (w-n)/2=2
mod_median.js:24 =========================
mod_median.js:25 w=11   w+1=12    (w+1)/2=6
mod_median.js:27 w-(n+1)=4  (w-(n+1))/2=2
mod_median.js:24 =========================
mod_median.js:25 w=13   w+1=14    (w+1)/2=7
mod_median.js:26 w-n=6  (w-n)/2=3
mod_median.js:24 =========================
mod_median.js:25 w=15   w+1=16    (w+1)/2=8
mod_median.js:27 w-(n+1)=6  (w-(n+1))/2=3
mod_median.js:24 =========================

****************************************/
	
	//var canvas = document.getElementById("canvas");
	//var context = canvas.getContext("2d");
	
	var w = im.width;
	var h = im.height;
	
	
	
	if( h == 1 || w==1 )
	{
		
		errror("mod_median: median: error: too small size (need result height > 1 || width > 1)");
		return;
		
	}
	
	if (w%2==1)
	{
	
		var x0 = 0;
		
		var n = (w+1)/2;
		if(n%2==1)
		{
			var xlength = n;
			x0 = (w-xlength)/2;
		}
		else
		{
			var xlength = (n+1);
			x0 = (w-xlength)/2;
		}
		
		
		// console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		// if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
	
	}
	else
	{
		var x0 = 0;
		
		var n = w/2;
		if(w%4==0)
		{
			var xlength = w/2;
			x0 = w/4;
		}
		else
		{
			var xlength = (n+1);
			x0 = (w-xlength)/2;
		}
		
	}
	
	if (h%2==1)
	{
	
		var y0 = 0;
		
		var m = (h+1)/2;
		if(m%2==1)
		{
			var ylength = m;
			y0 = (h-ylength)/2;
		}
		else
		{
			var ylength = (m+1);
			y0 = (h-ylength)/2;
		}
		
		
		// console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		// if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
	
	}
	else
	{
		var y0 = 0;
		
		var m = h/2;
		if(h%4==0)
		{
			var ylength = h/2;
			y0 = h/4;
		}
		else
		{
			var ylength = (m+1);
			y0 = (h-ylength)/2;
		}
	}
	
	var newpng = new PNG ( {
			
				width: xlength,
				height: ylength,
				filterType: 4
		} );
		
		var m=0;
		var n=0;
			for (var y = y0; y < ylength*2; y++) {
				n=0;
				for (var x = x0; x < xlength*2; x++) {
					var idx = (w * y + x) << 2;
					var idx2 = (newpng.width * m + n) << 2;
					
				
					newpng.data[idx2] = im.data[idx];
					newpng.data[idx2+1] = im.data[idx+1];
					newpng.data[idx2+2] = im.data[idx+2];
					newpng.data[idx2+3] = im.data[idx+3];
					n++;
				}
				m++;
			}
			
	
	console.log("\nmedian\n");
	console.log("for w="+w+" h=" + h + " median()=[ from x0="+x0+"   y0="+y0+"   xlength="+xlength+"   ylength="+ylength+ "] ");
	
	return newpng;
	

			
			
}
	