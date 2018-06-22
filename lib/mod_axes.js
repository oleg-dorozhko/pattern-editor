//!() !
console.log('mod axes on');
var PNG = require('pngjs').PNG;
module.exports.bothAxesMinus = bothAxesMinus;
module.exports.bothAxesPlus = both_axes_plus;

function both_axes_minus_with_param( s, callback )
{
	var n = Number(s.trim());
	if(isNaN(n)) return;
	for (var i = 0; i < n; i++) {
		
		both_axes_minus();
		
	}
	callback();
}

function bothAxesMinus(im0)
{
	
	var w = im0.width;
	var h = im0.height;

		var n=0;
		var m=0;
		
		
		if( im0.width%2 == 0  ) n = im0.width/2;
		else if( im0.width%2 == 1  ) n = (im0.width/2|0);
		
		
		if(im0.height%2 == 0) {  m = im0.height/2;  }
		else if(im0.height%2 == 1) { m = (im0.height/2|0); }
		
	
	var im = new PNG ( {
			
				width: w-1,
				height: h-1,
				filterType: 4
		} );
		
		
			
			for (var y = 0; y < im.height; y++) {
				
				
				
				for (var x = 0; x < im.width; x++) {
					
								
					var idx = (im.width * y + x) << 2;
					
					
					
						im.data[idx] = 255;
						im.data[idx+1] = 255;
						im.data[idx+2] = 255;
						im.data[idx+3] = 255;
						
					
					
					
				}
				
				
			}
		
		

		//left top
			var mm=0;
			for (var y = 0; y < m; y++) {
				
				
				var nn=0;
				for (var x = 0; x < n; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = im.width * mm + nn << 2;
					
					nn++;
					

					
						im.data[new_idx+0] = im0.data[idx+0];
						im.data[new_idx+1] =  im0.data[idx+1];
						im.data[new_idx+2] =  im0.data[idx+2];
						im.data[new_idx+3] =  im0.data[idx+3];
						
					
					
					
				}
				mm++;
				
			}
		
		
		//right top
			mm=0;
			for (var y = 0; y < m; y++) {
				
				
				var nn=n-1;
				for (var x = n; x < w; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = im.width * mm + nn << 2;
					
					nn++;
					

					
						im.data[new_idx+0] = im0.data[idx+0];
						im.data[new_idx+1] =  im0.data[idx+1];
						im.data[new_idx+2] =  im0.data[idx+2];
						im.data[new_idx+3] =  im0.data[idx+3];
						
					
					
					
				}
				mm++;
				
			}
		
		
		//left bottom
			mm=m-1;
			for (var y = m; y < h; y++) {
				
				
				var nn=0;
				for (var x = 0; x < n; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = im.width * mm + nn << 2;
					
					nn++;
					

					
						im.data[new_idx+0] = im0.data[idx+0];
						im.data[new_idx+1] =  im0.data[idx+1];
						im.data[new_idx+2] =  im0.data[idx+2];
						im.data[new_idx+3] =  im0.data[idx+3];
						
					
					
					
				}
				mm++;
				
			}
		
		
			mm=m-1;
			for (var y = m; y < h; y++) {
				
				
				var nn=n-1;
				for (var x = n; x < w; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = im.width * mm + nn << 2;
					
					nn++;
					

					
						im.data[new_idx+0] = im0.data[idx+0];
						im.data[new_idx+1] =  im0.data[idx+1];
						im.data[new_idx+2] =  im0.data[idx+2];
						im.data[new_idx+3] =  im0.data[idx+3];
						
					
					
					
				}
				mm++;
				
			}
		

			
			
			return im;
			
			
}


function getSomePart(im, sw,sh, nw, nh)
{
	
	var newpng = new PNG ( {
			
				width: nw,
				height: nh,
				filterType: 4
		} );
		
	newpng = clearResultPng(newpng);
		
		
		
		var n=0;
		var m=0;
			for (var y = 0; y < nh; y++) {
				
			
				for (var x = 0; x < nw; x++) {
					
					
					
						var idx = (im.width * (y+sh) + (x+sw)) << 2;
						var idx1 = (nw * m + n) << 2;
						newpng.data[idx1+0] = im.data[idx+0];
						newpng.data[idx1+1] = im.data[idx+1];
						newpng.data[idx1+2] = im.data[idx+2];
						newpng.data[idx1+3] = im.data[idx+3];
						n++;
					}
					n=0;
					m++;
		
				}
	
	
	return newpng;
	
	
	
	
}


function putSomePart(rim, im, sw,sh)
{
	
	
		
		var n=0;
		var m=0;
			for (var y = 0; y < im.height; y++) {
				
			
				for (var x = 0; x < im.width; x++) {
					
					
					
						var idx = (im.width * y + x) << 2;
						var idx1 = (rim.width * (m+sh) + (n+sw)) << 2;
						rim.data[idx1+0] = im.data[idx+0];
						rim.data[idx1+1] = im.data[idx+1];
						rim.data[idx1+2] = im.data[idx+2];
						rim.data[idx1+3] = im.data[idx+3];
						n++;
					}
		n=0;m++;
				}
	
	
	return rim;
	
	
	
	
}


function clearResultPng(im)
{
			
		
			for (var y = 0; y < im.height; y++) {
				
			
				for (var x = 0; x < im.width; x++) {
					
					
					
						var idx = (im.width * y + x) << 2;
						
						im.data[idx+0] = 0;
						im.data[idx+1] = 0;
						im.data[idx+2] = 0;
						im.data[idx+3] = 0;
					
					}
		
				}
	
	
	return im;
}


function both_axes_plus(im)
{
	//var cnv0 = document.getElementById("canvas");
	//var ctx0 = cnv0.getContext("2d");
	
	//getSomePart(im, nw, nh);
	
	
	
	
	var result_png = new PNG ( {
			
				width: im.width+1,
				height: im.height+1,
				filterType: 4
		} );
	
	
	result_png = clearResultPng(result_png);

	
	if ((im.width % 2 == 1) &&(im.height % 2 == 1))
	{
		var n1=(im.width / 2|0);
		//var n2=n1+2;
		var m1=(im.height / 2|0);
		//var m2=m1+2;
		
		
		
		var imgDt =  getSomePart(im, 0,0, n1+1,m1+1); // ctx0.getImageData(0,0,n1+1,m1+1);
		//result_png =imgDt;
		
		result_png = putSomePart(result_png,imgDt, 0,0);    //ctx.putImageData(imgDt,0,0);
		
		
		
		
		var imgDt2 = getSomePart(im,n1,0, n1+1,m1+1);      //ctx0.getImageData(n1,0,n1+1,m1+1);
		
		result_png = putSomePart(result_png,imgDt2, n1+1,0);     //ctx.putImageData(imgDt,n1+1,0);
		
		
		
		
		
		
		
		imgDt = getSomePart(im,0,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(0,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt, 0,m1+1); //ctx.putImageData(imgDt,0,m1+1);
		
		
		imgDt = getSomePart(im,n1,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(n1,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,n1+1,m1+1);//ctx.putImageData(imgDt,n1+1,m1+1);
		
		
		/**
		*/
		
		
		//imgDt = ctx0.getImageData(0,0,n1,m1);
		//ctx.putImageData(imgDt,0,0);
		
		//
		
	}
	else if ((im.width % 2 == 0) &&(im.height % 2 == 0))
	{
		var n1=(im.width / 2);
		//var n2=n1+2;
		var m1=(im.height / 2);
		//var m2=m1+2;
		
		var imgDt =  getSomePart(im,0,0,n1+1,m1+1);///ctx0.getImageData(0,0,n1+1,m1+1);
		
		result_png = putSomePart(result_png,imgDt,0,0);///ctx.putImageData(imgDt,0,0);
				
		
		imgDt =  getSomePart(im,n1,0,n1+1,m1+1);//imgDt = ctx0.getImageData(n1,0,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,n1+1,0);//ctx.putImageData(imgDt,n1+1,0);
			
	
		imgDt =  getSomePart(im,0,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(0,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,0,m1+1); //ctx.putImageData(imgDt,0,m1+1);
		
		
		imgDt =  getSomePart(im,n1,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(n1,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,n1+1,m1+1);//ctx.putImageData(imgDt,n1+1,m1+1);
		/**/
		
	}
	
	
	
	
	return result_png;
	
	
	
	
}









function horizontal_axe_minus( ) //minus one horizontal line
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( h==1 )
		{
			
			errror("mod_axes: horizontal_axe_minus: error: too small size (need height > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,canvas.width,(canvas.height/2|0));
	var im1 = context.getImageData(0,(canvas.height/2|0)+1,canvas.width,(canvas.height/2|0));
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w;
		canvas2.height = h-1;
		var context2 = canvas2.getContext("2d");
		
		context2.putImageData(im0, 0,0);
		context2.putImageData(im1, 0,(canvas.height/2|0));
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
		
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('horizontal_axe_minus'); //after or before? what question
			}, 200 );	
			
			
			
			
}			


function vertical_axe_minus( ) //minus one vertical line
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( w==1 )
		{
			
			errror("mod_axes: vertical_axe_minus: error: too small size (need width > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,(canvas.width/2|0),canvas.height);
	var im1 = context.getImageData((canvas.width/2|0)+1,0,(canvas.width/2|0),canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w-1;
		canvas2.height = h;
		var context2 = canvas2.getContext("2d");
		
		context2.putImageData(im0, 0,0);
		context2.putImageData(im1, (canvas.width/2|0),0);
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
		
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('vertical_axe_minus'); //after or before? what question
			}, 200 );	
			
			
			
			
}			