function div(imageData1, imageData2)
{
	var red = (imageData1.data[0]+imageData2.data[0])/2|0 ;
	var green = (imageData1.data[1]+imageData2.data[1])/2|0 ;
	var blue = (imageData1.data[2]+imageData2.data[2])/2|0 ;
	var alpha = (imageData1.data[3]+imageData2.data[3])/2|0 ;
	
	var canvas = document.createElement("canvas");
	canvas.width = 5;
	canvas.height = 5;
	var context = canvas.getContext("2d");
	context.fillStyle = "rgba("+red+","+green+","+blue+","+(alpha/255).toFixed(2)+")";
	context.fillRect(0,0,5,5);
	
	return context.getImageData(0,0,1,1);
}

function xcombo()
{
	// search for true-bordered canvas
	// var cnv = getSelectedBorderedSaveCanvas();
	//alert("canvas");
	if(glob_last_selected_canvas_id==null) return;
	
	console.log("xcombo id="+glob_last_selected_canvas_id);
	
	//if(document.getElementById(glob_last_selected_canvas_id).classList.contains("save-canvas-class")==false) return;
	
	var cnv = document.getElementById(glob_last_selected_canvas_id);

	var ctx = cnv.getContext("2d");
	
	//ctx.strokeStyle = "blue";
	//ctx.Rect(0,0,cnv.width,cnv.height);
	
	// var imgDt = ctx.getImageData(0,0,cnv.width,cnv.height);
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	if(canvas.width>=cnv.width && canvas.height>=cnv.height && canvas.width==canvas.height && cnv.width==cnv.height )
	{
	
	var dx = (canvas.width- cnv.width)/2|0;
	var dy = (canvas.height - cnv.height)/2|0;
	var x2 = dx + cnv.width;
	var y2 = dy + cnv.height;
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	
	var n=0;
	var m=0;
	var arr = [];
	var imgDt = context.getImageData(0,0,canvas.width,canvas.height);
	for(var j=0; j<canvas.height;j++)
	{
		for(var i=0; i<canvas.width;i++)
		{
			
			
			///canvas2.getContext("2d").putImageData(imgDt, i,j);
			var obj = {};
			//obj.imgDt = imgDt;
			obj.i=i;
			obj.j=j;
			arr.push(obj);
		}
	}		
	
	for(var j=0; j<cnv.height;j++)
	{
		for(var i=0; i<cnv.width;i++)
		{
			var imgDt = ctx.getImageData(i,j,1,1);
			var imgDt2 = canvas2.getContext("2d").getImageData(dx+i,dy+j,1,1)
			if(
				(imgDt2.data[0] == imgDt.data[0]) && 
				(imgDt2.data[1] == imgDt.data[1]) && 
				(imgDt2.data[2] == imgDt.data[2]) && 
				(imgDt2.data[3] == imgDt.data[3]) 
				
				)
				{
					//canvas2.getContext("2d").putImageData(imgDt, i+dx,j+dy);
					//canvas2.getContext("2d").putImageData(imgDt, i,j);
					
					var obj = {};
					obj.imgDt = imgDt;
					obj.i=i+dx;
					obj.j=j+dy;
					arr.push(obj);
					
				}
				else
				{
					//canvas2.getContext("2d").fillStyle = div(imgDt, imgDt2);
					//canvas2.getContext("2d").fillRect(i+dx,j+dy,1,1);
					var obj = {};
					obj.imgDt = div(imgDt, imgDt2);
					obj.i=i+dx;
					obj.j=j+dy;
					arr.push(obj);
				}
				
		}
	}
	
	var im = context.getImageData(i,j,canvas.width,canvas.height);
	for(var i=0; i<arr.length;i++)
	{
		var obj = arr[i];
		var ind = obj.j*canvas.width+obj.i;
		im.data[ind] = obj.imgDt.data[0];
		im.data[ind+1] = obj.imgDt.data[1];
		im.data[ind+2] = obj.imgDt.data[2];
		im.data[ind+3] = obj.imgDt.data[3];
		
	}
	
	context.putImageData(im, 0,0 );
	
	/****
			 
			if(i>=dx && j>=dy )
			{
				
				var imgDt2 = ctx.getImageData(i-dx,j-dy,1,1);
				
				
				if(
				(imgDt2.data[0] == imgDt.data[0]) && 
				(imgDt2.data[1] == imgDt.data[1]) && 
				(imgDt2.data[2] == imgDt.data[2]) 
				
				)
				{
					
					canvas2.getContext("2d").putImageData(imgDt, i,j);
				}
				else
				{
					canvas2.getContext("2d").fillStyle = div(imgDt, imgDt2);
					canvas2.getContext("2d").fillRect(i,j,1,1);
				}
				
				
			}
			else
			{
				
				canvas2.getContext("2d").putImageData(imgDt, i,j);
			}
			
	****/	
	/********
	canvas.width = canvas2.width;
	canvas.height = canvas2.height;
	canvas.getContext("2d").drawImage(canvas2,0,0);
		***********/
	}
	
	
	
	
	
	/********
		
		
		cnv.toBlob( function( blob) {
		
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/prepare_xcombo', true);
			xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
			 
				transform("canvas",'/xcombo');
				
			}
			xhr.send(blob);
			
				
		});
	
	*********/	
		 
	
	
	
	
	
	
}