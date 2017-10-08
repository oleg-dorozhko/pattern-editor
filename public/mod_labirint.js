function labirint()
{
	document.getElementById('history_div').removeChild(findButton('labirint'));
	
	document.getElementById('canvas').onclick = function(ev) {
		
		
		pixelsPro_whenClickedOnCanvas(ev); 
		
	} 
	
	document.getElementById('canvas').toBlob( function(blob) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/init_pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			// if(xhr.responseText=='test ok')
			// {
				// alert('test ok');
				// return;
			// }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				showScaleDiv(this,0,0);
						
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
				
				var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				
				
			
	
				var pcnv = document.getElementById("pixels");
				pcnv.onclick = function(e)
				{
					
						e = (e) ? e : event;   
						if(e.button == 2) return;
							
						var x = e.offsetX==undefined?e.layerX:e.offsetX;
						var y = e.offsetY==undefined?e.layerY:e.offsetY;
						
					
						
						var xhr = new XMLHttpRequest();
						xhr.open('GET', '/get_xy_labirint', true);
						xhr.onload = function(e) {  
					
							if (xhr.readyState != 4) return;
						
							if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
							
							var obj = JSON.parse(xhr.responseText);
							glob_x_left_top=Number(obj.x);
							glob_y_left_top=Number(obj.y);
							var nn = Number(obj.nn);
							var n = (x/(10*nn)|0)-7;
							var m = (y/(10*nn)|0)-7;
						
							glob_x_left_top += n;
							glob_y_left_top += m;
							
							
							
							pixelsPro_whenClickedOnLabirint(glob_x_left_top,glob_y_left_top);
							
							
							
						}

						xhr.send();
						
						
						
				
				}
							
					
				var pcnv = document.getElementById("pixels");
				pcnv.oncontextmenu = function(e)
				{
					e.preventDefault();
						 e = (e) ? e : event;   
					//if(e.button == 2) return; */
							
						var x = e.offsetX==undefined?e.layerX:e.offsetX;
						var y = e.offsetY==undefined?e.layerY:e.offsetY;
						
						
						var xhr = new XMLHttpRequest();
						xhr.open('GET', '/get_xy_labirint', true);
						xhr.onload = function(e) {  
					
							if (xhr.readyState != 4) return;
						
							if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
							
							var obj = JSON.parse(xhr.responseText);
							glob_x_left_top=Number(obj.x);
							glob_y_left_top=Number(obj.y);
							var nn = Number(obj.nn);
							var n = (x/(10*nn)|0)-7;
							var m = (y/(10*nn)|0)-7;
							
							glob_x_left_top += n;
							glob_y_left_top += m;
							
							var id = getIDFirstCollectedSelected();
							if(id!=null)
							{
								pixelsPro_whenClickedOnCollected(document.getElementById(id),glob_x_left_top,glob_y_left_top);
							}
							
							else 
								
								pixelsPro_whenRightClickedOnLabirint(glob_x_left_top,glob_y_left_top);
							
							
							
						}

						xhr.send();
						
						
						
				
				}
								
					
	
					
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(blob);
		
	} );
	

}

function findButton(id)
{
	var lst = document.getElementById('history_div').childNodes;
	for(var i=0;i<lst.length;i++){
		if(lst[i].innerHTML==id) return lst[i];
	}
	return null;
}

function pixelsPro_whenClickedOnLabirint(x,y)
{
	
	var params = 'x='+x+'&y='+y;		

		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
				
				var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_xy_labirint', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var obj = JSON.parse(xhr.responseText);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				}
				xhr.send();
				
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);

		
}


function pixelsPro_whenRightClickedOnLabirint(x,y)
{
	
	var params = 'x='+x+'&y='+y;		

		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/right_pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
				
				var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_collected', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					document.getElementById('collected_div').innerHTML = xhr.responseText;
					var lst = document.getElementById('collected_div').childNodes;
					for(var i=0;i<lst.length;i++)
					{
						lst[i].onclick = selectCollected;
					}
					
				}
				xhr.send();
				
				
				/*
				pixelsPro_whenClickedOnLabirint(-1,-1);
				
						
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_xy_labirint', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var obj = JSON.parse(xhr.responseText);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				}
				xhr.send();
				*/
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);

		
}

//returns id
function getIDFirstCollectedSelected()
{
	
		var lst = document.getElementById("collected_div").childNodes;
		
		for(var i=0;i< lst.length;i++)
		{
			var el = document.getElementById(lst[i].id);
			if(el.classList.contains('collected_selected')==true) return el.id;
			
		}
		
		return null;
}

function selectCollected()
{
	if(this.classList.contains('collected_selected')==true)
	{
		var lst = document.getElementById("collected_div").childNodes;
		for(var i=0;i< lst.length;i++)
		{
			var el = document.getElementById(lst[i].id);
			el.classList.remove("collected_selected");
			
		}
		
		return;
	}
	
	var lst = document.getElementById("collected_div").childNodes;
	for(var i=0;i< lst.length;i++)
	{
		var el = document.getElementById(lst[i].id);
		el.classList.remove("collected_selected");
		
	}
	
		
	document.getElementById(this.id).classList.add("collected_selected");
	
	
}


function pixelsPro_whenClickedOnCollected(el,x,y)
{
	
	
	var params = 'x='+x+'&y='+y+'&color='+el.getAttribute('attr_color');		

		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/set_collected_pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
				
				var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_collected', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					document.getElementById('collected_div').innerHTML = xhr.responseText;
					var lst = document.getElementById('collected_div').childNodes;
					for(var i=0;i<lst.length;i++)
					{
						lst[i].onclick = selectCollected;
					}
					
				}
				xhr.send();
				
				
				/*
				pixelsPro_whenClickedOnLabirint(-1,-1);
				
						
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_xy_labirint', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var obj = JSON.parse(xhr.responseText);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				}
				xhr.send();
				*/
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);

}