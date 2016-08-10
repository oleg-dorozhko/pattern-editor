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
						
		var context = this.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		showSomeDiv(e.target,x,y);
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
				
		
		
function showSomeDiv(target,x,y)
{
	
	if(glob_scale_div != null && glob_showing_scale_div == true)
	{
		document.getElementById("span_pixels").removeChild(glob_scale_div);
		glob_scale_div = null;
		glob_showing_scale_div = false;
	}
	
	var el = document.createElement('div');
    el.className = 'tooltip';

	
    var coords = target.getBoundingClientRect();

	el.style.left = (screen.width / 2 - 75) + 'px';
    el.style.top = (screen.height/4 - 75) + 'px';
	
	var tri_btns = '<input type="button" id="btn_lt" value=" left top "> <input type="button" id="btn_rb" value=" right bottom "> <input type="button" id="btn_esc" value=" cancel ">';
	
	el.innerHTML = tri_btns+'<table><tr><td><canvas id="pixels" width="150" height="150" style="cursor:crosshair;border: 1px solid gold"></canvas></td></tr><table>';
	
	
	
	glob_scale_div = el;
	glob_showing_scale_div = true;
	
	document.getElementById("span_pixels").appendChild(el);
	
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
	
}


function setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			crop_crop(glob_x_left_top,glob_y_left_top,1);
			
			document.getElementById("span_pixels").removeChild(glob_scale_div);
			glob_showing_scale_div = false;
			glob_scale_div=null;
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			crop_crop(glob_x_left_top,glob_y_left_top,2);
			document.getElementById("span_pixels").removeChild(glob_scale_div);
			glob_showing_scale_div = false;
			glob_scale_div=null;
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			document.getElementById("span_pixels").removeChild(glob_scale_div);
			glob_showing_scale_div = false;
			glob_scale_div=null;
		
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
	
}


function crop_crop(x,y,flag)
{
	var xhr = new XMLHttpRequest();
			
			
	var parameters = 'x=' + encodeURIComponent(x) +  '&y=' + encodeURIComponent(y)+"&flag="+encodeURIComponent(flag);
	
	xhr.open('POST', '/crop', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }

			//window['loadOut'](xhr.responseText);
		
			
	}

	xhr.send(parameters);
	
}


