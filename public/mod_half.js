function half(params,callback)
{
	
	//console.log("half");
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	
	if( ( w%2==1) && (h%2==1) )
	{
		var nw = (w/2|0)+1;
		var nh = (h/2|0)+1;	
		var im = context.getImageData(0,0,nw,nh);
		canvas.width = nw;
		canvas.height = nh;
		canvas.getContext("2d").putImageData(im,0,0);
		
	}
	else if( ( w%2==0) && (h%2==0) )
	{
		var nw = w/2;
		var nh = h/2;	
		var im = context.getImageData(0,0,nw,nh);
		canvas.width = nw;
		canvas.height = nh;
		canvas.getContext("2d").putImageData(im,0,0);
	}
	else if( ( w%2==1) && (h%2==0) )
	{
		
	}
	else if( ( w%2==0) && (h%2==1) )
	{
		
	}
		
	setTimeout( function(){
				if(callback) callback(); //after or before? what question
			}, 100 );	
			
}