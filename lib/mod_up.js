console.log('mod up on');
var PNG = require('pngjs').PNG;
var mod_mirror = require('./mod_mirror');
var mod_median = require('./mod_median');
module.exports.upForImageData = upForImageData;


var global_up_counter=1;

function getPartOfImageData(im,x,y,w,h)
{
	var canvas = document.createElement('canvas');
	canvas.width = im.width;
	canvas.height = im.height;
	var context = canvas.getContext("2d");
	context.putImageData(im,0,0);
	return context.getImageData(x, y, w, h);
}

function upForImageData(im)
{
	return up_image_data( im, 1 );
}


function up(id){

//global_up_counter++;
global_up_counter = Number(document.getElementById('up_step').value);
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var im=null;
	if( ( w%2==1) && (h%2==1) )
	{
		var nw = (w/2|0)+1;
		var nh = (h/2|0)+1;	
		im = context.getImageData(global_up_counter,global_up_counter,nw-global_up_counter,nh-global_up_counter);
	
		//canvas.width = nw;
		//canvas.height = nh;
		
		
	}
	else if( ( w%2==0) && (h%2==0) )
	{
		var nw = w/2;
		var nh = h/2;	
		im = context.getImageData(global_up_counter,global_up_counter,nw-global_up_counter,nh-global_up_counter);
		//canvas.width = nw;
		//canvas.height = nh;
		//canvas.getContext("2d").putImageData(im,0,0);
	}
		
if(global_up_counter>nw)
{
	//alert('too many ups');
	global_up_counter=1;
	up(id);
}

var	im0 = context.getImageData(0,0,global_up_counter,global_up_counter);
	var	im1 = context.getImageData(global_up_counter,0,nw-global_up_counter,global_up_counter);
	var	im2 = context.getImageData(0,global_up_counter,global_up_counter,nh-global_up_counter);
	var canvas2 = document.createElement("canvas");
	canvas2.width=w;
	canvas2.height=h;
	var context2 = canvas2.getContext("2d");
	canvas2.getContext("2d").putImageData(im,0,0);
	canvas2.getContext("2d").putImageData(im0,nw-global_up_counter,nh-global_up_counter);
	
	//im1 = mirror_right(im1);
	//im1 = getPartOfImageData(im1,im1.width/2,0,im1.width/2,im1.height);
	canvas2.getContext("2d").putImageData(im1,0,nh-global_up_counter);
	
	//im2 = mirror_down(im2);
	//im2 = getPartOfImageData(im2,0,im2.height/2,im2.width,im2.height/2);
	canvas2.getContext("2d").putImageData(im2,nw-global_up_counter,0);
	
	im=canvas2.getContext("2d").getImageData(0,0,canvas2.width,canvas2.height);
	
	/**
	var n=0;
	var y=nh-1;
	for(var i=nw-1;i>=0;i--)
	{
		
		var idx = (w * y + i) << 2;

		im.data[idx+0] = im1.data[n];
		im.data[idx+1] = im1.data[n+1];
		im.data[idx+2] = im1.data[n+2];
		im.data[idx+3] = im1.data[n+3];
					
		n+=4;			

	}
	var x=nw-1;
	var m=0;
	for(var j=nh-1;j>=0;j--)
	{
		var idx = (w * j + x) << 2;

		im.data[idx+0] = im2.data[m];
		im.data[idx+1] = im2.data[m+1];
		im.data[idx+2] = im2.data[m+2];
		im.data[idx+3] = im2.data[m+3];
					
		m+=4;	
	}
	
	canvas2.getContext("2d").putImageData(im,0,0);
		*/
	im = mirror_right(canvas2.getContext("2d").getImageData(0,0,nw,nh));
	
	im = mirror_down(im);
	

	canvas.width=im.width;
	canvas.height=im.height;
	canvas.getContext("2d").putImageData(im,0,0);
	
	return im;

}

function __node__getPartOfImageData(im,x0,y0,w,h)
{
	
		var newpng = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );

	
	
		var m=0;
		var n=0;
			for (var y = y0; y < (y0+h); y++) {
				n=0;
				for (var x = x0; x < (x0+w); x++) {
					var idx = (im.width * y + x) << 2;
					var idx2 = (newpng.width * m + n) << 2;
					
				
					newpng.data[idx2] = im.data[idx];
					newpng.data[idx2+1] = im.data[idx+1];
					newpng.data[idx2+2] = im.data[idx+2];
					newpng.data[idx2+3] = im.data[idx+3];
					n++;
				}
				m++;
			}
			
			return newpng;
			
}


function __node__setImageDataToImageData(dest,source,x0,y0)
{
	
	
		var newpng = new PNG ( {
			
				width: dest.width,
				height: dest.height,
				filterType: 4
		} );

		
		for (var y = 0; y < dest.height; y++) {
				
				for (var x = 0; x < dest.width; x++) {
					
					var idx = (dest.width * y + x) << 2;
					
					
					newpng.data[idx] = dest.data[idx];
					newpng.data[idx+1] = dest.data[idx+1];
					newpng.data[idx+2] = dest.data[idx+2];
					newpng.data[idx+3] = dest.data[idx+3];
					
				}
			
			}
	
	var m=0;
	var n=0;
			
			for (var y = y0; y < (y0+source.height); y++) {
				n=0;
				for (var x = x0; x < (x0+source.width); x++) {
					
					var idx = (dest.width * y + x) << 2;
					var idx2 = (source.width * m + n) << 2;
					
					newpng.data[idx] = source.data[idx2];
					newpng.data[idx+1] = source.data[idx2+1];
					newpng.data[idx+2] = source.data[idx2+2];
					newpng.data[idx+3] = source.data[idx2+3];
					n++;
				}
				m++;
			}
			
	return newpng;
			
}


function up_image_data( imageData, up_counter ){

	
	
	var w = imageData.width;
	var h = imageData.height;
	
	
	
	
	//var w = canvas.width;
	//var h = canvas.height;
	var im=null;
	if( ( w%2==1) && (h%2==1) )
	{
		var nw = (w/2|0)+1;
		var nh = (h/2|0)+1;	
		//im = context.getImageData(up_counter,up_counter,nw-up_counter,nh-up_counter);
	im = __node__getPartOfImageData(imageData,up_counter,up_counter,nw-up_counter,nh-up_counter);
		//canvas.width = nw;
		//canvas.height = nh;
		
		
	}
	else if( ( w%2==0) && (h%2==0) )
	{
		var nw = w/2;
		var nh = h/2;	
		
		//im = context.getImageData(up_counter,up_counter,nw-up_counter,nh-up_counter);
	im = __node__getPartOfImageData(imageData,up_counter,up_counter,nw-up_counter,nh-up_counter);	
		//canvas.width = nw;
		//canvas.height = nh;
		//canvas.getContext("2d").putImageData(im,0,0);
	}
		
if(up_counter>nw)
{
	//alert('too many ups');
	up_counter=1;
	return up_image_data( imageData, 1 );
}
else
{

var	im0 = __node__getPartOfImageData(imageData,0,0,up_counter,up_counter);	//context.getImageData(0,0,up_counter,up_counter);
	var	im1 = __node__getPartOfImageData(imageData,up_counter,0,nw-up_counter,up_counter); //context.getImageData(up_counter,0,nw-up_counter,up_counter);
	var	im2 = __node__getPartOfImageData(imageData,0,up_counter,up_counter,nh-up_counter);//context.getImageData(0,up_counter,up_counter,nh-up_counter);
	
	var imageData2 = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
	//canvas2.getContext("2d").putImageData(im,0,0);
	imageData2 = __node__setImageDataToImageData(imageData2,im,0,0);
	
	//canvas2.getContext("2d").putImageData(im0,nw-up_counter,nh-up_counter);
	imageData2 = __node__setImageDataToImageData(imageData2,im0,nw-up_counter,nh-up_counter);
	
	//im1 = mirror_right(im1);
	//im1 = getPartOfImageData(im1,im1.width/2,0,im1.width/2,im1.height);
	//canvas2.getContext("2d").putImageData(im1,0,nh-up_counter);
	imageData2 = __node__setImageDataToImageData(imageData2,im1,0,nh-up_counter);
	
	//im2 = mirror_down(im2);
	//im2 = getPartOfImageData(im2,0,im2.height/2,im2.width,im2.height/2);
	//canvas2.getContext("2d").putImageData(im2,nw-up_counter,0);
	imageData2 = __node__setImageDataToImageData(imageData2,im2,nw-up_counter,0);
	
	//im=canvas2.getContext("2d").getImageData(0,0,canvas2.width,canvas2.height);
	
	/**
	var n=0;
	var y=nh-1;
	for(var i=nw-1;i>=0;i--)
	{
		
		var idx = (w * y + i) << 2;

		im.data[idx+0] = im1.data[n];
		im.data[idx+1] = im1.data[n+1];
		im.data[idx+2] = im1.data[n+2];
		im.data[idx+3] = im1.data[n+3];
					
		n+=4;			

	}
	var x=nw-1;
	var m=0;
	for(var j=nh-1;j>=0;j--)
	{
		var idx = (w * j + x) << 2;

		im.data[idx+0] = im2.data[m];
		im.data[idx+1] = im2.data[m+1];
		im.data[idx+2] = im2.data[m+2];
		im.data[idx+3] = im2.data[m+3];
					
		m+=4;	
	}
	
	canvas2.getContext("2d").putImageData(im,0,0);
		*/
		
	im = mod_mirror.mirror_right(__node__getPartOfImageData(imageData2,0,0,nw,nh));
	//im = mirror_right(imageData2);
	im = mod_mirror.mirror_down(im);
	//im = mirror_down(im);
	

	//canvas.width=im.width;
	//canvas.height=im.height;
	//canvas.getContext("2d").putImageData(im,0,0);
	
	return im;
	//return imageData2;
}

}