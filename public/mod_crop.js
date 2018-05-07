function crop_lt(params,callback)
{
	if(params==null) return;
	var canvas =  document.getElementById("canvas");
		
	//	logg('crop lt '+params.join(" ")); 
		var x = Number(params[0].trim());
		if((x<0)||(x>=canvas.width)) return;
		var y = Number(params[1].trim());
		if((y<0)||(y>=canvas.height)) return;
		
		server_crop(x,y,1,callback);
		
		
}

function crop_rb(params,callback)
{
	if(params==null) return;
	var canvas =  document.getElementById("canvas");
		
	//	logg('crop rb '+params.join(" ")); 
		var x = Number(params[0].trim());
		if((x<0)||(x>=canvas.width)) return;
		var y = Number(params[1].trim());
		if((y<0)||(y>=canvas.height)) return;
		
		server_crop(x,y,2,callback);
		
		
}
