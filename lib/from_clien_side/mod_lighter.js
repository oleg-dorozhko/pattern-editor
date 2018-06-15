function lighter() //и так же можно с определенным цветом поступить
{
	var s = prompt("red-0 or green-1 or blue-2 or alpha-3 and next should be value. \nFor example: 0,50");
	
	var arr = s.split(",");
	var ind = Number(arr[0]);
	var dx = Number(arr[1]);
	
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

	
	
	for(var j=0; j < h; j ++)
	{
		for(var i=0;i<w; i ++)
		{
			
			var imageData = context.getImageData(i,j,1,1);
			
			var r = imageData.data[ind] += dx; 
			if( r > 255 ) r = 255;
			
			ctx.putImageData(imageData, i,j);

		}
	}

	canvas.width = cnv.width;
	canvas.height = cnv.height;
	context.drawImage(cnv,0,0);
		
}
/***********
function __lighter2( x, y, r, g, b, a )
{

	var ctx = document.getElementById("tmp_lighter_0").getContext("2d");
	ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
	ctx.fillRect(x,y,1,1);
	
}
**********/
var global_delay=5;
var global_ind=0;
var global_dx=0;
var global_canvas=null;
var global_context=null;
var global_i=0;
var global_j=0;
var global_w=0;
var global_h=0;

function dummy() {
		
		
		
		var imageData = document.getElementById("canvas").getContext("2d").getImageData( global_i, global_j, 1, 1);
			
		var r = imageData.data[global_ind] += global_dx; 
		if( r > 255 ) r = 255;
			
		global_context.putImageData(imageData, global_i, global_j);

		global_i++;
		if( global_i >= global_w )
		{
			global_i=0;
			
			global_j++;
			if(global_j >= global_h) return;
						
		}
		
		setTimeout( dummy, global_delay );
}


function lighter3() 
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	var im = context.getImageData( 0,0,w,h);
	var lim = w*h*4;
	for ( var i=0;i<lim;i+=4)
	{
		im.data[i] -= 10;
	}
	context.putImageData(im,0,0);
	
		
}

function lighter2() //и так же можно с определенным цветом поступить
{
	//var s = prompt("red-0 or green-1 or blue-2 or alpha-3 and next should be value. \nFor example: 0,50");
	/*************
	var s = "0,10,1"
	var arr = s.split(",");
	
	global_ind = Number(arr[0]);
	global_dx = Number(arr[1]);
	
	if(arr.length==3) global_delay=Number(arr[2]);
	
	********/
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	var im = context.getImageData( 0,0,w,h);
	var lim = w*h*4;
	for ( var i=0;i<lim;i+=4)
	{
		im.data[i] += 10;
	}
	context.putImageData(im,0,0);
	
	/************
	global_w=w;
	global_h=h;
	
	global_canvas = document.createElement("canvas");
	global_canvas.id = "lighter_save_"+ new Date().getTime();
	global_canvas.width = w;
	global_canvas.height = h;
	
	
	global_context = global_canvas.getContext("2d");
	global_context.fillStyle = "rgba(0,0,0,0)";
	global_context.fillRect(0,0,w,h);
	
	document.getElementById("saves").appendChild(global_canvas);
	
	setTimeout( dummy, global_delay );
	******/
		
}
/*************
function lighter2() //и так же можно с определенным цветом поступить
{
	//var s = prompt("red-0 or green-1 or blue-2 or alpha-3 and next should be value. \nFor example: 0,50");
	var s = "0,10"; 
	var arr = s.split(",");
	var ind = Number(arr[0]);
	var dx = Number(arr[1]);
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	
	
	var cnv = document.createElement("canvas");
	cnv.id = "tmp_lighter_0";
	cnv.width = w;
	cnv.height = h;
	var ctx = cnv.getContext("2d");
	
	document.getElementById("saves").appendChild(cnv);
	

	
	
	for(var j=0; j < h; j ++)
	{
		for(var i=0;i<w; i ++)
		{
			
			var im = context.getImageData(i,j,1,1);
			
			var r = im.data[0];
			r += dx; 
			if( r > 255 ) r = 255;
			var g = im.data[1];
			var b = im.data[2];
			var a = im.data[3];
			
			setTimeout( __lighter2.bind(i,j,r,g,b,a),1);
			
			
			
			
			
			

		}
	}

	//canvas.width = cnv.width;
	//canvas.height = cnv.height;
	//context.drawImage(cnv,0,0);
		
}
*******/