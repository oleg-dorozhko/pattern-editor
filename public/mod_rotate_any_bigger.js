console.log('mod rotate any on');
var PNG = require('pngjs').PNG;
module.exports.rotate_any = rotate_any;

function rotate_any(im,params)
{
	console.log('fchre78');
	//return my_rotate_sprite (im, params.degree, 1);
	//return __rotate_any(im,params.degree);
	return rotate_nova_auto(im,params.degree);
	
	
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

function my_rotate_sprite (im, degree, scale)
{
	
	var im2 = new PNG ( {
						
							width: im.width,
							height: im.height,
							filterType: 4
					} );
    // current position in the source bitmap
    var src_x, src_y;

    // current position in the destination bitmap
    var dest_x, dest_y;

    // src_x and src_y will change each time by dx and dy
    var dx, dy;

    // src_x and src_y will be initialized to start_x and start_y
    // at the beginning of each new line
    var start_x = 0;
	var start_y = 0;

    // We create a bit mask to make sure x and y are in bounds.
    // Unexpected things will happen
    // if the width or height are not powers of 2.
    var x_mask = im.width - 1;
    var y_mask = im.height - 1;

    // calculate increments for the coordinates in the source bitmap
    // for when we move right one pixel on the destination bitmap
    dx = Math.cos(degree);     //*scale;//fmul (fcos (angle), scale);
    dy = Math.sin (degree);    //*scale;//fmul (fsin (angle), scale);

    for (dest_y = 0; dest_y < im2.height; dest_y++)
    {
        // set the position in the source bitmap to the
        // beginning of this line
        src_x = start_x;
        src_y = start_y;

        for (dest_x = 0; dest_x < im2.width; dest_x++)
        {
            // Copy a pixel.
            // This can be optimized a lot by using
            // direct bitmap access.
           im2 = putpixel (im2, im2.width, dest_x, dest_y, getpixel (im, src_x & x_mask, src_y & y_mask));

            // advance the position in the source bitmap
            src_x += dx;
            src_y += dy;
        }

        // for the next line we have a different starting position
        start_x -= dy;
        start_y += dx;
    }
	
	return im2;
}

function getpixel(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function putpixel(im0, w, i,j,color)
{
	var idx = w * j + i << 2;
	
	im0.data[idx] = color[0];
	im0.data[idx+1] = color[1];
	im0.data[idx+2] = color[2];
	im0.data[idx+3] = color[3];
	
	return im0;
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
	
	
	var radians = (Math.PI / 180) * degree;
    var    cos = Math.cos(radians);
    var    sin = Math.sin(radians);
	
	for (var y = 0; y < h; y++) {
				
		
				
		for (var x = 0; x < w; x++) {
					
			
				var color = getColorArrayFromImageData(im, x, y);
				
				var arr= rotate_sin_cos(cx, cy, x, y,  cos, sin) ;
				
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
function rotate_sin_cos(cx, cy, x, y, cos, sin) {
    
	//	nx = ( (cos * (x - cx)) + (sin * (y - cy)) + cx),
    //    ny = ( (cos * (y - cy)) - (sin * (x - cx)) + cy) ;
    var  nx = (( (cos * (x - cx)) + (sin * (y - cy)) + cx) |0);
    var  ny = (( (cos * (y - cy)) - (sin * (x - cx)) + cy) |0);
    return [nx, ny];
}



//x' = x cos f - y sin f
//y' = y cos f + x sin f

// 40° = 40·π / 180 = 2π/9 //cos 45 = 0.71 priblisit sqrt(2)/2
function rotate_one_xy_obj(point, mcos, msin){
           var rotated_point={};
           rotated_point.x = point.x * mcos - point.y * msin;
           rotated_point.y = point.x * msin + point.y * mcos;
           return rotated_point;
}

function fillRectanglePro(imgData2, i0, j0, n, m, col)
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


function rotate_nova_auto(imageData,ang_rn)
{
	
	var angle = ang_rn * Math.PI / 180;
	
	var w =imageData.width;
	var h=imageData.height;
	
	var im2 = new PNG ( {
						
							width: w*3/2,
							height: h*3/2,
							filterType: 4
					} );
	
	for (var y = 0; y < im2.height; y++) {
				
		
				
		for (var x = 0; x < im2.width; x++) {
			
			im2 = fillRectanglePro(im2, x, y, 1, 1, [0,0,0,255]);
			
					
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
			obj = rotate_one_xy_obj(obj, mcos,msin);
			
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
			im2 = fillRectanglePro(im2, obj.x, obj.y, dr, dr, col);
			//ctx2.fillStyle = 'rgba('+col[0]+','+col[1]+','+col[2]+','+(col[3]/255)+')';
			//ctx2.fillRect(obj.x, obj.y,1,1);
		}
	}
	return im2;
	
	
}










