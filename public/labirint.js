var global_seed_size = 21;

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


var global_selected_seed = null;

function get_selected_seed(e)
{
	e = (e) ? e : event;   
	if(e.button == 0) 
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

function whenUserLeftClickOnLeftCanvas(e)
{
	//alert('left');
	if(global_selected_seed == null)	
	{
		global_selected_seed = get_selected_seed(e);
		put_one_seed_into_right_canvas();
	}
	else 
	{
		//put_one_seed_into_right_canvas(); //zmey za hvost sebya kusaet 
		
		var second_seed = get_selected_seed(e);
		fill_right_canvas( second_seed );
		global_selected_seed = null;
	}
	
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
}


window.onload = function()
{
	CLIPBOARD_CLASS("left_canvas", true);
	loadLabirint();
	document.getElementById("left_canvas").onclick = whenUserLeftClickOnLeftCanvas;
	document.getElementById("right_canvas").onclick = whenUserLeftClickOnRightCanvas;
}