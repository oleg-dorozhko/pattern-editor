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
			
		var r = imageData.data[global_ind] -= global_dx; 
		if( r < 0 ) r = 0;
			
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

function darker() //и так же можно с определенным цветом поступить
{
	var s = prompt("red-0 or green-1 or blue-2 or alpha-3 and next should be value. \nFor example: 0,50");
	
	var arr = s.split(",");
	
	global_ind = Number(arr[0]);
	global_dx = Number(arr[1]);
	
	if(arr.length==3) global_delay=Number(arr[2]);
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	global_w=w;
	global_h=h;
	
	global_canvas = document.createElement("canvas");
	global_canvas.id = "darker_save_"+ new Date().getTime();
	global_canvas.width = w;
	global_canvas.height = h;
	
	
	global_context = global_canvas.getContext("2d");
	global_context.fillStyle = "rgba(0,0,0,0)";
	global_context.fillRect(0,0,w,h);
	
	document.getElementById("saves").appendChild(global_canvas);
	
	setTimeout( dummy, global_delay );
	
		
}