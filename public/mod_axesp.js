function both_axes_plus()
{
	var cnv0 = document.getElementById("canvas");
	var ctx0 = cnv0.getContext("2d");
	
	var cnv = document.createElement("canvas");
	cnv.width = cnv0.width+1;
	cnv.height = cnv0.height+1;
	var ctx = cnv.getContext("2d");
	
	if ((cnv0.width % 2 == 1) &&(cnv0.height % 2 == 1))
	{
		var n1=(cnv0.width / 2|0);
		//var n2=n1+2;
		var m1=(cnv0.height / 2|0);
		//var m2=m1+2;
		
		var imgDt = ctx0.getImageData(0,0,n1+1,m1+1);
		ctx.putImageData(imgDt,0,0);
		imgDt = ctx0.getImageData(n1,0,n1+1,m1+1);
		ctx.putImageData(imgDt,n1+1,0);
		imgDt = ctx0.getImageData(0,m1,n1+1,m1+1);
		ctx.putImageData(imgDt,0,m1+1);
		imgDt = ctx0.getImageData(n1,m1,n1+1,m1+1);
		ctx.putImageData(imgDt,n1+1,m1+1);
		document.body.appendChild(cnv);
		//imgDt = ctx0.getImageData(0,0,n1,m1);
		//ctx.putImageData(imgDt,0,0);
		
		//
		
	}
	else if ((cnv0.width % 2 == 0) &&(cnv0.height % 2 == 0))
	{
		var n1=(cnv0.width / 2);
		//var n2=n1+2;
		var m1=(cnv0.height / 2);
		//var m2=m1+2;
		
		var imgDt = ctx0.getImageData(0,0,n1+1,m1+1);
		ctx.putImageData(imgDt,0,0);
		imgDt = ctx0.getImageData(n1,0,n1+1,m1+1);
		ctx.putImageData(imgDt,n1+1,0);
		imgDt = ctx0.getImageData(0,m1,n1+1,m1+1);
		ctx.putImageData(imgDt,0,m1+1);
		imgDt = ctx0.getImageData(n1,m1,n1+1,m1+1);
		ctx.putImageData(imgDt,n1+1,m1+1);
		document.body.appendChild(cnv);
	}
	
	
	
	cnv0.width = cnv.width;
	cnv0.height = cnv.height;
	cnv0.getContext("2d").drawImage(cnv,0,0);
	document.body.removeChild(cnv);
	
	// setTimeout( function(){		logg('axes plus'); 	}, 100 );
	
	
}