//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------
var glob_x_left_top = null;
var glob_y_left_top = null;
var glob_pg_main_color = null;
var glob_showing_scale_div = false;
var glob_scale_div = null;

function whenClickedOnCanvas(e)
{
			
	evt = (e) ? e : event;   
	if(evt.button == 0) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		glob_x_left_top = x;
		glob_y_left_top = y;
						
		var context = e.target.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		showScaleDiv(e.target,x,y);
		redrawPixels_main(context, x,y);
		
	}
			
}	
		
function setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main(document.getElementById("canvas").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	scale_div.style.visibility = 'hidden'; //visible
		
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
}		
		
function showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";
	document.getElementById('canvas_width_height').innerHTML = ""+document.getElementById('canvas').width+" x "+document.getElementById('canvas').height;
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}



function setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			server_crop(glob_x_left_top,glob_y_left_top,1);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			server_crop(glob_x_left_top,glob_y_left_top,2);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden'; //visible
		
		}

}



function redrawPixels_main(context, x,y)
{
	var c2 = document.getElementById("pixels");
	c2.width = 150;  //(img_width * m) + (img_width - 1)*p;
	c2.height = 150; //(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			
			
			var imageData = context.getImageData(x+i,y+j,1,1);
			
			ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			if(i==0 && j==0) ctx.fillStyle = "red";
			ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
		}
	}
	
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}


function crop(x,y,flag)
{
	
	
	var sx,sy,w,h;
	var canvas =  document.getElementById("canvas");
	
	if(flag == 1)
	{
		sx = x;
		sy = y;
		w = canvas.width - sx;
		h = canvas.height - sy;
	}
	else
	{
		sx = 0;
		sy = 0;
		w = x+1;
		h = y+1;
	}
	
	
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(sx, sy, w, h);
	
	///////
	//var buffer = imageData.data.buffer;  // ArrayBuffer
	//////
	
	canvas.width = w;
	canvas.height = h;
	canvas.getContext("2d").putImageData(imageData,0,0);
	
	/*********
	var imageData = context.createImageData(w, h);
	imageData.data.set(buffer);
	
	var params = [];
			
	params['x']= x;
	params['y']= y;
	params['flag']= flag;
	params['imgdata_base64']= dataurl;
			
	sendPostWithParametersOnServer( params ); 
	*********/
	
}


function sendPostWithParametersOnServer( action, params  )
{
	
				
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', action, true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "blob";
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
            var blob = xhr.response;
			getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas" ); } );
			
	}

	xhr.send(params);
	
}


function server_crop(x,y,flag)
{
	
	var canvas =  document.getElementById("canvas");

	var w = canvas.width;
	var h = canvas.height;
	var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag;		
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/precrop', true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
			
            transform("canvas",'/crop');
			
	}

	xhr.send(params);
	
	
}

