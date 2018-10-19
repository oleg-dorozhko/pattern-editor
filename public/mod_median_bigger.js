function median()
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
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	
	
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
	
	
	
	
	var im0 = context.getImageData(x0,y0,xlength,ylength);
	canvas.width = xlength;
	canvas.height = ylength;
	context = canvas.getContext("2d");
	context.putImageData(im0,0,0);
	console.log("for w="+w+" h=" + h + " median()=[ from x0="+x0+"   y0="+y0+"   xlength="+xlength+"   ylength="+ylength+ "] ");
	
	/***********
	
	
	
	
	for ( var i= 1;i<20;i+=2)
	{
		w=i;
		h=i;
		var n = (w+1)/2;
		console.log("=========================");
		console.log("w="+w+"   w+1="+(w+1)+"    (w+1)/2="+n);
		if(n%2==1) console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
		//console.log(+"    (w/2|0)+1="+((w/2|0)+1) + "      ");
		//console.log("h="+h+" h/2|0="+(h/2|0)+"(h/2|0)+1="+((h/2|0)+1));
	}
	
	************/
	/*******
	for ( var i= 2;i<20;i+=2)
	{
		w=i;
		h=i;
		console.log("w="+w+" w/2|0="+(w/2|0)+"     (w/2|0)+1="+((w/2|0)+1));
		//console.log("h="+h+" h/2|0="+(h/2|0)+"(h/2|0)+1="+((h/2|0)+1));
	}
	**********/
	
	// w = canvas.width;
	// h = canvas.height;
			
	/**********


	var canvas2 = document.createElement("canvas");
		canvas2.width = w/2|0;
		canvas2.height = h/2|0;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

	
		/*********	
			

		for (var y = 0; y < h; y+=2) {
			for (var x = 0; x < w; x+=2) {
				
				var idx = (w * y + x) << 2;
				
				var new_idx = canvas2.width * (y/2) + (x/2) << 2;
				//var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
				
				im.data[new_idx] = im0.data[idx];
				im.data[new_idx+1] = im0.data[idx+1];
				im.data[new_idx+2] = im0.data[idx+2];
				im.data[new_idx+3] = im0.data[idx+3];

				
				
			}
		}

		***************/
		/****	
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
		******/	
		
		setTimeout( function(){
				logg('median'); //after or before? what question
			}, 200 );	
			
			
}
	