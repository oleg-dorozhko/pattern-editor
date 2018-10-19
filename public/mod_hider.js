function hider() //и так же можно с определенным цветом поступить
{
	var s = prompt("Need coordinates of point and black-0 or white-1 or alpha-2. For example: 50,50,1");
	
	var arr = s.split(",");
	var x = Number(arr[0]);
	var y = Number(arr[1]);
	var mode = Number(arr[2]);
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	
	
	var cnv = document.createElement("canvas");
	cnv.width = w;
	cnv.height = h;
	var ctx = cnv.getContext("2d");
	ctx.fillStyle = "rgba(0,0,0,0)";
	ctx.fillRect(0,0,w,h);

	var imageData0 = context.getImageData(x,y,1,1);
	
	for(var j=0; j < h; j ++)
	{
		for(var i=0;i<w; i ++)
		{
			
			var imageData = context.getImageData(i,j,1,1);
			if(cmp (imageData0, imageData))
			{
				if ( mode==0 )
				{	
					imageData.data[0] = 255;
					imageData.data[1] =	255;		
					imageData.data[2] =	255;		
					imageData.data[3] = 255; 
				}
				else if ( mode==1 )
				{	
					imageData.data[0] = 0;
					imageData.data[1] =	0;		
					imageData.data[2] =	0;		
					imageData.data[3] = 255; 
				}
				else if ( mode==2 )
				{	
					
					imageData.data[3] = 0; 
				}
			}
			
			
			
			ctx.putImageData(imageData, i,j);

		}
	}

	canvas.width = cnv.width;
	canvas.height = cnv.height;
	context.drawImage(cnv,0,0);
		
}