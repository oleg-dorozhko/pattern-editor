function paint_over(params, callback)
{
	__paint_over();
}

function compareColors(arr,arr2)
{
	for(var j=0;j<arr.length;j++)
	{
		var df = Math.abs(arr[j]-arr2[j]);
		if(df!=0)return false;
	}
	return true;
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

function getMaxBackgroundFillColor( canvas2, context2, imgData2, x, y, dx, dy )
{
	

	
	var colors = [];
	var obj={};
	
	
		
		var color = getColorArrayFromImageData(imgData2, x, y);
		
		var arr2 = getWHDNeighbors(x, y, dx, dy, canvas2.width, canvas2.height );
	
		for(var i=0;i<arr2.length;i++)
		{
			var x1=arr2[i][0];
			var y1=arr2[i][1];
			
			var color2 = getColorArrayFromImageData(imgData2, x1, y1);
			
			
			if( (color2[0]==color[0]) && (color2[1]==color[1]) && (color2[2]==color[2]) && (color2[3]==color[3])  )
							
			{
			
			
			
			
			
			
			}
			else
			{
				
				if( includesColor(colors, color2)==false) 
				{
					colors.push(color2);
					obj[''+color2.join('_')] = 1;
				}
				else
				{
					obj[''+color2.join('_')] ++;
				}
				
				
			}
			
		}
		
	
	
	if(colors.length==0) return null;
	if(colors.length==1) return colors[0];
	//return null;
	
	var max=0;
	var ind= -1;
		for(var i=0;i<colors.length;i++)
		{
			if(max<obj[''+colors[i].join('_')])
			{
				ind=i;
				max=obj[''+colors[i].join('_')];
			}
		}
		
		return colors[ind];
	
	
}

function __paint_over()
{
	var canvas = document.getElementById('canvas');
	
	var ctx = canvas.getContext("2d");
	var im = ctx.getImageData(0,0,canvas.width,canvas.height);
	
	var w = im.width;
	var h = im.height;
	
	var canvas2 = document.createElement('canvas');
	canvas2.width=w*1;
	canvas2.height=h*1;
	var ctx2 = canvas2.getContext("2d");
	var im2 = ctx2.getImageData(0,0,canvas2.width,canvas2.height);
	
	
	
	var w2 = im2.width;
	var h2 = im2.height;

	
	
	for (var y = 0; y < h; y++) {
				
		
				
		for (var x = 0; x < w; x++) {
					
			
				var color = getColorArrayFromImageData(im, x, y);
				if(compareColors(color,[0,0,0,0]))
				{
					//get okruzhenie
					if(getMaxBackgroundFillColor( canvas, ctx, im, x, y, 1, 1 ))
					{
							var samecolor = null;
							if(x+1<w) 
							{
								samecolor = getColorArrayFromImageData(im, x+1, y);
							}
							else //x from -b to 
							{
								if(x-1>=0) 
								{
									samecolor = getColorArrayFromImageData(im, x-1, y);
								}
								else
								{
									
								}
							}
							if(samecolor==null) samecolor=[0,0,0,0];
							
							var idx2 = w2*y+x << 2;
							im2.data[idx2]=samecolor[0];
							im2.data[idx2+1]=samecolor[1];
							im2.data[idx2+2]=samecolor[2];
							im2.data[idx2+3]=samecolor[3];
					}
				}
				
				else{
					
					
					var idx2 = w2*y+x << 2;
							im2.data[idx2]=color[0];
							im2.data[idx2+1]=color[1];
							im2.data[idx2+2]=color[2];
							im2.data[idx2+3]=color[3];
					
					
				}
	
			
				
				
				
							
		}
	}
	
	canvas.width=w2;
	canvas.height=h2;
	canvas.getContext('2d').putImageData(im2,0,0);
	
}