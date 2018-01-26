//!() !
console.log('mod smooth on');
var PNG = require('pngjs').PNG;
module.exports.smooth = smooth;
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
		i3 +=colors[i][3];
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


function smooth(im)
{
	var w = im.width;
	var h = im.height;
	var count=0;
	var indexes=[];
	for (var y = 1; y < h-1; y+=1) {
				
		
				
		for (var x = 1; x < w-1; x+=1) {
					
			
					
				var idx = (w * y + x) << 2;
			
				//if((im.data[idx+0]==255)&&(im.data[idx+1]==255)&&(im.data[idx+2]==0)&&(im.data[idx+3]==255))
				{

					//console.log(""+im.data[idx+0]+','+im.data[idx+1]+','+im.data[idx+2]);
					
					if(isNeighborsOtherThen(im,x,y))
					{
						indexes.push(idx);
						
					}
				}				
		}
	}
	
	
	for (var y = 1; y < h-1; y+=1) {
				
		
				
		for (var x = 1; x < w-1; x+=1) {
					
			
					
				var idx = (w * y + x) << 2;
				
				for(var n7=0;n7<indexes.length;n7++)
			
				{

					//console.log(""+im.data[idx+0]+','+im.data[idx+1]+','+im.data[idx+2]);
					
					if(idx==indexes[n7])
					{
						
						var arr = [0,0,0,255];//getAverageColor(getNeighborsColors(im,x,y));
						im.data[idx+0]=arr[0];
						im.data[idx+1]=arr[1];		
						im.data[idx+2]=arr[2];
						im.data[idx+3]=arr[3];
					}
				}				
		}
	}
	return im;

}






