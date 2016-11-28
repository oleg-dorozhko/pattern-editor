
function getNewSaveNumber()
{
	
	for(var i=1;i<500;i++)
	{
		
		var el = document.getElementById("save_canvas"+i);
		if(el==undefined || el == null)
		{
			return i;
		}
	}
	
	return 501;
}



function save_pattern()
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
		
	var n = getNewSaveNumber();
	
	var id = "save_canvas"+n;
	
	var cnv = document.getElementById(id);
	
	if(cnv == null)
	{
		cnv =  document.createElement("canvas");
		cnv.className = "draggable";
		cnv.id = id;
		cnv.alt = ""+n;
		cnv.classList.toggle("save-canvas-class");
		cnv.classList.toggle("seed-unbordered");
		//cnv.setAttribute("bordered","false");

		document.getElementById("saves").appendChild(cnv);
	}
	
	cnv.width = canvas.width;
	cnv.height = canvas.height;
	
	var save_context = cnv.getContext("2d"); 
	save_context.putImageData(context.getImageData(0,0,canvas.width,canvas.height),0,0);
		
}




