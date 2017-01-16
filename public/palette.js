var glob_colors = null;

var global_copy_area_mode = false;

function decreaseOnlyLast(num, tid)
{
	var t0 =  document.getElementById("colors_"+tid+"_table");
	if(Number(num) != t0.rows[0].cells.length-1) return;
	
	var r = 0;
	for(var i=0;i<t0.rows[0].cells.length-1;i++)
	{
		if(t0.rows[0].cells[i].style["background-color"] != "white")
		{
			var s = t0.rows[0].cells[i].innerHTML;
			s = s.replace("[","");
			s = s.replace("]","");
			r = Number(s.split("-")[1]);
		}
	}
	
	return r;
}

function ddummy(t0)
{
	var r = 0;
	for(var i=0;i<t0.rows[0].cells.length;i++)
	{
		if(t0.rows[0].cells[i].style["background-color"] != "white")
		{
			var s = t0.rows[0].cells[i].innerHTML;
			s = s.replace("[","");
			s = s.replace("]","");
			r = Number(s.split("-")[1]);
		}
	}
	
	return r;
}

function allThreeTableWeCountNow()
{
	var res = [0,0,0];
	
	
	var t0 = document.getElementById("colors_0_table");	
	var t1 = document.getElementById("colors_1_table");	
	var t2 = document.getElementById("colors_2_table");	
	
	if(
	t0.rows[0].cells[0].style["background-color"] == "white"
	&& t1.rows[0].cells[0].style["background-color"] == "white"
	&& t2.rows[0].cells[0].style["background-color"] == "white"
	) return res;
	
	var red = ddummy(t0);
	var green = ddummy(t1);
	var blue = ddummy(t2);
	
	res[0] = red;
	res[1] = green;
	res[2] = blue;
	
	return res;
	
}
function getColorValueByNumber(num, val)
{
	var color = ddummy( document.getElementById("colors_"+num+"_table") );
	color+=val;
	if(num==0) return "rgba("+color+",0,0,255)";
	if(num==1) return "rgba(0,"+color+",0,255)";
	if(num==2) return "rgba(0,0,"+color+",255)";
	return null;
}
function getColorFromTableNumber(num)
{
	var color = ddummy( document.getElementById("colors_"+num+"_table") );
	if(num==0) return "rgba("+color+",0,0,255)";
	if(num==1) return "rgba(0,"+color+",0,255)";
	if(num==2) return "rgba(0,0,"+color+",255)";
	return null;
}

function getColorFromGlobColors()
{
	
	return "rgba("+glob_colors[0]+","+glob_colors[1]+","+glob_colors[2]+",255)";
}


function updateColorsTable(n2)
{
	
	
	var t = document.getElementById("colors_"+n2+"_table");
	if(t==null)
	{
		t = document.createElement("table");
		t.id = "colors_"+n2+"_table";
		t.cellspacing="5px";
		t.cellpadding="5px";
		//t.style.padding="5px 5px 5px 5px";
		t.style.margin="10px 0px 0px 0px";
	
		var colors = [];
		colors[0] = "red";
		colors[1] = "green";
		colors[2] = "blue";
		
		t.style.border="2px solid "+colors[n2];
		
		var row = t.insertRow(0);
		document.getElementById("divcolors_"+n2+"_table").appendChild(t);	
		
		var di = Number(document.getElementById("diapazon").value);
		
		for(var i=0;i<di;i++)
		{
			t.rows[0].insertCell(i);
			t.rows[0].cells[i].id = t.id + "_td_"+i;
			t.rows[0].cells[i].style["background-color"] = "white"; 
			t.rows[0].cells[i].onclick = function(e)
			{
				glob_colors = allThreeTableWeCountNow();
				
				
				
				var arr = this.id.split("_");
				//alert(arr); //1,4
				//return;
				
				
				
				var tid = arr[1];
				var tdid = Number(arr[4]);
				
				
				var tL = document.getElementById("colors_"+tid+"_table");
				
					
					//can be from 0 to 1 (incl) or more
					var val = 	256 / tL.rows[0].cells.length * (tdid+1);
					val = val - (val %1);
					
					val--;
					
					if(tdid==0 && glob_colors[tid] == val) 
					{
						
						
						//glob_colors[tid] = decreaseOnlyLast(tdid,tid);
						
						
						for(var ii=0;ii<di;ii++)
						{
							 
							tL.rows[0].cells[ii].style["background-color"]= "white";
						}
			
						
					}
					else
					{
					
						glob_colors[tid] = val;
						
						for(var ii=0;ii<di;ii++)
						{
							 
							tL.rows[0].cells[ii].style["background-color"]= "white";
						}
						
					
					 
				
						for(var ii=0;ii<(tdid+1);ii++)
						{
							
							
							tL.rows[0].cells[ii].style["background-color"]= getColorValueByNumber(tid,val);
						}
					}
					
					glob_colors = allThreeTableWeCountNow();
					
					show50pxSquare();
					
			}
				
		
				
		}
			
			
	
		
		
		var f = 256/t.rows[0].cells.length;
		
		f = f - (f%1);
		
		var n=0;
		var m=f-1;
		for(var i=0;i<t.rows[0].cells.length;i++)
		{
		t.rows[0].cells[i].innerHTML = "["+n+"-"+m+"]";
		n+=f;
		m=n+f-1;
		}
		
		
		
		
		
	}
	else
	{
		
		glob_colors = [];
		
		document.getElementById("divcolors_"+n2+"_table").removeChild(t);
		
		
		updateColorsTable(n2);
	}
	 
	
}

function show50pxSquare()
{
	if(glob_colors == null)
	{
		
		var canvas = document.getElementById("canvasResult");
		canvas.width= 1;
		canvas.height= 1;
		canvas.width= 50;
		canvas.height= 50;
		var context = canvas.getContext("2d");
		context.fillStyle = "rgba(0,0,0,255)";
		context.fillRect(0,0,50,50);
		
		return;
		
	}
	
	if(glob_colors[0] != null || glob_colors[0] != undefined  )
	{
		var canvas = document.getElementById("canvasResult");
		canvas.width= 1;
		canvas.height= 1;
		canvas.width= 50;
		canvas.height= 50;
		var context = canvas.getContext("2d");
		context.fillStyle = getColorFromGlobColors();
		context.fillRect(0,0,50,50);
	}
	
}

window.addEventListener('load', function()
{
	glob_colors = null;
	
	for(var i=0;i<3;i++)
			updateColorsTable(i); 
		
	show50pxSquare();	
	
	
		
	document.getElementById("diapazon").onchange = function()
	{
		glob_colors = null;
		
		for(var i=0;i<3;i++)
				updateColorsTable(i); 
		
		show50pxSquare();	
			
	}
	

	
	
});

var glob_left_top = null;
var glob_right_bottom = null;
var glob_palette = null;

var glob_init_x = null;
var glob_init_y = null;

function getRandomInt(min, max) 
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
	
function randomPaletteCanvas(cnvName, mode)
{
	if(mode == "use")
	{
		if(glob_palette !=  null)
		{
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var canvas2 = document.getElementById(cnvName);
			canvas2.width = canvas.width;
			canvas2.height = canvas.height;
			
			var context2 = canvas2.getContext("2d");
			
			var arr1 = [];  // imgData colors
			var arr2 = [];  // resultColors
			
			for(var j=0; j<canvas.height; j++)
			{
				for(var i=0; i<canvas.width; i++)
				{
					var imgData = context.getImageData(i,j,1,1);
					var s = imgData.data.join(","); 
					
				
						var index = arr1.indexOf(s);
						if( index  === -1 )
						{
							arr1.push(s);
							arr2.push(glob_palette[getRandomInt(0,glob_palette.length-1)]);
							s = arr2[arr2.length-1]; //if this stroka commented we get podpis
						}
						else
						{
							s = arr2[index];
						}
					
					
					
					
					var col = s.split(",");
					context2.fillStyle = "rgba("+col[0]+","+col[1]+","+col[2]+","+col[3]+")";
					context2.fillRect(i,j,1,1);
					
				}
			}
		}
	}
	else if(mode == "remove")
	{
		
		
		
		
		if(glob_palette !=  null)
		{
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var canvas2 = document.getElementById(cnvName);
			canvas2.width = canvas.width;
			canvas2.height = canvas.height;
			
			var context2 = canvas2.getContext("2d");
			
			
			
			for(var j=0; j<canvas.height; j++)
			{
				for(var i=0; i<canvas.width; i++)
				{
					var imgData = context.getImageData(i,j,1,1);
					var s = imgData.data.join(","); 
					
				
						var index = glob_palette.indexOf(s);
						
						if( index  !== -1 )
						{
							context2.fillStyle = "white";
							
						}
						else
						{
							var col = s.split(",");
							context2.fillStyle = "rgba("+col[0]+","+col[1]+","+col[2]+","+col[3]+")";
							
						}
						context2.fillRect(i,j,1,1);
					
				}
			}
		}
		
	
		
		
	}
	
	
	
}

function usePalette()
{
	  
	
	var arr = [];
	
	
	var pt = document.getElementById("palette_table");
	if(pt!=null)
	{
		for(var i=0;i<pt.rows[0].cells.length;i++)
		{
			
			var canvas = pt.rows[0].cells[i].childNodes[0];
			var context = canvas.getContext("2d");
			
			var imgData = context.getImageData(1,1,1,1);
			var s = imgData.data.join(","); 
			if( arr.indexOf(s)=== -1 )   arr.push(s);
		}
		 
		 
		
		glob_palette = arr;
		
		var mode="use";
		randomPaletteCanvas("palette_canvas",mode);
	
	}
	
}




function remPalette()
{
	  
	
	var arr = [];
	
	
	var pt = document.getElementById("palette_table");
	if(pt!=null)
	{
		for(var i=0;i<pt.rows[0].cells.length;i++)
		{
			
			var canvas = pt.rows[0].cells[i].childNodes[0];
			var context = canvas.getContext("2d");
			
			var imgData = context.getImageData(1,1,1,1);
			var s = imgData.data.join(","); 
			if( arr.indexOf(s)=== -1 )   arr.push(s);
		}
		 
		 
		
		glob_palette = arr;
		var mode="remove";
		randomPaletteCanvas("palette_canvas",mode);
	
	}
	
}








var glob_colors = null;

function drawBlueRedRectangle(pContext, i,j)
{
	
			//pContext.fillStyle = "rgba("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+",255)";
			//pContext.fillRect(i,j,5,5);
			pContext.strokeStyle="blue";
			pContext.strokeRect(i*5,j*5,5,5);
			pContext.strokeStyle="red";
			pContext.strokeRect((i*5+1),(j*5+1),3,3);
			
}

function getRGB(glob_colors)
{
	return "rgba("+glob_colors[0]+","+glob_colors[1]+","+glob_colors[2]+",255)";

}

function showPalette()
{
	if(document.getElementById("palette_td").childNodes.length == 0)
	{
		glob_colors = [];
		
		
		//if()
		
		
		//var w = glob_right_bottom[0] - glob_left_top[0];
		//var h = glob_right_bottom[1] - glob_left_top[1];
		
		var w = 40;
		var h = 40;
		
		var pCanvas = document.createElement("canvas");
		var pContext = pCanvas.getContext("2d");
		pCanvas.width = w*5;
		pCanvas.height = h*5;
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		
		//var imgData = context.getImageData(glob_left_top[0],glob_left_top[1],w,h);
		
		var x2 = glob_init_x-20;
		var y2 = glob_init_y-20;
				
		for(var j=0;j<h*5;j+=5)
		{
			for(var i=0;i<w*5;i+=5)
			{
				
				
				var imgData = context.getImageData(i/5 + x2,j/5+y2,1,1);
				pContext.fillStyle = "rgba("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+",255)";
				pContext.fillRect(i,j,5,5);
				pContext.strokeStyle="white";
				pContext.strokeRect(i,j,5,5);
			}
		}
		
		
		
			if(glob_left_top!=null)
			{
				var i = (glob_left_top[0] - x2) ;
				var j = (glob_left_top[1] - y2) ;		
				drawBlueRedRectangle(pCanvas.getContext("2d"),i,j);
			}
			
			if(glob_right_bottom!=null)
			{
				var i = (glob_right_bottom[0] - x2) ;
				var j = (glob_right_bottom[1] - y2) ;	
				drawBlueRedRectangle(pCanvas.getContext("2d"),i,j);
			}
		
	
		
		pCanvas.onclick = function(e)
		{
			var x = e.offsetX==undefined?e.layerX:e.offsetX;
			var y = e.offsetY==undefined?e.layerY:e.offsetY;
			
			var i = x / 5 | 0 ;


			var j = y / 5 | 0 ;
			
			
			var x2 = glob_init_x-20;
			var y2 = glob_init_y-20;
			
			var left = i+(glob_init_x-20);
			
			if( left < 0 || left >= document.getElementById("canvas").width ) 
			{
				//clearAllPlatteSettings();
				
				return;
			}
			
			var topp = j+(glob_init_y-20);
			if( topp < 0 || topp >= document.getElementById("canvas").height )
			{
				//clearAllPlatteSettings();
				return;
			}
			
			if(glob_left_top!=null)
			{
				if( glob_left_top[0] == left && glob_left_top[1] == topp )
				{
					/*****
					pContext.fillStyle = getRGB(document.getElementById("canvas").getContext("2d").getImageData(i,j,1,1).data);
					pContext.fillRect(i*5,j*5,5,5);
					pContext.strokeStyle="white";
					pContext.strokeRect(i*5,j*5,5,5);
					*****/
					
					glob_left_top = null;
					
					showPalette();
					
					return;
					
				}
			}
			
			if(glob_right_bottom!=null)
			{
				if( glob_right_bottom[0] == left && glob_right_bottom[1] == topp )
				{
					/***
					pContext.fillStyle=getRGB(document.getElementById("canvas").getContext("2d").getImageData(i,j,1,1).data);
					pContext.fillRect(i*5,j*5,5,5);
					pContext.strokeStyle="white";
					pContext.strokeRect(i*5,j*5,5,5);
					*****/
					
					glob_right_bottom = null;
					
					showPalette();
					
					return;
				}
			}
			
			
			//var pContext = this.getContext("2d");
			
			//drawBlueRedRectangle(pContext, i, j);
				
			
			if(glob_left_top == null && glob_right_bottom == null) glob_left_top = [left,topp]; 
			else if (glob_left_top != null && glob_right_bottom == null)  glob_right_bottom = [left,topp]; 
			else if (glob_left_top != null && glob_right_bottom != null )
			{
				glob_left_top=[left,topp]; 
				glob_right_bottom=null;
			}
			else if (glob_left_top != null && glob_right_bottom == null )
			{
				
				glob_right_bottom=[left,topp]; 
			}
			else if (glob_left_top == null && glob_right_bottom != null )
			{
				
				glob_left_top=[left,topp]; 
			}
			 
				/** clearAll ***/
				/***
				pContext.fillStyle="white";
				pContext.fillRect(i,j,3,3);
				pContext.strokeStyle="white";
				pContext.strokeRect(i,j,5,5);
				/***/
	
				
			
			//	clearAllPlatteSettings();
			
			showPalette();
			
			
			/**********
			
			if(glob_left_top == null) return; //glob_left_top = [0,0];
				
				glob_right_bottom  = [x1+glob_left_top[0],y1+glob_left_top[1]];
				document.getElementById("rightbottom").parentNode.classList.toggle("blue-bordered");
				document.getElementById("rightbottom").checked = false;
				
				return;
			
			******/
			
			
			//alert("x/5="+(x-(x%1)));
		}
		
		//pContext.putImageData(imgDataRes, 0, 0 );
		
		document.getElementById("palette_td").appendChild(pCanvas);
		
		
		
	
	}
	
	else
	{
		
		
		
		
		//document.getElementById("palette_td"). //removeAllNodes  
		var myNode = document.getElementById("palette_td");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}	

			/*********
		var myNode = document.getElementById("palette_div");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}			
			*****/
			showPalette();
			
			
			/*******/
			
			//alert("Palette is not empty");
		
	}
	
	
}

function clearAllPlatteSettings()
{
				
				//document.getElementById("palette_td"). //removeAllNodes  
		var myNode = document.getElementById("palette_td");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}	

		var myNode = document.getElementById("palette_div");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}		



			//clearGlobalsAndPalette();
			
			
			//showPalette();
						
			
			
}





var glob_rem_elem = null;

function removeColorInPalette()
{
	if(glob_rem_elem != null)
	{
		var t = document.getElementById("palette_table");
		if(t != null)
		{
			var num = Number(glob_rem_elem.replace("cnv_",""));
			t.rows[0].deleteCell(num);
			glob_rem_elem = null;
		}
		
		
	}
}

function renumerateCanvaces()
{
	var t = document.getElementById("palette_table");
	if(t != null)
	{
		for(var i=0;i<t.rows[0].cells.length;i++)
		{
			t.rows[0].cells[i].childNodes[0].id="cnv_"+i;
		}
	}
}

function clearPalette()
{
	clearGlobalsAndPalette();
}

function clearGlobalsAndPalette()
{
	glob_colors = null;
	glob_colors = [];
	//glob_left_top = null;
	//glob_right_bottom = null;
	
	var myNode = document.getElementById("palette_div");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}		



			
	
	
}

function getSelectedColorImageDataFromPaletteDiv()
{
	
	if(document.getElementById("palette_div").childNodes.length==1)
	{
		var rows = document.getElementById("palette_div").childNodes[0].rows;
		var lim = rows[0].cells.length;
		for(var i=0;i<lim;i++)
		{
			var cp_cell = rows[0].cells[i].childNodes[0];
			
			if( cp_cell.getAttribute('cpstate') == "selected" ) 
				
				return rows[0].cells[i].childNodes[0].getContext("2d").getImageData(1,1,1,1);
				
		}
		
	}
	
	return null;
}

function setOnePixel()
{
	
	var selectedColorImageData = getSelectedColorImageDataFromPaletteDiv();
	
	if( selectedColorImageData == null ) return;
		
	var point = null;	
	
	if(glob_left_top != null)
	{
		
		if(glob_left_top[0] < 0) glob_left_top[0]=0;
		if(glob_left_top[0] >= document.getElementById("canvas").width ) glob_left_top[0]=document.getElementById("canvas").width-1;
		
			
		if(glob_left_top[1] < 0) glob_left_top[1]=0;
		if(glob_left_top[1] >= document.getElementById("canvas").height ) glob_left_top[1]=document.getElementById("canvas").height-1;
		
			
		point  = glob_left_top;			
			
		
			
	}

	else if( glob_right_bottom != null )	
	{
		
		
		
		
			
		if(glob_right_bottom[0] < 0) glob_right_bottom[0]=0;
		if(glob_right_bottom[0] >= document.getElementById("canvas").width) glob_right_bottom[0]=document.getElementById("canvas").width-1;
			
			
		if(glob_right_bottom[1] < 0) glob_right_bottom[1]=0;
		if(glob_right_bottom[1] >= document.getElementById("canvas").height) glob_right_bottom[1]=document.getElementById("canvas").height-1;
			
		point = glob_right_bottom;
		
	}
	
	if(point == null) return;
			
			
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
		
	context.putImageData( selectedColorImageData, point[0],point[1]);
	
	glob_left_top = null;
	glob_right_bottom = null;
	
	showPalette();
	
	
	
}



function __changeOnePixel(n1,n2)
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var imgData = context.getImageData(n1[0],n1[1],1,1);
	var imgData2 = context.getImageData(n2[0],n2[1],1,1);
	var s = imgData.data.join(","); 
	var s2 = imgData2.data.join(","); 
	var col = s.split(",");
	var col2 = s2.split(",");
	
	context.fillStyle = "rgba("+col[0]+","+col[1]+","+col[2]+","+col[3]+")";
	context.fillRect(n2[0],n2[1],1,1);
	
	context.fillStyle = "rgba("+col2[0]+","+col2[1]+","+col2[2]+","+col2[3]+")";
	context.fillRect(n1[0],n1[1],1,1);
}
	
function processLeftTopRightBottom()
{
	if(glob_left_top[0] < 0) glob_left_top[0]=0;
		if(glob_left_top[0] >= document.getElementById("canvas").width ) glob_left_top[0]=document.getElementById("canvas").width-1;
		
		if(glob_right_bottom[0] < 0) glob_right_bottom[0]=0;
		if(glob_right_bottom[0] >= document.getElementById("canvas").width) glob_right_bottom[0]=document.getElementById("canvas").width-1;
			
		if(glob_left_top[1] < 0) glob_left_top[1]=0;
		if(glob_left_top[1] >= document.getElementById("canvas").height ) glob_left_top[1]=document.getElementById("canvas").height-1;
		
		if(glob_right_bottom[1] < 0) glob_right_bottom[1]=0;
		if(glob_right_bottom[1] >= document.getElementById("canvas").height) glob_right_bottom[1]=document.getElementById("canvas").height-1;
			
		
			
			var point1 = glob_left_top;
			var point2 = glob_right_bottom;
			
			
			//here we process various variants when user set two points
			if(point1[1] > point2[1] && point1[0] > point2[0])
			{
				//here y coord of glob_left_top  greater then y coord glob_right_bottom
				//and
				//x coord of glob_left_top  greater then x coord glob_right_bottom
				
				glob_right_bottom = point1;
				glob_left_top = point2;
				
			}	
			else if(point1[1] > point2[1] && point1[0] < point2[0])	
			{
				//here y coord of glob_left_top  greater then y coord glob_right_bottom
				//and
				//x coord of glob_left_top  less then x coord glob_right_bottom
				
				/*****
								
				y of needed point we need to decrease 

				y = y - HEIGHT

				same with second points coordinates

				y = y + HEIGHT

				but

				x = x 
				
				*******/
				
				var h = point1[1] - point2[1]; 
				point1[1] = point1[1] - h; //here we need to get height of rectangle
				
				point2[1] = point2[1] + h;
				
				
				glob_left_top = point1;
				glob_right_bottom = point2;
				
				
				
			}
			else if(point1[1] < point2[1] && point1[0] < point2[0])	//normal
			{
				//here y coord of glob_left_top  less then y coord glob_right_bottom
				//and
				//x coord of glob_left_top  less then x coord glob_right_bottom
				
			}
			else if(point1[1] < point2[1] && point1[0] > point2[0])	
			{
				//here we just need 
				
				
				var w = point1[0] - point2[0]; 
				point1[1] = point1[1] - w; //here we need to get width of rectangle and decrease first point coord
				
				point2[1] = point2[1] + w;
				
				
			
				glob_left_top = point1;
				glob_right_bottom = point2;
				
				
			}
	
}	
/******
function ???()
{
	
}
*****/
function changeAllPixels()
{
	if(glob_left_top != null && glob_right_bottom != null )
	{
		glob_colors = null;
		glob_colors = [];
		
		processLeftTopRightBottom();
		
		//take two colors and memory them
		
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		
		var imgData = context.getImageData(glob_left_top[0],glob_left_top[1],1,1);
		var imgData2 = context.getImageData(glob_right_bottom[0],glob_right_bottom[1],1,1);
		var s = imgData.data.join(","); 
		var s2 = imgData2.data.join(","); 
		
		
		
		//collect all points where color1 and collect all points where color2
		var arr = [];
		var arr2 = [];
		for(var j=0; j<canvas.height; j++)
			{
				for(var i=0; i<canvas.width; i++)
				{
					var imgData = context.getImageData(i,j,1,1);
					var s1 = imgData.data.join(","); 
					
					if( s1 == s ) 
					{
						arr.push([i,j]);
					}
					else if(s1 == s2)
					{
						arr2.push([i,j]);
					}
					
					
				}
			}
			
			
			//var canvas = document.getElementById("canvas");
			//var context = canvas.getContext("2d");
			
		var col = s.split(",");
		for(var i=0;i<arr2.length;i++)
		{
			
			
			//var imgData = context.getImageData(n1[0],n1[1],1,1);
			//var imgData2 = context.getImageData(n2[0],n2[1],1,1);
			//var s = imgData.data.join(","); 
			//var s2 = imgData2.data.join(","); 
			
			
			
			context.fillStyle = "rgba("+col[0]+","+col[1]+","+col[2]+","+col[3]+")";
			context.fillRect(arr2[i][0],arr2[i][1],1,1);
			
			
		}
		
		var col2 = s2.split(",");
		for(var i=0;i<arr.length;i++)
		{
			
			context.fillStyle = "rgba("+col2[0]+","+col2[1]+","+col2[2]+","+col2[3]+")";
			context.fillRect(arr[i][0],arr[i][1],1,1);
		}
		
		glob_left_top = null;
		glob_right_bottom = null;
			
		showPalette();
		
		/******
		

		
		setTimeout( function(){
			
			
			
			
		}, 100);
		
		while(true)
		{
			
			
		}			
		
		*****/
		
	}
}

function changeOnePixel()
{
	
	
	if(glob_left_top != null && glob_right_bottom != null )
	{
		glob_colors = null;
		glob_colors = [];
		
		processLeftTopRightBottom();
			
		__changeOnePixel(glob_left_top, glob_right_bottom);
			
		glob_left_top = null;
		glob_right_bottom = null;
			
		showPalette();
			
			
	}


	
			
			/****************
				
				var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var arr = [];
			
			for(var j=glob_left_top[1]; j<=glob_right_bottom[1]; j++)
			{
				for(var i=glob_left_top[0]; i<=glob_right_bottom[0]; i++)
				{
					var imgData = context.getImageData(i,j,1,1);
					var arr4 = imgData.data;
					var s = arr4.join(","); 
					if( arr.indexOf(s)=== -1 ) 
					{
						arr.push(s);
						//glob_colors[0] = arr4[0];
						//glob_colors[1] = arr4[1];
						//glob_colors[2] = arr4[2];
						//addColorInPalette();
					}
					
					if(s == "0,0,0,0")
					{ 
						console.log(s+": "+i+","+j); 
					}
					
					//if()
				}
			}

			var arr2 = [];
			var lim = Number(document.getElementById("diap").value);
			
			for(var n=0;n<arr.length;n++)
			{
				if(arr[n] == null) continue;
				
				var rgb = arr[n].split(",");
				rgb[0] = Number(rgb[0]);
				rgb[1] = Number(rgb[1]);
				rgb[2] = Number(rgb[2]);
				
				for(var m=0;m<arr.length;m++)
				{
					if(arr[m] == null) continue;
					
					var rgb2 = arr[m].split(",");
					rgb2[0] = Number(rgb2[0]);
					rgb2[1] = Number(rgb2[1]);
					rgb2[2] = Number(rgb2[2]);
				
					if(
					(rgb2[0] >= rgb[0]-lim) && (rgb2[0] <= rgb[0]+lim)
					&& (rgb2[1] >= rgb[1]-lim) && (rgb2[1] <= rgb[1]+lim)
					&& (rgb2[2] >= rgb[2]-lim) && (rgb2[2] <= rgb[2]+lim)
					)
					{
						
						var s = rgb.join(",");
						if( arr2.indexOf(s)=== -1 ) 
						{
							arr2.push(s);
							//arr.push(s);
										glob_colors[0] = rgb[0];
										glob_colors[1] = rgb[1];
										glob_colors[2] = rgb[2];
										addColorInPalette();
						}
						
						arr[m] = null;
						
					}
				}
				 
			}
					
			**********/		

		
}

function getPalette()
{
	clearGlobalsAndPalette();
			
	if(glob_left_top == null && glob_right_bottom == null )
	{
		
		
		
		glob_left_top = [];
		glob_left_top[0] = 0;
		glob_left_top[1] = 0;
		
		glob_right_bottom = [];
		var canvas = document.getElementById("canvas");
		glob_right_bottom[0] = canvas.width-1;
		glob_right_bottom[1] = canvas.height-1;	

		glob_init_x = canvas.width/2|0;
		glob_init_y = canvas.height/2|0;
			
			showPalette();	

		//glob_left_top = null;
		//glob_right_bottom = null;		
		
	}
	
	else if(glob_left_top != null && glob_right_bottom != null )
	{
		
		if(glob_left_top[0] < 0) glob_left_top[0]=0;
		if(glob_left_top[0] >= document.getElementById("canvas").width ) glob_left_top[0]=document.getElementById("canvas").width-1;
		
		if(glob_right_bottom[0] < 0) glob_right_bottom[0]=0;
		if(glob_right_bottom[0] >= document.getElementById("canvas").width) glob_right_bottom[0]=document.getElementById("canvas").width-1;
			
		if(glob_left_top[1] < 0) glob_left_top[1]=0;
		if(glob_left_top[1] >= document.getElementById("canvas").height ) glob_left_top[1]=document.getElementById("canvas").height-1;
		
		if(glob_right_bottom[1] < 0) glob_right_bottom[1]=0;
		if(glob_right_bottom[1] >= document.getElementById("canvas").height) glob_right_bottom[1]=document.getElementById("canvas").height-1;
			
		
			
			var point1 = glob_left_top;
			var point2 = glob_right_bottom;
			
			
			//here we process various variants when user set two points
			if(point1[1] > point2[1] && point1[0] > point2[0])
			{
				//here y coord of glob_left_top  greater then y coord glob_right_bottom
				//and
				//x coord of glob_left_top  greater then x coord glob_right_bottom
				
				glob_right_bottom = point1;
				glob_left_top = point2;
				
			}	
			else if(point1[1] > point2[1] && point1[0] < point2[0])	
			{
				//here y coord of glob_left_top  greater then y coord glob_right_bottom
				//and
				//x coord of glob_left_top  less then x coord glob_right_bottom
				
				/*****
								
				y of needed point we need to decrease 

				y = y - HEIGHT

				same with second points coordinates

				y = y + HEIGHT

				but

				x = x 
				
				*******/
				
				var h = point1[1] - point2[1]; 
				point1[1] = point1[1] - h; //here we need to get height of rectangle
				
				point2[1] = point2[1] + h;
				
				
				glob_left_top = point1;
				glob_right_bottom = point2;
				
				
				
			}
			else if(point1[1] < point2[1] && point1[0] < point2[0])	//normal
			{
				//here y coord of glob_left_top  less then y coord glob_right_bottom
				//and
				//x coord of glob_left_top  less then x coord glob_right_bottom
				
			}
			else if(point1[1] < point2[1] && point1[0] > point2[0])	
			{
				//here we just need 
				
				
				var w = point1[0] - point2[0]; 
				point1[1] = point1[1] - w; //here we need to get width of rectangle and decrease first point coord
				
				point2[1] = point2[1] + w;
				
				
			
				glob_left_top = point1;
				glob_right_bottom = point2;
				
				
			}
			
			//glob_left_top[0]--; 
			//glob_left_top[1]--;
	}		
		
	if( global_copy_area_mode == true )		
	{
		//alert('test copy_area_mode');
		
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			var w = Math.max(glob_left_top[0],glob_right_bottom[0])-Math.min(glob_left_top[0],glob_right_bottom[0])+1;
			var h = Math.max(glob_left_top[1],glob_right_bottom[1])-Math.min(glob_left_top[1],glob_right_bottom[1])+1;
			var imgData = context.getImageData(glob_left_top[0],glob_left_top[1],w,h);
			
			var cnv = document.getElementById("palette_canvas");
			cnv.width = w;
			cnv.height = h;
			cnv.getContext("2d").putImageData(imgData,0,0);
			
			/*********
			var arr = [];
			
			for(var j=glob_left_top[1]; j<=glob_right_bottom[1]; j++)
			{
				for(var i=glob_left_top[0]; i<=glob_right_bottom[0]; i++)
				{
					var imgData = context.getImageData(i,j,1,1);
					var arr4 = imgData.data;
					var s = arr4.join(","); 
					if( arr.indexOf(s)=== -1 ) 
					{
						arr.push(s);
						//glob_colors[0] = arr4[0];
						//glob_colors[1] = arr4[1];
						//glob_colors[2] = arr4[2];
						//addColorInPalette();
					}
					
					if(s == "0,0,0,0")
					{ 
						console.log(s+": "+i+","+j); 
					}
					
					//if()
				}
			}
			*******/
			
		return;
	}
				
				var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var arr = [];
			
			for(var j=glob_left_top[1]; j<=glob_right_bottom[1]; j++)
			{
				for(var i=glob_left_top[0]; i<=glob_right_bottom[0]; i++)
				{
					var imgData = context.getImageData(i,j,1,1);
					var arr4 = imgData.data;
					var s = arr4.join(","); 
					if( arr.indexOf(s)=== -1 ) 
					{
						arr.push(s);
						//glob_colors[0] = arr4[0];
						//glob_colors[1] = arr4[1];
						//glob_colors[2] = arr4[2];
						//addColorInPalette();
					}
					
					if(s == "0,0,0,0")
					{ 
						console.log(s+": "+i+","+j); 
					}
					
					//if()
				}
			}

			var arr2 = [];
			var lim = Number(document.getElementById("diap").value);
			
			for(var n=0;n<arr.length;n++)
			{
				if(arr[n] == null) continue;
				
				var rgb = arr[n].split(",");
				rgb[0] = Number(rgb[0]);
				rgb[1] = Number(rgb[1]);
				rgb[2] = Number(rgb[2]);
				
				for(var m=0;m<arr.length;m++)
				{
					if(arr[m] == null) continue;
					
					var rgb2 = arr[m].split(",");
					rgb2[0] = Number(rgb2[0]);
					rgb2[1] = Number(rgb2[1]);
					rgb2[2] = Number(rgb2[2]);
				
					if(
					(rgb2[0] >= rgb[0]-lim) && (rgb2[0] <= rgb[0]+lim)
					&& (rgb2[1] >= rgb[1]-lim) && (rgb2[1] <= rgb[1]+lim)
					&& (rgb2[2] >= rgb[2]-lim) && (rgb2[2] <= rgb[2]+lim)
					)
					{
						
						var s = rgb.join(",");
						if( arr2.indexOf(s)=== -1 ) 
						{
							arr2.push(s);
							//arr.push(s);
										glob_colors[0] = rgb[0];
										glob_colors[1] = rgb[1];
										glob_colors[2] = rgb[2];
										addColorInPalette();
						}
						
						arr[m] = null;
						
					}
				}
				 
			}
					
					
					
					
					
					/***********
					
					 
						var arr4 = imgData.data;
						
						for(var r=arr4[0]-lim;r<arr4[0]+lim;r++)
						{
							for(var g=arr4[1]-lim;g<arr4[1]+lim;g++)
							{
								for(var b=arr4[2]-lim;b<arr4[2]+lim;b++)
								{
									arr4[0] = r;
									arr4[1] = g;
									arr4[2] = b;
									
									
									
									var s = arr4.join(","); 
									if( arr.indexOf(s)=== -1 ) 
									{
										arr.push(s);
										glob_colors[0] = arr4[0];
										glob_colors[1] = arr4[1];
										glob_colors[2] = arr4[2];
										addColorInPalette();
									}
									
									
									
									
									
								}	
							}	
						}
						
						
					
						
					 
					
					
					
				}
			}
			
			
			
			
			********/	
			
			
			
			
			//clearAllPlatteSettings()
		
}









function getColor()
{
	clearGlobalsAndPalette();
			
	if(glob_left_top != null)
	{
		
		if(glob_left_top[0] < 0) glob_left_top[0]=0;
		if(glob_left_top[0] >= document.getElementById("canvas").width ) glob_left_top[0]=document.getElementById("canvas").width-1;
		
			
		if(glob_left_top[1] < 0) glob_left_top[1]=0;
		if(glob_left_top[1] >= document.getElementById("canvas").height ) glob_left_top[1]=document.getElementById("canvas").height-1;
		
				var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var arr = [];
			
		
					var imgData = context.getImageData(glob_left_top[0],glob_left_top[1],1,1);
					var arr4 = imgData.data;
					var s = arr4.join(","); 
					if( arr.indexOf(s)=== -1 ) 
					{
						arr.push(s);
						
					}
					
			
		
			
	}

	else if( glob_right_bottom != null )	
	{
		
		
		
		
			
		if(glob_right_bottom[0] < 0) glob_right_bottom[0]=0;
		if(glob_right_bottom[0] >= document.getElementById("canvas").width) glob_right_bottom[0]=document.getElementById("canvas").width-1;
			
			
		if(glob_right_bottom[1] < 0) glob_right_bottom[1]=0;
		if(glob_right_bottom[1] >= document.getElementById("canvas").height) glob_right_bottom[1]=document.getElementById("canvas").height-1;
			
		
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var arr = [];
			
		
					var imgData = context.getImageData(glob_right_bottom[0],glob_right_bottom[1],1,1);
					var arr4 = imgData.data;
					var s = arr4.join(","); 
					if( arr.indexOf(s)=== -1 ) 
					{
						arr.push(s);
						
					}
					
		
	}
			
				
			var arr2 = [];
			var lim = Number(document.getElementById("diap").value);
			
			for(var n=0;n<arr.length;n++)
			{
				if(arr[n] == null) continue;
				
				var rgb = arr[n].split(",");
				rgb[0] = Number(rgb[0]);
				rgb[1] = Number(rgb[1]);
				rgb[2] = Number(rgb[2]);
				
				for(var m=0;m<arr.length;m++)
				{
					if(arr[m] == null) continue;
					
					var rgb2 = arr[m].split(",");
					rgb2[0] = Number(rgb2[0]);
					rgb2[1] = Number(rgb2[1]);
					rgb2[2] = Number(rgb2[2]);
				
					if(
					(rgb2[0] >= rgb[0]-lim) && (rgb2[0] <= rgb[0]+lim)
					&& (rgb2[1] >= rgb[1]-lim) && (rgb2[1] <= rgb[1]+lim)
					&& (rgb2[2] >= rgb[2]-lim) && (rgb2[2] <= rgb[2]+lim)
					)
					{
						
						var s = rgb.join(",");
						if( arr2.indexOf(s)=== -1 ) 
						{
							arr2.push(s);
							//arr.push(s);
										glob_colors[0] = rgb[0];
										glob_colors[1] = rgb[1];
										glob_colors[2] = rgb[2];
										addColorInPalette();
						}
						
						arr[m] = null;
						
					}
				}
				 
			}
					
					

		
}
















function getGDCP()
{
	
	
	if(glob_left_top != null && glob_right_bottom == null) //only one point
	{
	
	
	
	
	
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			
			var arr = [];
			var imgData = context.getImageData(glob_left_top[0],glob_left_top[1],1,1);
			
			var di = Number(document.getElementById("diapazonGDCP").value);
			for(var j= -di; j<di; j++)
			{
				for(var i= -di; i<di; i++)
				{
					for(var n= -di; n<di; n++)
					{
					
						
						var red1 = imgData.data[0]+ i;
						var green1 =  imgData.data[1]+ j;
						var blue1 =  imgData.data[2]+ n;
						var s = ""+red1+","+green1+","+blue1+",255";
						
						if( arr.indexOf(s)=== -1 ) 
						{
							arr.push(s);
							glob_colors[0] = red1;
							glob_colors[1] = green1;
							glob_colors[2] = blue1;
							addColorInPalette();
						}
					
					}
					
				}
			}
			
			
	
	}
	
	
	
	
	
}




window.onload = function()
{
	//alert(' loaded ');
	CLIPBOARD_CLASS("canvas", true);
	
	var canvas = document.getElementById("canvas");
	canvas.onclick = function(e)
	{
		evt = (e) ? e : event;   
		if(evt.button == 0) 
		{
			
			var x = e.offsetX==undefined?e.layerX:e.offsetX;
			var y = e.offsetY==undefined?e.layerY:e.offsetY;
			
			glob_left_top = null;
			
			glob_right_bottom  = null;
			
			//now we will get some area about x,y,
			
			//glob_left_top = [x-20,y-20];
			
			//glob_right_bottom  = [x+20,y+20];
			
			glob_init_x = x;
			glob_init_y = y;
			
			showPalette();
			
			//now we test
			
			
			
		/********	
			if( document.getElementById("lefttop").checked == true )
			{
				glob_left_top = [x,y];
				document.getElementById("lefttop").parentNode.classList.toggle("red-bordered");
				document.getElementById("lefttop").checked = false;
				glob_right_bottom  = [this.width,this.height];
				showPalette();
				glob_right_bottom  = null;
				return;
			}
			
			else if( document.getElementById("rightbottom").checked == true )
			{
				if(glob_left_top == null) return; //glob_left_top = [0,0];
				
				glob_right_bottom  = [x,y];
				document.getElementById("rightbottom").parentNode.classList.toggle("blue-bordered");
				document.getElementById("rightbottom").checked = false;
				showPalette();
				return;
			}
			
			******/
			
		}
	}
	/******
	document.getElementById("lefttop").onclick = function()
	{
		if(this.checked == true)
		{
			if(this.parentNode.classList.contains("red-bordered"))
			{
				document.getElementById("lefttop").parentNode.classList.toggle("red-bordered");
				glob_left_top = null;
			}
		}
	}
	********/
	/******
	document.getElementById("rightbottom").onclick = function()
	{
		if(this.checked == true)
		{
			if(this.parentNode.classList.contains("blue-bordered"))
			{
				document.getElementById("rightbottom").parentNode.classList.toggle("blue-bordered");
				glob_right_bottom = null;
			}
		}
	}
	******/
	var btnGetPalette = document.getElementById("getpalette");
	btnGetPalette.onclick = function()
	{
		
		getPalette();
		
		
	}
	
	var btnSaveArea = document.getElementById("savearea");
	btnSaveArea.onclick = function()
	{
		global_copy_area_mode = true;
		getPalette();
		global_copy_area_mode = false;
		
		
	}
	
	var btnGetColor = document.getElementById("getcolor");
	btnGetColor.onclick = function()
	{
		
		getColor();
		
		
	}
	
	var btnSetOnePixel = document.getElementById("setonepixel");
	btnSetOnePixel.onclick = function()
	{
		
		setOnePixel();
		
		
	}
	
	
	var btnChangeOnePixel = document.getElementById("changeonepixel");
	btnChangeOnePixel.onclick = function()
	{
		
		changeOnePixel();
		
		
	}
	
	
	var btnChangeAllPixels = document.getElementById("changeallpixels");
	btnChangeAllPixels.onclick = function()
	{
		
		changeAllPixels();
		
		
	}
	
	var btnClearPalette = document.getElementById("clearpalette");
	btnClearPalette.onclick = function()
	{
		clearPalette();
	}
	
	var btnUsePalette = document.getElementById("usepalette");
	btnUsePalette.onclick = function()
	{
		usePalette();
	}
	 
	var btnRemPalette = document.getElementById("rempalette");
	btnRemPalette.onclick = function()
	{
		remPalette();
	}
	 
	document.getElementById("btn").onclick = function()
	{
		glob_colors = allThreeTableWeCountNow();
		addColorInPalette();
			
	}
	
	document.getElementById("btnMin").onclick = function()
	{
		removeColorInPalette();
		renumerateCanvaces();
			
	}
	
/*********	
	var btnGDCP = document.getElementById("btnGDCP");
	btnGDCP.onclick = function()
	{
		getGDCP();
	}	
	**********/
	
}

function whenClickedOnColorCell()
{
	//alert(this.id);
	
	if(glob_rem_elem == this.id)
	{
		glob_rem_elem = null;
		//this.style.border = "2px solid gray";
		this.setAttribute('cpstate', 'nonselected');
		
	}
	else if(glob_rem_elem == null)
	{
		glob_rem_elem = this.id;
		//this.style.border = "2px solid red";
		this.setAttribute('cpstate', 'selected');
	}
	else
	{
		//document.getElementById(glob_rem_elem).style.border = "2px solid gray";
		glob_rem_elem = this.id;
		//this.style.border = "2px solid red";
		this.setAttribute('cpstate', 'selected');
		
	}
	
}

function addColorInPalette()
{
	var t = document.getElementById("palette_table");
	if(t==null)
	{
		t = document.createElement("table");
		t.id = "palette_table";
		var row = t.insertRow(0);
		row.insertCell(0);
		var canvas = document.createElement("canvas");
		canvas.id="cnv_0";
		canvas.className = "colorinpalette";
		
		
		
		canvas.width= 50;
		canvas.height= 50;
		var context = canvas.getContext("2d");
		if(glob_colors == null) glob_colors = [0,0,0];
		context.fillStyle = "rgba("+glob_colors[0]+","+glob_colors[1]+","+glob_colors[2]+",255)";
		context.fillRect(0,0,50,50);
		
		canvas.onclick = whenClickedOnColorCell;
		
		
		canvas.setAttribute('cpstate', 'nonselected');
		
		t.rows[0].cells[0].appendChild(canvas);
		
		document.getElementById("palette_div").appendChild(t);
		
	}
	else 
	{
		
		
		
		t.rows[0].insertCell(t.rows[0].cells.length);
		
		var canvas = document.createElement("canvas");
		var cid = (t.rows[0].cells.length-1);
		canvas.id="cnv_"+cid;
		canvas.className = "colorinpalette";
		
		canvas.width= 50;
		canvas.height= 50;
		var context = canvas.getContext("2d");
		context.fillStyle = "rgba("+glob_colors[0]+","+glob_colors[1]+","+glob_colors[2]+",255)";
		context.fillRect(0,0,50,50);
		
		
		canvas.onclick = whenClickedOnColorCell;
		
		canvas.setAttribute('cpstate', 'nonselected');
		
		t.rows[0].cells[cid].appendChild(canvas);
		
		
		
		
		
	}
}

var glob_rem_elem = null;

function removeColorInPalette()
{
	if(glob_rem_elem != null)
	{
		var t = document.getElementById("palette_table");
		if(t != null)
		{
			var num = Number(glob_rem_elem.replace("cnv_",""));
			t.rows[0].deleteCell(num);
			glob_rem_elem = null;
		}
		
		
	}
}

function renumerateCanvaces()
{
	var t = document.getElementById("palette_table");
	if(t != null)
	{
		for(var i=0;i<t.rows[0].cells.length;i++)
		{
			t.rows[0].cells[i].childNodes[0].id="cnv_"+i;
		}
	}
}


window.addEventListener('load', function()
{
	 
	/****	
	document.getElementById("btn").onclick = function()
	{
		addColorInPalette();
			
	}
	
	document.getElementById("btnMin").onclick = function()
	{
		removeColorInPalette();
		renumerateCanvaces();
			
	}
	
	****/

	
	
});