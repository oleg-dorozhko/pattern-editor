function labirint()
{
	document.getElementById('history_div').removeChild(findButton('labirint'));
	var s = prompt("enter number",'50');
		
	var wh = Number(s.trim());

	document.getElementById('canvas').onclick = function(ev) {
		
		
		pixelsPro_whenClickedOnCanvas(ev); 
		
	} 
	
	document.getElementById('canvas').toBlob( function(blob) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/init_pixels', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			// if(xhr.responseText=='test ok')
			// {
				// alert('test ok');
				// return;
			// }
			var x=0;
			var y=0;
			var scale_koeficient=2;
			var params = 'x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			
			
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', '/init_labirint_settings', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr2.response);
					
				newImg.onload = function() {	
					
					showScaleDiv(this,0,0);
					
					
					
					var canvas = document.getElementById("pixels");
					if(canvas == null) throw new Error("Canvas pixels not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					
					getPassColor();
				
		
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
								
								getPassColor();
								
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
					
					getChaosedLabirint();
					
				}	
				newImg.src = imageUrl;	
					
			}
						
			xhr2.send(params);		
			
		}
		
		xhr.send(blob);
		
	} );
	

}

function getPassColor()
{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/get_color_for_pass', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			if(document.getElementById("pcolor")) document.getElementById("pixels_buttons").removeChild(document.getElementById("pcolor"));
					var arr=null;
					if(xhr.responseText==',,,') arr=[255,255,255,255];
					else arr=xhr.responseText.split(",");		
					console.log(arr);
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.id='pcolor';
					canvas.width = 20;
					canvas.height = 20;
					canvas.style.margin="5px";
					ctx.fillStyle='rgba('+arr[0]+','+arr[1]+','+arr[2]+','+arr[3]/255+')';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					document.getElementById("pixels_buttons").appendChild(canvas);
					
		}		
				
		
		
		xhr.send();
}	

function getChaosedLabirint()
{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/get_chaosed_labirint', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
								
			var urlCreator = window.URL || window.webkitURL;
				
			var imageUrl = urlCreator.createObjectURL(xhr.response);
					
			newImg.onload = function() {	
					
							
					var canvas = document.getElementById("canvas");
					if(canvas == null) throw new Error("Canvas  not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					getPassColor();
			}		
			newImg.src = imageUrl;			
		}
		
		xhr.send();
}			
			// if(xhr.responseText=='test ok')
			// {
				// alert('test ok');
				// return;

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
				
				getChaosedLabirint();
				
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
				
				getChaosedLabirint();
				
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