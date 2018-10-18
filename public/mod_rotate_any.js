function old_rotate_any(params,callback)
{
	if(params==null)
	{
		var s = prompt("enter number from 40 to 90 both include");
		if(s==undefined) return; 	
		if(s==null) return; 	
		var wh = Number(s.trim());
		if(wh<1) return;
		if(wh>359) return;
		params={};
		params.degree=wh;
		
		
	}
	else
	{
		
		
		
		
		
		var tparams={};
		tparams.degree=Number(''+params[0]);
		params=tparams;
		
	}
	
	//__rotate_any(params.degree);
	
	//return;
	
	if(params)
	{
		if(callback)
		{
			
			ident("canvas", 'ident', function(data){
				
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				
				
			});
			
		}
		else{
			
			ident("canvas", 'ident', function(data){
				
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				
				
			});
		
		}
	}
	else{
		
	return;
	}
	
	
}


function rotate_any(params,callback)
{var wh =0;
	if(params==null)
	{
		var s = prompt("enter number from 40 to 90 both include");
		if(s==undefined) return; 	
		if(s==null) return; 	
		 wh = Number(s.trim());
		if(wh<1) return;
		if(wh>359) return;
		params={};
		params.degree=wh;
		
		
	}
	else
	{
		
		
		
		
		
		var tparams={};
		tparams.degree=Number(''+params[0]);
		params=tparams;
		wh=tparams.degree;
		
	}
	
	var canvas=document.getElementById('canvas');
	context = canvas.getContext("2d");
	var im0=context.getImageData(0, 0, canvas.width, canvas.height);
	var im =_rotate_any_777(im0,wh);
	
	canvas.width = im.width;
			canvas.height = im.height;
			
			canvas.getContext("2d").putImageData(im,0,0);
	
	
	
	
	
	
	
	
	
	
	if(callback)
	callback();
	
	
}


function _rotate_any_777(im0,degree)
{
	var canvas0 = document.createElement("canvas");
	
	var w = im0.width;
	var h = im0.height;
	
	canvas0.width = w;
	canvas0.height = h;
	
	var context0 = canvas0.getContext("2d");
	context0.putImageData(im0,0,0);
	
	
	
	var canvas = document.createElement("canvas");
	
	var w = im0.width;
	var h = im0.height;
	
	canvas.width = w;
	canvas.height = h;
	
	var context = canvas.getContext("2d");
	
	// Clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Move registration point to the center of the canvas
	context.translate(canvas.width/2, canvas.height/2);

	context.rotate(degree*Math.PI / 180);

	// Move registration point back to the top left corner of canvas
	context.translate(-canvas.width/2, -canvas.height/2);

	
	context.drawImage(canvas0,0,0);
	
	return canvas.getContext("2d").getImageData(0,0,w,h);
	
}
	

