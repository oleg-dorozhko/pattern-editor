var global_url_to_glab='http://localhost:5000';
var glob_all_collected_stones=[];
var glob_all_generated_stones=[];

function labirint(x1,y1)
{
	//document.getElementById('history_div').removeChild(findButton('labirint'));
	

 glob_all_collected_stones=[];
 glob_all_generated_stones=[];
	document.getElementById('canvas0').onclick = function(ev) {
		
		
		pixelsPro_whenClickedOnCanvas(ev); 
		
	} 
	
	document.getElementById('canvas0').toBlob( function(blob) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/init_pixels', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			// if(xhr.responseText=='test ok')
			// {
				// alert('test ok');
				// return;
			// }
			
			
			//var s = 0;//prompt("enter number",'500');
		
			//var wh = Number(s.trim());
			
			var wh=0;
			var x=x1;
			var y=y1;
			var scale_koeficient=2;
			var params = 'x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			glob_x_left_top=x;
			glob_y_left_top=y;
			
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/init_labirint_settings', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr2.response);
					
				newImg.onload = function() {	
					
					showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					var canvas = document.getElementById("pixels");
					if(canvas == null) throw new Error("Canvas pixels not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					
					//getPassColor();
				
		
					var pcnv = document.getElementById("pixels");
					pcnv.onclick = function(e)
					{
						
							e = (e) ? e : event;   
							if(e.button == 2) return;
								
							var x = e.offsetX==undefined?e.layerX:e.offsetX;
							var y = e.offsetY==undefined?e.layerY:e.offsetY;
							
						doLeftClickOnPixelCanvas(x,y);
							
							//pixelsPro_whenClickedOnLabirint(x,y);
					
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
							xhr.open('GET', global_url_to_glab+'/get_xy_labirint', true);
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
								
								// var id = getIDFirstCollectedSelected();
								// if(id!=null)
								// {
									// pixelsPro_whenClickedOnCollected(document.getElementById(id),glob_x_left_top,glob_y_left_top);
								// }
								
								// else 
									
									pixelsPro_whenRightClickedOnLabirint(glob_x_left_top,glob_y_left_top);
								
								
								
							}

							xhr.send();
							
							
							
					
					}
					addStone(
								
								function()
									{
										getChaosedLabirint(function(){
											
											
											// var coords = get_coordinates_of_stone();
											// glob_x_left_top=coords[0];
											// glob_y_left_top=coords[1];
											// doLeftClickOnPixelCanvas(glob_x_left_top+1,glob_y_left_top);
											});
										
									}
								
								);
								
					
					
				}	
				newImg.src = imageUrl;	
					
			}
						
			xhr2.send(params);		
			
		}
		
		xhr.send(blob);
		
	} );
	

}
function doLeftClickOnPixelCanvas(x,y){
							var xhr = new XMLHttpRequest();
							xhr.open('GET', global_url_to_glab+'/get_xy_labirint', true);
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
								
								//getPassColor();
								
							}

							xhr.send();
							
							}
function getPassColor()
{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', global_url_to_glab+'/get_color_for_pass', true);
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

function getChaosedLabirint(callback)
{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', global_url_to_glab+'/get_chaosed_labirint', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
								
			var urlCreator = window.URL || window.webkitURL;
				
			var imageUrl = urlCreator.createObjectURL(xhr.response);
					
			newImg.onload = function() {	
					
							
					var canvas = document.getElementById("canvas0");
					if(canvas == null) throw new Error("Canvas  not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					get_array_of_all_generated_stones(
					
					 function() {callback();}
					
					);
					
					
					
					//getPassColor();
			}		
			newImg.src = imageUrl;			
		}
		
		xhr.send();
}	

function get_array_of_all_generated_stones(callback)
{
	var xhr = new XMLHttpRequest();
				xhr.open('GET', global_url_to_glab+'/get_array_of_all_generated_stones', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var arr = JSON.parse(xhr.responseText);
					glob_all_generated_stones=(arr);
					callback();
				}
				xhr.send();
}				
			

function findButton(id)
{
	var lst = document.getElementById('history_div').childNodes;
	for(var i=0;i<lst.length;i++){
		if(lst[i].innerHTML==id) return lst[i];
	}
	return null;
}

function is_exist_collected_stones_in_pocket()
{
	var lst = document.getElementById('collected_div').childNodes;
	for(var i=0;i<lst.length;i++)
	{
		//if(lst[i].classList.contains('collected_selected')) 
			return true;
	}
	return false;
}


function pixelsPro_whenClickedOnLabirint(x,y)
{
		var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
	var color =  getColorArrayFromImageData(imgData0, x, y)
	
	if(is_stone(x,y,color))
	{
		pixelsPro_whenRightClickedOnLabirint(x,y);
		return;
	} 
	
	
	var params = 'x='+x+'&y='+y;		
	
		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/pixels', true);
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
				
				
			//	var params = 'x='+x+'&y='+y;		
	
		//send to server
		var xhr4 = new XMLHttpRequest();
		xhr4.open('POST', global_url_to_glab+'/get_error_message', true);
		xhr4.responseType = "text";
		xhr4.onload = function() {  
			
			if (xhr4.readyState != 4) return;

			if (xhr4.status != 200) {  var error = xhr4.status + ': ' + xhr4.statusText+': '+xhr4.response; onerror(error); return; }
			
			
			
			
			console.log(''+xhr4.responseText);
			
			if((xhr4.responseText=='6.1.27 stone_neighbours_of not ok')||(xhr4.responseText=='6.1.25 labirint not ok')||(xhr4.responseText=='none'))
			
				//if(comparePrevStateAndNowState(newImg)==0)
				{
					if(is_exist_collected_stones_in_pocket())
					{
						pixelsPro_whenRightClickedOnLabirint(x,y);
						return;
					}
					
					
				}
			
							 getChaosedLabirint( function()
				 {
										
					
				
				// var xhr = new XMLHttpRequest();
				// xhr.open('GET', global_url_to_glab+'/get_collected', true);
				// xhr.onload = function(e) {  
			
					// if (xhr.readyState != 4) return;
				
					// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					// document.getElementById('collected_div').innerHTML = xhr.responseText;
					// var lst = document.getElementById('collected_div').childNodes;
					// for(var i=0;i<lst.length;i++)
					// {
						// lst[i].onclick = selectCollected;
					// }
					// // if(lst[0])selectCollectedOn(lst[0]);
					
					
					// if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
					// {
						// glob_all_collected_stones.push(color);
					// }
					
				// }
				// xhr.send();
				
								
										
										
								});
			
			
			
			
		}
		xhr4.send();		
				
				glob_x_left_top=x;
				glob_y_left_top=y;
				
				// getChaosedLabirint(function(){
					
					
					
					
				
				
				// var xhr = new XMLHttpRequest();
				// xhr.open('GET', global_url_to_glab+'/get_xy_labirint', true);
				// xhr.onload = function(e) {  
			
					// if (xhr.readyState != 4) return;
				
					// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					// var obj = JSON.parse(xhr.responseText);
					// glob_x_left_top=Number(obj.x);
					// glob_y_left_top=Number(obj.y);
					// document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				// }
				// xhr.send();
				
					
				// });
				
				
				
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);

		
}

function comparePrevStateAndNowState(newImg)
{

				var canvas = document.getElementById("pixels");
				var ctx = canvas.getContext("2d");
				var im = ctx.getImageData(0,0,canvas.width,canvas.height);
				
				var canvas2 = document.createElement("canvas");
				var w = canvas.width;
				var h = canvas.height;
				canvas2.width = w;
				canvas2.height = h;
				var ctx2 = canvas2.getContext("2d");
				ctx2.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				var im2 = ctx2.getImageData(0,0,w,h);
			
		
				
				for (var y = 0; y < im2.data.length; y++) {
				
				if(im.data[y]!=im2.data[y]) return 1;
				}
				
				
				
				return 0;
				
}







	
function rt_compareColors(arr,arr2,lim)
{
	for(var j=0;j<arr.length;j++)
	{
		var df = Math.abs(arr[j]-arr2[j]);
		if(df>lim)return false;
	}
	return true;
}

function is_stone_was_collected(color)
{
	var f=false;
	for(var i=0;i<glob_all_collected_stones.length;i++)
	{
		if( rt_compareColors(glob_all_collected_stones[i].color,color,0)==true )
		{ f=true;break;}
	}
	return f;
}

function get_coordinates_of_stone()
{
	if(glob_all_generated_stones.length>0)
	{
		var i=glob_all_generated_stones[0].x;
		var j=glob_all_generated_stones[0].y;
		if((i>=0)&&(j>=0))
		return [i,j];
	}
	return null;
}

function is_stone(rx,ry,color)
{
	var f=false;
	for(var n=0;n<glob_all_generated_stones.length;n++)
	{
		var i=glob_all_generated_stones[n].x;
		var j=glob_all_generated_stones[n].y;
		
		if((i==rx)&&(j==ry))
		{
				if( rt_compareColors(glob_all_generated_stones[n].color,color,0)==true )
		{ f=true;break;}
			
		}
	
	}
	return f;
}

function pixelsPro_whenRightClickedOnLabirint(x,y)
{
	
	var canvas = document.getElementById("pixels");
	var ctx = canvas.getContext("2d");
	var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
	var color =  getColorArrayFromImageData(imgData0, x, y)
	
	// if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
	// {
		// window.open("http://s954447o.bget.ru/labirint");//location='http://s954447o.bget.ru/labirint/';
	// }
	
	
	
	var params = 'x='+x+'&y='+y;	
	var el = document.getElementById("collected_div").childNodes[0];
	if(el)
	{
		//if( el.classList.contains('collected_selected')==true )
		{
			params += '&color='+el.getAttribute('attr_color');
		}
	}
	
	// 
	
		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/right_pixels', true);
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
				 getChaosedLabirint( function()
				 {
										
					
				
				var xhr = new XMLHttpRequest();
				xhr.open('GET', global_url_to_glab+'/get_collected', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					document.getElementById('collected_div').innerHTML = xhr.responseText;
					var lst = document.getElementById('collected_div').childNodes;
					for(var i=0;i<lst.length;i++)
					{
						lst[i].onclick = selectCollected;
					}
					// if(lst[0])selectCollectedOn(lst[0]);
					
					
					if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
					{
						glob_all_collected_stones.push(color);
					}
					
				}
				xhr.send();
				
								
										
										
								});
				
				
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

function selectCollectedOn(el)
{
	if(el.classList.contains('collected_selected')==true)
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
	
		
	document.getElementById(el.id).classList.add("collected_selected");
	
	
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
		xhr.open('POST', global_url_to_glab+'/set_collected_pixels', true);
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
				xhr.open('GET', global_url_to_glab+'/get_collected', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					document.getElementById('collected_div').innerHTML = xhr.responseText;
					var lst = document.getElementById('collected_div').childNodes;
					for(var i=0;i<lst.length;i++)
					{
						lst[i].onclick = selectCollected;
					}
					//if(lst[0])selectCollectedOn(lst[0]);
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