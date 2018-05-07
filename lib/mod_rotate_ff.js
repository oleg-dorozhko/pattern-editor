console.log('mod rotate ff on');
var PNG = require('pngjs').PNG;
module.exports.rotate_ff = __rotate_ff;



function __rotate_ff( oldpng )
{
    var newpng = new PNG({
		
		width: oldpng.width*2,
		height: oldpng.height*2,
		filterType: 4
		
		
		});
	
	
	
	/*****
	
	var r = context.getImageData(0,0,1,1).data[0];
	var g = context.getImageData(0,0,1,1).data[1];
	var b = context.getImageData(0,0,1,1).data[2];
	contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
	contextRes.fillRect(0,0,2,2);
	
	*****/
	
	
	var arr_points = [];
	
	var n=0;
	
	for(n=2;n<oldpng.height+2;n++)
	{
		//console.log("---- "+n+" ----");
		var y=n-2;
		for(var x=0;x<n-1;x++)
		{
			//console.log("[x,y]=["+x+","+y+"]");
			
			var idx = (oldpng.width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
				
			/*****	
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
			
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			
			//console.log([x,y]);
			*****/
			
			arr_points.push([x,y]);
			
			
			y--;
		}
		
		//if(n>=4) break;
		
	}
	
	//return;
	
	
	
	
	
	
	var half_value = arr_points.length;
	

	var w = oldpng.width;
	var h = oldpng.height;
	
	var lim2 = 1;
	var lim4 = 1;
	
	while(true)
	{
	
	y=h-lim4;
	x=lim2;
	while(true)
	{
	
	
		
			/*****
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			*****/
			
			var idx = (oldpng.width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
				
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng.data[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng.data[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng.data[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng.data[idx+3];
	
	
			
			
			arr_points.push([x,y]);
		
		
		x++;
		y--;
		
		if(x>=oldpng.width) break;
	}
	
	lim2++;
			
	if(y>=oldpng.height)	break;	

		if(lim2 > oldpng.width)
		{
			break;
		}
	
	}	
		
	
	// console.log("Data of rotated image inputed");
	
	/******************************************************************************/
	/******************************************************************************/
	/******************************************************************************/
	
	
	
	
	
	
	
	
	
	var w = newpng.width;
	
	
	//**  this only one duxel outputting
	var n=0;
	
	
	var x = arr_points[0][0];
	var y = arr_points[0][1];

	var idx = (oldpng.width * x + y) << 2;
		
    var x1 = w/2-1;			
	var y1=0;
	
	var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];

	
	n++;
	
	//**** now we take two duxel
	
	y1++;
	x1--;
	
	//
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng.width * x + y) << 2;
		
    var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];
	
	
	n++;
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng.width * x + y) << 2;
	
	var new_idx1 = newpng.width * (y1) + (x1+2) << 2;
	
	newpng.data[new_idx1+0] = oldpng.data[idx+0];
	newpng.data[new_idx1+1] = oldpng.data[idx+1];
	newpng.data[new_idx1+2] = oldpng.data[idx+2];
	newpng.data[new_idx1+3] = oldpng.data[idx+3];
	
	newpng.data[new_idx1+4] = oldpng.data[idx+0];
	newpng.data[new_idx1+5] = oldpng.data[idx+1];
	newpng.data[new_idx1+6] = oldpng.data[idx+2];
	newpng.data[new_idx1+7] = oldpng.data[idx+3];

	
		
	//contextRes.fillStyle = "red";//"rgba("+r+","+g+","+b+",255)";
	//contextRes.fillRect(x1+6,y1,2,1);
	

	
	
	
	y1++;
	x1--;
	
	for(j=0;j<3;j++)
	{
		
		
		n++;
	
		var x = arr_points[n][0];
		var y = arr_points[n][1];
		
		var idx = (oldpng.width * x + y) << 2;
		
		var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
		
		newpng.data[new_idx1+0] = oldpng.data[idx+0];
		newpng.data[new_idx1+1] = oldpng.data[idx+1];
		newpng.data[new_idx1+2] = oldpng.data[idx+2];
		newpng.data[new_idx1+3] = oldpng.data[idx+3];
		
		newpng.data[new_idx1+4] = oldpng.data[idx+0];
		newpng.data[new_idx1+5] = oldpng.data[idx+1];
		newpng.data[new_idx1+6] = oldpng.data[idx+2];
		newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
			
		
		
	}
	

	
	var counter=4;
	var exit_cycle=false;
	
	while(true)
	{
		
		y1++;
		x1--;
		
		for(j=0;j<counter;j++)
		{
			
			
			
			
			n++;
			
		//	console.log(n);
		//	console.log(arr_points.length);
		//	if(n >= arr_points.length / 2 ) { exit_cycle=true; break; }
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			var idx = (oldpng.width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
			
			newpng.data[new_idx1+0] = oldpng.data[idx+0];
			newpng.data[new_idx1+1] = oldpng.data[idx+1];
			newpng.data[new_idx1+2] = oldpng.data[idx+2];
			newpng.data[new_idx1+3] = oldpng.data[idx+3];
			
			newpng.data[new_idx1+4] = oldpng.data[idx+0];
			newpng.data[new_idx1+5] = oldpng.data[idx+1];
			newpng.data[new_idx1+6] = oldpng.data[idx+2];
			newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
		

	
				
		
			
		}
		
		counter++;
		//console.log("counter="+counter);
		if(counter>=newpng.height/2+1) break;
		
	/******
	
		if(exit_cycle==true) break;
		
		console.log("n="+n);
		
		
		
		//if(n >= arr_points.length/2 ) break;
		
	******/	
		
	 
	}
	
	
				
	
	//console.log("n="+n);
	
	//console.log("counter="+counter);
	
	//console.log("x1="+x1);
	//console.log("y1="+y1);
	
	//console.log(arr_points[n]);
	
	

	
	
	
		
	
	//n--;
	
	//var counter=4; counter==half_value
	var exit_cycle=false;
	var lim2=1;
	//y1--;
	var nn=1;
	var lim4=newpng.width-2;
	while(true)
	{
		
		y1++;
		
		
		for(x1=lim2;x1<lim4;x1+=2)
		{
			
			
			
			n++;
			
			
			//console.log(n);
			//console.log(arr_points.length);
			
			 
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			
			var idx = (oldpng.width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
			newpng.data[new_idx1+0] = oldpng.data[idx+0];
			newpng.data[new_idx1+1] = oldpng.data[idx+1];
			newpng.data[new_idx1+2] = oldpng.data[idx+2];
			newpng.data[new_idx1+3] = oldpng.data[idx+3];
			
			newpng.data[new_idx1+4] = oldpng.data[idx+0];
			newpng.data[new_idx1+5] = oldpng.data[idx+1];
			newpng.data[new_idx1+6] = oldpng.data[idx+2];
			newpng.data[new_idx1+7] = oldpng.data[idx+3];
		
			
			
			
			
			
			/****
			
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData.data[0];
			var g = imgData.data[1];
			var b = imgData.data[2];
				
			contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x1,y1,2,1);
			
			*****/
			
			//	 { exit_cycle=true; break; }
			
			
			
			
			
			
			
	
	
		
			
		}
		
	
	
	
		lim2++;
		lim4--;
		
		if(exit_cycle==true) break;
		
		//counter--;
		
		//x1 = nn++;
		
		//if(counter>=canvasRes.height/2) break;
		
		if(lim2>oldpng.height) { exit_cycle=true; break; }
		
		//if(nn>canvas.height-1) { exit_cycle=true; break; }
		
		if(lim4 < 0) break;

		//if(n>=arr_points.length-1) break;
		
	}
	
		
	return newpng;
	
	/********
 
	
	
	
		
	canvas.width = canvasRes.width;
	canvas.height = canvasRes.height;
	canvas.getContext("2d").putImageData(canvasRes.getContext("2d").getImageData(0,0,canvasRes.width,canvasRes.height),0,0);
	
	
	
	*****/
	
	
	
	
}