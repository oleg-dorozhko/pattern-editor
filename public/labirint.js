var global_seed_size = 21;
var global_selected_seed = null;
var global_arr_objects = null;
var glob_colors = null;
var global_first_seed_image_data = null;

function copyPasteFinished()
{
	var canvas = document.getElementById("left_canvas");
	if(canvas.width != canvas.height)
	{
		alert("image width should be equal image height");
		return;
	}
	
	
	
			
		
		
		var n = Math.sqrt(canvas.width);
		var s = prompt("Enter seed size",""+n);
		if(s==null) return;
		var n = Number(s);
	
	
	
	
	
	
	
	
	
		
		if(n>2 && n<50)
		{
			global_seed_size = n;
			if(canvas.width % global_seed_size != 0)
			{
				alert("image width should be equal some N*global_seed_size ");
				return;
			}
			
			fill_global_arr_objects();
			
		}
		
		
}

function loadLabirint()
{
	var imgpath = "images/labirint.png";
	imgpath = "images/labirint_size_17_size.png";
	global_seed_size = Number( (""+imgpath.replace("images/labirint_size_","")).replace("_size.png",""));
	alert(global_seed_size);
	
	var img = new Image();
	img.onload = function()
	{
		var canvas = document.getElementById("left_canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		
		if(canvas.width != canvas.height)
		{
			alert("image width should be equal image height");
			return;
		}
		
		if(canvas.width % global_seed_size != 0)
		{
			alert("image width should be equal some N*global_seed_size ");
			return;
		}
		
		var context = canvas.getContext("2d");
		context.drawImage(this,0,0);

		/****
		canvas2 = document.getElementById("canvas2");
		canvas2.width = this.width;
		canvas2.height = this.height;
		var context2 = canvas2.getContext("2d");
		context2.drawImage(this,0,0);
		canvas2.drawImage(cloneInvertedCanvas(context2.getImageData(0,0,this.width, this.height), 1),0,0);
		*****/
		
		
		
	}
	img.src = imgpath;

}



function get_selected_seed(e)
{
	e = (e) ? e : event;   
	if(e.button == 0 || e.button==2) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		
		var n = (x/global_seed_size|0);//-tw;
		var m = (y/global_seed_size|0);//-th;
		
		console.log("x="+x+" y="+y);
		console.log("n="+n+" m="+m);
		
		return [x,y,n,m];
		
	}
}

function getColorFromLeftCanvas(x,y,i,j)
{
	var cnv = document.getElementById("left_canvas");
	var ctx = cnv.getContext("2d");	
	var imageData = ctx.getImageData(x+i,y+j,1,1);
	return "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';

}

function getCanvasSeedImage(first_canvas,x,y)
{
	first_canvas.width = global_seed_size;
	first_canvas.height = global_seed_size;
	var first_context = first_canvas.getContext("2d");
	for(var j=0;j<first_canvas.height;j++)
	{
		for(var i=0;i<first_canvas.width;i++)
		{
			first_context.fillStyle = getColorFromLeftCanvas(x,y,i,j);
			first_context.fillRect(i,j,1,1);	
		}
	}
	return first_canvas;
}

function fill_right_canvas( second_seed )
{
	if(global_selected_seed != null)	
	{
		var x = global_selected_seed[2]*global_seed_size;
		var y = global_selected_seed[3]*global_seed_size;
		
		var x2 = second_seed[2]*global_seed_size;
		var y2 = second_seed[3]*global_seed_size;
		
		var first_canvas = getCanvasSeedImage(document.createElement("canvas"),x,y);
		var second_canvas = getCanvasSeedImage(document.createElement("canvas"),x2,y2);
		
		
		
		
		
		
		
	
	
			
				first_canvas.toBlob( function( blob) {
				
					var xhr = new XMLHttpRequest();
					xhr.open('POST', '/send_seed', true);
					xhr.onload = function(e) {  
					
						if (xhr.readyState != 4) return;
						
						if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
					 	

						second_canvas.toBlob(  function(blob) { 
							blobToServer( blob, "/fill", function( blob_from_server ) {
								getImageFromBlob( blob_from_server, function(img) {
									imageToCanvas(img, "right_canvas", function() { 
										
									});	
									
								});	
							}, function(msg) {
								
								
								console.log("transform(): Was error: "+msg);
								throw new Error(msg);
								
							}); 
						});
	 
						
					}
					xhr.send(blob);
					
						
				});
				
		
		
		/*****
		var rcnv = document.getElementById("right_canvas");
		rcnv.width = global_seed_size*4;
		rcnv.height = global_seed_size*4;
		var rctx = rcnv.getContext("2d");
		rctx.fillStyle = "blue";
		rctx.fillRect(0,0,rcnv.width,rcnv.height);
		******/

	}
}

function put_one_seed_into_right_canvas()
{
	console.log('not implementation');
	if(global_selected_seed != null)	
	{
		var x = global_selected_seed[2]*global_seed_size;
		var y = global_selected_seed[3]*global_seed_size;
		var rcnv = document.getElementById("right_canvas");
		rcnv.width = global_seed_size*2;
		rcnv.height = global_seed_size*2;
	    var rctx = rcnv.getContext("2d");
		for(var j=0;j<rcnv.height;j+=2)
		{
			for(var i=0;i<rcnv.width;i+=2)
			{
				rctx.fillStyle = getColorFromLeftCanvas(x,y,i/2,j/2);
				rctx.fillRect(i,j,2,2);	
			}
		}

	}
}

function free_image_equal(data1, data2)
{
	if(data1 == null) return;
	if(data2 == null) return;
	if(data2.length != data2.length) continue;
	
	var obj_data = data1; //arrObjects[i].data;
	
	var result = true;
	for(var j=0;j<data2.length;j++)
	{
		if(obj_data[j] != data2[j])  
		{
			result=false;
			break;
		}
	}
	if(result==true) return i;
	
}


function findImageDataInArrObjects( arrObjects, data )
{
	for(var i=0;i<arrObjects.length;i++)
	{
		var obj_data = arrObjects[i].data;
		if(obj_data.length != data.length) continue;
		var result = true;
		for(var j=0;j<data.length;j++)
		{
			if(obj_data[j] != data[j])  
			{
				result=false;
				break;
			}
		}
		if(result==true) return i;
	}
	return null;
}

function cloneImageData(data)
{
	var data1 = [];
	for(var j=0;j<data.length;j++)
	{
		data1.push(data[j]);
	}
	return data1;
}

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	var s = "rgba("+r+","+g+","+b+","+a+")";
	if(glob_colors == null)
	{
		glob_colors = [];
		glob_colors.push(s);
		return s;
	}
	else
	{
		if(glob_colors.indexOf(s)==-1) { glob_colors.push(s); return s; }
		else return getRndColor();
	}
	
}
	
	function fill_global_arr_objects()
	{
	
		var arrObjects = [];
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
				
		for(var j=0;j<canvas.height;j+=global_seed_size)
		{
			for(var i=0;i<canvas.width;i+=global_seed_size)
			{
				var imageData = context.getImageData(i,j,global_seed_size,global_seed_size);
				var result = findImageDataInArrObjects( arrObjects, imageData.data );
				if(result==null)
				{
					var obj = {};
					obj.points = [[i,j]];
					obj.data = cloneImageData(imageData.data);
					arrObjects.push(obj);
				}
				else
				{
					arrObjects[result].points.push([i,j]);
				}
				
			}
		}
		
		global_arr_objects = arrObjects;
	
	
	}
	
	//I have the sword of Azeroth! I am master of battle!

function findAllCellByColor(cnv, color)
{
	fill_global_arr_objects();
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").fillStyle = color;
	canvas2.getContext("2d").fillRect(0,0,global_seed_size,global_seed_size);
	var imgData = canvas2.getContext("2d").getImageData( 0,0,global_seed_size,global_seed_size);
	
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		var canvas = document.getElementById("left_canvas");
	    var context = canvas.getContext("2d");
		//alert(global_arr_objects[result].points);	
		var imgData2 = cnv.getContext("2d").getImageData(0,0,cnv.width,cnv.height);
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.putImageData(imgData2, p[0],p[1]);
			
			
		}
		
		document.body.removeChild(cnv);
	}
}

function whenUserRightClickOnLeftCanvas(e)
{
	//alert('test ok');
	global_selected_seed = get_selected_seed(e);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = global_selected_seed[2];
	var m = global_selected_seed[3];
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").putImageData(imgData, 0,0);
	canvas2.onclick = function()
	{
		//alert(this.getAttribute("data-color"));
		var points = findAllCellByColor(this, this.getAttribute("data-color"));
	}
	document.body.appendChild(canvas2);
	
	fill_global_arr_objects();
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		var color = getRndColor();
		canvas2.setAttribute("data-color", color);
		//alert(global_arr_objects[result].points);	
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.fillStyle = color;
			context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
			
			
		}
	}
	
	e.preventDefault();
}

function highlight()
{
	if(global_selected_seed != null)	
	{
			//alert('test ok');
	//global_selected_seed = get_selected_seed(e);
	
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var n = global_selected_seed[2];
	var m = global_selected_seed[3];
	var imgData = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	global_first_seed_image_data = cloneUnrealImageData(n,m,imgData);
	
	context.fillStyle = "rgba(255,0,255,0.5)";
	context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	/******
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	canvas2.getContext("2d").putImageData(imgData, 0,0);
	canvas2.onclick = function()
	{
		//alert(this.getAttribute("data-color"));
		var points = findAllCellByColor(this, this.getAttribute("data-color"));
	}
	document.body.appendChild(canvas2);
	
	fill_global_arr_objects();
	var result = findImageDataInArrObjects( global_arr_objects, imgData.data );
	if(result!=null)
	{
		var color = getRndColor();
		canvas2.setAttribute("data-color", color);
		//alert(global_arr_objects[result].points);	
		for(var i=0;i<global_arr_objects[result].points.length;i++)
		{
			var p = global_arr_objects[result].points[i];
			context.fillStyle = color;
			context.fillRect(p[0],p[1],global_seed_size,global_seed_size);
			
			
		}
	}
	
	e.preventDefault();
	
	*****/
	}
}

function exchange(e)
{
	if(global_first_seed_image_data != null)	
	{
		//alert('test exch ok');
		
		var second_selected_seed = get_selected_seed(e);
		if(second_selected_seed == null) return;	
	
		var canvas = document.getElementById("left_canvas");
		var context = canvas.getContext("2d");
		//alert('test exch ok #2');
		var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
			//alert('test == ok');
			return;
		}
		
		var tImgData1 = global_first_seed_image_data;//context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var imgData2 = context.getImageData(n2*global_seed_size,m2*global_seed_size,global_seed_size,global_seed_size);
		
		var tImgData2 = cloneUnrealImageData(n2,m2,imgData2);
		///var tImgData1 = cloneUnrealImageData(n,m,imgData);
		
		//510 red
		context.putImageData(tImgData1,n2*global_seed_size,m2*global_seed_size);  //2 <= 1   1<=tim   2?
		
		context.putImageData(tImgData2,n*global_seed_size,m*global_seed_size);
		
		//context.putImageData(tImgData,n2*global_seed_size,m2*global_seed_size);
		
		global_first_seed_image_data = null;
		second_selected_seed = null;
		global_selected_seed == null;
		//var imgData2 = cloneImageData(imgData);
		
		//context.fillStyle = "rgba(0,255,255,0.5)";
		//context.fillRect(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
		
	}	
	
}

function cloneUnrealImageData(n,m,imgData)
{
	/********
	var second_selected_seed = get_selected_seed(e);
	if(second_selected_seed == null) return;	
	var n = second_selected_seed[2];
	var m = second_selected_seed[3];
	*******/
	
	var canvas = document.getElementById("left_canvas");
	var context = canvas.getContext("2d");
	var imgData0 = context.getImageData(n*global_seed_size,m*global_seed_size,global_seed_size,global_seed_size);
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	var ctx = canvas2.getContext("2d");
	ctx.putImageData(imgData0, 0,0);
	
	return ctx.getImageData(0,0,global_seed_size,global_seed_size);
	
		
}	

function matrixmove()
{
	
}	

function whenUserLeftClickOnLeftCanvas(e)
{
	//alert('left');
	if(global_selected_seed == null)	
	{
		global_selected_seed = get_selected_seed(e);
		highlight();
		//put_one_seed_into_right_canvas();
	}
	else 
	{
		//put_one_seed_into_right_canvas(); //zmey za hvost sebya kusaet 
		
		var second_seed = get_selected_seed(e);
		exchange(e);
		//fill_right_canvas( second_seed );
		global_selected_seed = null;
	}
	/*******/
	
	matrixmove();
	
}

function clear_right_canvas()
{
	var rcnv = document.getElementById("right_canvas");
	rcnv.width = 1;
	rcnv.height = 1;
}

function whenUserLeftClickOnRightCanvas()
{
	
	if(global_selected_seed == null)	
	{
		clear_right_canvas();
		global_selected_seed = null;
	}
	
	if(second_selected_seed!=null && global_selected_seed!=null)
	{
	var n2 = second_selected_seed[2];
		var m2 = second_selected_seed[3];
		
		var n = global_selected_seed[2];
		var m = global_selected_seed[3];
		
		if(n==n2 && m==m2) 
		{
			//context.putImageData(global_first_seed_image_data,n2*global_seed_size,m2*global_seed_size);
			
			return;
		}
	}
	matrixmove();
}


window.onload = function()
{
	CLIPBOARD_CLASS("left_canvas", true);
	loadLabirint();
	fill_global_arr_objects();
	
	document.getElementById("left_canvas").onclick = whenUserLeftClickOnLeftCanvas;
	document.getElementById("left_canvas").oncontextmenu = whenUserRightClickOnLeftCanvas;
	document.getElementById("right_canvas").onclick = whenUserLeftClickOnRightCanvas;
}