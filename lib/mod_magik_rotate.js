console.log('mod magik rotate on');
var PNG = require('pngjs').PNG;
var mod_mirror = require('./mod_mirror');
var mod_half = require('./mod_half');
module.exports.magik_rotate = magik_rotate;
//module.exports.nonineth = nonineth;

function magik_rotate(im, angle)
{console.log('angle='+angle);
	if(angle==undefined) angle=1;
	return mod_nova_rotate2_cliped_rotate_wrapper(im,angle);

	
	
	
	
}

function mod_nova_rotate2_cliped_rotate_wrapper(imageData,ang_rn)
{
	
	
	var imageData0 = mod_nova_rotate2_rotate_nova_auto(imageData,ang_rn);
	
	var imageData01=mod_nova_rotate2_clip(imageData0);
	
	var imageData1 = mod_nova_rotate2_rotate_nova_auto(imageData,-ang_rn);
	
	var imageData11=mod_nova_rotate2_clip2(imageData1);
	
	var imageData2 = mod_nova_rotate2_combo_cliped(imageData01,imageData11);
	
	
	
	 imageData2 = vortex(mod_half.half(imageData2));
	
	// var x = (imageData2.width-imageData.width)/2;
	// var y = (imageData2.height-imageData.height)/2;
	// var w = imageData.width;
	// var h = imageData.height;
	
	// var crop_settings = {};
	// crop_settings.x= x;
	// crop_settings.y= y;
	// crop_settings.w= imageData2.width;
	// crop_settings.h= imageData2.height;
	
	// return newcroplt( imageData2,  crop_settings );
	
	// crop_settings.x= x2;
	// crop_settings.y= y2;
	
	// imageData2 = newcroprb(imageData2,  crop_settings);
	
	return imageData2;
	
	//return __frame_imageData(imageData2,x,y,w,h);
	
}




function __frame_imageData(imageData2,x0,y0,w0,h0)
{
	
	//console.log("half");
	var w = imageData2.width;
	var h = imageData2.height;
	
	var im2 = new PNG ( {
			
				width: w0,
				height: h0,
				filterType: 4
		} );
		
	var n=0;
	var m=0;	
	for (y = 0; y < h; y++) {
				
		
		n=0;	
		for (x = 0; x< w; x++) {
				
				
				if( (x>=x0) && (x<(x0+w0))   &&  (y>=y0) && (y<(y0+h0))  )
				{
				
					var color = getColorArrayFromImageData(imageData2, x, y)
					
					im2 = mod_nova_rotate2_fillRectanglePro(im2, n, m, 1, 1, color );
					
					n++;
				
				}
		}
		
		if(y>=y0) m++;
		
	}
	
	
	return im2;

}


//x' = x cos f - y sin f
//y' = y cos f + x sin f

// 40° = 40·π / 180 = 2π/9 //cos 45 = 0.71 priblisit sqrt(2)/2
function mod_nova_rotate2_rotate_one_xy_obj(point, mcos, msin){
           var rotated_point={};
           rotated_point.x = point.x * mcos - point.y * msin;
           rotated_point.y = point.x * msin + point.y * mcos;
           return rotated_point;
}

function mod_nova_rotate2_fillRectanglePro(imgData2, i0, j0, n, m, col)
{
	
	for(var j=j0;j<j0+m;j++)
	{
		for(var i=i0;i<i0+n;i++)
		{
			var idx2 = (imgData2.width * j + i ) << 2;
			imgData2.data[idx2]=col[0];
			imgData2.data[idx2+1]=col[1];
			imgData2.data[idx2+2]=col[2];
			imgData2.data[idx2+3]=col[3];
			
		}
	}
	
	return imgData2;
}


function mod_nova_rotate2_rotate_nova_auto(imageData,ang_rn)
{
	
	var angle = ang_rn * Math.PI / 180;
	
	var w = imageData.width;
	var h = imageData.height;
	
		var im2 = new PNG ( {
			
				width: w*3/2,
				height: h*3/2,
				filterType: 4
		} );
	
	
						
	
	for (var y = 0; y < im2.height; y++) {
				
		
				
		for (var x = 0; x < im2.width; x++) {
			
			im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [0,0,0,255]);
			
					
	}}
	
	var w2 = 0;
	if(im2.width%2==1)w2=im2.width+1;else w2=im2.width;
	var h2 =0;
	if(im2.height%2==1)h2=im2.height+1;else h2=im2.height;
	
	
	var cx = w/2|0;
	var cy = h/2|0;
	var cx2=cx*3/2;
	var cy2=cy*3/2;
	
	var mcos = Math.cos(angle);
	var msin = Math.sin(angle);
	
	//if(w%2==0) cx2=cx+1;
	//if(h%2==0) cy2=cy+1;
	var one_third=1/3;
	var two_third=2/3;
	for(var y=-cy;y<cy;y++)
	{   


		for(var x=-cx;x<cx;x++)
		{


			
			var ind = imageData.width * (y+cy) + (x+cx) << 2;
			var col = [imageData.data[ind],imageData.data[ind+1],imageData.data[ind+2],imageData.data[ind+3]];
			
			var obj = {};
			obj.x=x;
			obj.y=y;
			obj = mod_nova_rotate2_rotate_one_xy_obj(obj, mcos,msin);
			
			obj.x=cx2+obj.x;
			obj.y=cy2+obj.y;
			
			var clx = obj.x|0;
			var dx = obj.x - clx;
			var cly = obj.y|0;
			var dy = obj.y - cly;
			
			obj.x=clx;
			obj.y=cly;
			
			var x2=0;
			var y2=0;
			//console.log('x='+x+',  obj.x='+obj.x+' obj.x|0='+(obj.x|0));
			//console.log('y='+y+',  obj.y='+obj.y+' obj.y|0='+(obj.y|0));
			//dx=Math.abs(dx);
			//dy=Math.abs(dy);
			obj.x=obj.x;
			/**
			if(dx<one_third)
			{
				obj.x=obj.x-1;
				
			}
			else if (dx>=two_third)
			{
				obj.x=obj.x+1;
			}
			
			obj.y=obj.y;
			if(dy<one_third)
			{
				obj.y=obj.y-1;
			}
			else if (dy>=two_third)
			{
				obj.y=obj.y+1;
			}
			**/
			var dr=2;
			im2 = mod_nova_rotate2_fillRectanglePro(im2, obj.x, obj.y, dr, dr, col);
			//ctx2.fillStyle = 'rgba('+col[0]+','+col[1]+','+col[2]+','+(col[3]/255)+')';
			//ctx2.fillRect(obj.x, obj.y,1,1);
		}
	}
	return im2;
	
	
}

function mod_nova_rotate2_get_color(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}



// function mod_nova_rotate2_clip_wrapper(n)
// {
	// var cnv = document.getElementById('canvas0');
	// var ctx = cnv.getContext("2d");
	// var imageData = ctx.getImageData(0,0,cnv.width,cnv.height);  
	// if(n==1)	imageData=mod_nova_rotate2_clip(imageData);
	// else if(n==2)	imageData=mod_nova_rotate2_clip2(imageData);
	// ctx.putImageData(imageData,0,0);
// }



function mod_nova_rotate2_clip(imageData)
{
	
	
	
	var w =imageData.width;
	var h=imageData.height;
	
	var im2 = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
	
						
	var n=0;
	for (var y = 0; y < im2.height; y++) {
				
		
				
		for (var x = 0; x < im2.width; x++) {
			
			if(x>=n)
			{
				if(x<im2.width/2 )  im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
				else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
			}
			else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
					
		}
		n++;
		if(n==im2.width/2) n=im2.width;
	}
	var step= -1;
	var n=im2.width-1;
	for (var y = 0; y < im2.height; y++) {
				
		
				
		for (var x = im2.width/2; x < im2.width; x++) {
			
			if(x>=n)
			{ im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
				//if(x<im2.width/2 ) 
				//else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
			}
			else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
					
		}
		n+=step;
		if(n<=im2.width/2-1) {n=im2.width;step=0;}
	}
	
	var step= -1;
	var n=im2.width/2-1;
	for (var y = im2.height/2; y < im2.height; y++) {
				
		
				
		for (var x = 0; x < im2.width; x++) {
			
			if(x<=n)
			{  im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
				
				//if(x<im2.width/2 ) 
				//else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
			}
			else
					im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
		}
		n+=step;
		if(n<0) {n=im2.width/2;step=0;}
	}
	
	
	
	
	var n=im2.width/2;
	for (var y = im2.height/2; y < im2.height; y++) {
				
		
				
		for (var x = im2.width/2; x < im2.width; x++) {
			
			// if(x>=n)
			// { 
		// im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
				
			// }
			// else
				if(x<=n) im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
				//else 
				else	im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
		}
		n++;
		if(n==im2.width/2) n=im2.width;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	return im2;
	
	
}






function mod_nova_rotate2_clip2(imageData)
{
	
	
	
	var w =imageData.width;
	var h=imageData.height;
	
	var im2 = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
						
	var n=0;
	for (var y = 0; y < im2.height; y++) {
				
		
				
		for (var x = 0; x < im2.width; x++) {
			
			if(x>=n)
			{
				im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
				
			}
			else 
			{
				if(x<im2.width/2 )  im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
				else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y)); 
			}
					
		}
		n++;
		if(n==im2.width/2) n=im2.width;
	}
	var step= -1;
	var n=im2.width-1;
	for (var y = 0; y < im2.height; y++) {
				
		
				
		for (var x = im2.width/2; x < im2.width; x++) {
			
			if(x>=n)
			{  im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
				//if(x<im2.width/2 ) 
				//else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
			}
			else
					im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
		}
		n+=step;
		if(n<=im2.width/2-1) {n=im2.width;step=0;}
	}
	
	var step= -1;
	var n=im2.width/2-1;
	for (var y = im2.height/2; y < im2.height; y++) {
				
		
				
		for (var x = 0; x < im2.width; x++) {
			
			if(x<=n)
			{ 
				im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
				//if(x<im2.width/2 ) 
				//else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
			}
			else im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
					
		} 
		n+=step;
		if(n<0) {n=im2.width/2;step=0;}
	}
	
	
	
	
	var n=im2.width/2;
	for (var y = im2.height/2; y < im2.height; y++) {
				
		
				
		for (var x = im2.width/2; x < im2.width; x++) {
			
			// if(x>=n)
			// { 
		// im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
				
			// }
			// else
				if(x<=n) im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1,mod_nova_rotate2_get_color(imageData, x, y));
				//else 
				else	im2 = mod_nova_rotate2_fillRectanglePro(im2, x, y, 1, 1, [255,0,0,127]);
		} 
		n++;
		if(n==im2.width/2) n=im2.width;
	}
	
	
	
	
	return im2;
	
	
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








	
	
	function newcroplt(ish_png,  crop_settings)
	{
		
			var xw = crop_settings.x;
			var yh = crop_settings.y;
			var w = crop_settings.w;
		    var h = crop_settings.h;
			
			var newpng = new PNG ( {
													
				width: w-xw,
				height: h-yh,
				filterType: 4
				
			} );

			
			var m=0;
			for (var y = 0; y < ish_png.height; y++) {
				
				var n=0;
				for (var x = 0; x < ish_png.width; x++) {
					
					/***
					console.log("x="+x);
					console.log("y="+y);
					console.log("n="+n);
					console.log("m="+m);
					***/
					if( x>=xw  && y>=yh )
					{
						var idx = (ish_png.width * y + x) << 2;
						
						var newidx = (newpng.width * m + n) << 2;

						newpng.data[newidx+0] = ish_png.data[idx+0];
						newpng.data[newidx+1] = ish_png.data[idx+1];
						newpng.data[newidx+2] = ish_png.data[idx+2];
						newpng.data[newidx+3] = ish_png.data[idx+3];
						
						n++;
					}
				}
				
				if(y>=yh) m++;
			}


			
			return newpng;
			


											
	}
	
	function newcroprb(ish_png, crop_settings)
	{
		
			
			var xw = crop_settings.x;
			var yh = crop_settings.y;
			
			var newpng = new PNG ( {
													
				width: xw+1,
				height: yh+1,
				filterType: 4
				
			} );

			for (var y = 0; y < newpng.height; y++) {
				
				for (var x = 0; x < newpng.width; x++) {
					
					var idx = (ish_png.width * y + x) << 2;
					var newidx = (newpng.width * y + x) << 2;

					newpng.data[newidx+0] = ish_png.data[idx+0];
					newpng.data[newidx+1] = ish_png.data[idx+1];
					newpng.data[newidx+2] = ish_png.data[idx+2];
					newpng.data[newidx+3] = ish_png.data[idx+3];
				}
			}

			return newpng;
			

		
											
	}
	

















function mod_nova_rotate2_combo_cliped(imageData01,imageData11)
{
	for (var n = 0; n < imageData01.data.length-4; n+=4) {
		
		if((imageData01.data[n]==255)&&(imageData01.data[n+3]==127))
		{
			imageData01.data[n]=imageData11.data[n];
			imageData01.data[n+1]=imageData11.data[n+1];
			imageData01.data[n+2]=imageData11.data[n+2];
			imageData01.data[n+3]=imageData11.data[n+3];
		}
		
		
	}
	return imageData01;
}

 function vortex(imgDataResult)
{
	imgDataResult = mod_mirror.mirror_right(imgDataResult);
				
	return mod_mirror.mirror_down(imgDataResult);
}


