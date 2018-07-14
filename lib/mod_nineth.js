//!() !
console.log('mod nineth on');
var PNG = require('pngjs').PNG;
module.exports.nineth = nineth;
module.exports.nonineth = nonineth;
/*
function smooth(im)
{   cnv.width = cnv2.width;
	cnv.height = cnv2.height;
	cnv.getContext("2d").putImageData(fillTransparent(imageData2),0,0);
	
}
*/

function getAverageColor(colors)
{
	var f=false;
	var i0=0;
	var i1=0;
	var i2=0;
	var i3=0;
	for(var i=0;i<colors.length;i++)
	{
		i0 +=colors[i][0];
		i1 +=colors[i][1];
		i2 +=colors[i][2];
		i3 += 255;//colors[i][3];
	}
	
	return [i0/colors.length,i1/colors.length,i2/colors.length,i3/colors.length];
	
}
function getAverageColorRed(colors)
{
	var f=false;
	var i0=0;
	var i1=0;
	var i2=0;
	var i3=0;
	for(var i=0;i<colors.length;i++)
	{
		i0 +=(colors[i][0]*2)%255;
		i1 +=colors[i][1];
		i2 +=colors[i][2];
		i3 += 255;//colors[i][3];
	}
	
	return [i0/colors.length,i1/colors.length,i2/colors.length,i3/colors.length];
	
}

function getNeighborsColors(glob_pixelsPro_pg_main_image,x,y)
{
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	
	
	var colors=[];
//	if((x0<0)||(x0>
		var index = glob_pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				colors.push(color);
	/*			
	var f=false;
	for(var i=0;i<colors.length;i++)
	{
		if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
		{
			f=true;
			break;
		}
	}
	if(f==false) 
	*/			
				index = glob_pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];colors.push(color);
		/*			
				f=false;
	for(var i=0;i<colors.length;i++)
	{
		if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
		{
			f=true;
			break;
		}
	}
	if(f==false) 
	*/	
				
				index = glob_pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];colors.push(color);
			/*		
				f=false;
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						f=true;
						break;
					}
				}
				if(f==false) 
				*/	
			
				index = glob_pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				var color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];colors.push(color);
		/*			
				f=false;
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						f=true;
						break;
					}
				}
				if(f==false) 
				*/	
			/*			
				color=glob_pixelsPro_pg_main_color;
				
				var grey_color = [127,127,127,255];
				
				for(var i=0;i<colors.length;i++)
				{
					if((colors[i][0]==color[0])&&(colors[i][1]==color[1])&&(colors[i][2]==color[2])&&(colors[i][3]==color[3]))
					{
						
						colors.splice(i,1);
						break;
						
					}
					
					if(pixelsPro_array_equals(colors[i],grey_color)) colors.splice(i,1);
				}
				*/
				return colors;
	
}


function isNeighborsOtherThen(glob_pixelsPro_pg_main_image,x,y)
{
	//if(x==0) return true;
	//if(x==glob_pixelsPro_pg_main_image.width-1) return true;
	//if(y==0) return true;
	
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	
	var index = glob_pixelsPro_pg_main_image.width * (y) + (x) << 2;
	var clr = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
	
	
	
		var index = glob_pixelsPro_pg_main_image.width * (y) + (x0) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
				
				
				
				
	
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) ;
		else return true;
		
	
				index = glob_pixelsPro_pg_main_image.width * (y) + (x1) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
		
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) ;
		else return true;
		
				
				index = glob_pixelsPro_pg_main_image.width * (y0) + (x) << 2;
				color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
			
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) ;
		else return true;
		
				index = glob_pixelsPro_pg_main_image.width * (y1) + (x) << 2;
				
				var color = [
					glob_pixelsPro_pg_main_image.data[index],
					glob_pixelsPro_pg_main_image.data[index+1],
					glob_pixelsPro_pg_main_image.data[index+2],
					glob_pixelsPro_pg_main_image.data[index+3]
				];
	
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) return false;
		else return true;
				
	
}

function getWHDNeighbors(x, y, dx, dy,w,h)
{
	var arr=[];
	if(((x-dx)>=0)&&((y-dy)>=0)) arr.push([x-dx,y-dy]);
	if((x-dx)>=0) arr.push([x-dx,y]);
	if(((x-dx)>=0)&&((y+dy)<h)) arr.push([x-dx,y+dy]);
	if((y-dy)>=0)arr.push([x,y-dy]);
	
	if((y+dy)<h)arr.push([x,y+dy]);
	if(((x+dx)<w)&&((y-dy)>=0))arr.push([x+dx,y-dy]);
	if(((x+dx)<w))arr.push([x+dx,y]);
	if(((x+dx)<w)&&((y+dy)<h))arr.push([x+dx,y+dy]);
	return arr;
	
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


function getColorsForPoints(im,points_arround)

{
	var colors = [];
	
	for (var n = 0; n < points_arround.length; n++) {
		
		var x = points_arround[n][0];
		var y = points_arround[n][1];
		
		var color = getColorArrayFromImageData(im, x, y);
		
		colors.push(color);
		
	}
	
	return colors;
	
}

function fillRectangleFast(imgData2, x, y, n, m, col )
{
	
	for(var j=y;j<y+m;j++)
	{
		for(var i=x;i<x+n;i++)
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

function nineth(im)
{
	var w = im.width;
	var h = im.height;
	
	var w2=w*3;
	
		var newpng = new PNG ( {
			
				width: w2,
				height: h*3,
				filterType: 4
		} );
	
	
		
	for (var y = 0; y < h; y++) {
				
		
				
		for (var x = 0; x < w; x++) {
				
				var points_arround	= getWHDNeighbors(x, y, 1, 1,w,h);
				var avg_color = getAverageColor(getColorsForPoints(im,points_arround));
				
				var ind = w2*y*3+x*3 << 2;
				
				newpng = fillRectangleFast(newpng, x*3, y*3, 3, 3, avg_color );
				// newpng.data[ind]=avg_color[0];
				// newpng.data[ind+1]=avg_color[1];
				// newpng.data[ind+2]=avg_color[2];
				// newpng.data[ind+3]=255;
				
				
		}
	}
	
	
	return newpng;

}



function nonineth(im)
{
	var w = im.width;
	var h = im.height;
	
	var w2=w/3;
	
	
		var newpng = new PNG ( {
			
				width: w2,
				height: h/3,
				filterType: 4
		} );
	
	
		
	for (var y = 0; y < h; y+=3) {
				
		
				
		for (var x = 0; x < w; x+=3) {
				
				var points_arround	= getWHDNeighbors(x, y, 1, 1,w,h);
				var avg_color = getAverageColor(getColorsForPoints(im,points_arround));
				
				var x1=x/3;
				var y1=y/3;
				var ind = w2*y1+x1 << 2;
				
				newpng = fillRectangleFast(newpng, x1, y1, 1, 1, avg_color );
				// newpng.data[ind]=avg_color[0];
				// newpng.data[ind+1]=avg_color[1];
				// newpng.data[ind+2]=avg_color[2];
				// newpng.data[ind+3]=255;
				
				
		}
	}
	
	
	return newpng;

}







