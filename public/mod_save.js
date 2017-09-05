
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



function selectSaveCanvas(e)
{
	if(e.target.classList.contains("seed-bordered"))
	{
		e.target.classList.toggle("seed-unbordered");
		e.target.classList.toggle("seed-bordered");
		return;
	}
		
	var cnvs = document.getElementsByClassName("save-canvas-class");	
	for(var i=0;i<cnvs.length;i++)
	{
		if(cnvs[i].classList.contains("seed-bordered"))
		{
			cnvs[i].classList.toggle("seed-unbordered");
			cnvs[i].classList.toggle("seed-bordered");
		}
	}
		
	e.target.classList.toggle("seed-unbordered");
	e.target.classList.toggle("seed-bordered");
	
	glob_last_selected_canvas_id = e.target.id;
		
	
}



function save()
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
		
	var n = getNewSaveNumber();
	
	var id = "save_canvas"+n;
	
	//console.log("save id="+id);
	
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
		
		cnv.onclick = selectSaveCanvas;
		
		document.getElementById("saves").appendChild(cnv);
	}
	
	cnv.width = canvas.width;
	cnv.height = canvas.height;
	
	var save_context = cnv.getContext("2d"); 
	save_context.putImageData(context.getImageData(0,0,canvas.width,canvas.height),0,0);
	
	setTimeout( function(){
				logg('save('+cnv.id+')'); //after or before? what question
			}, 100 );	
			
		
}

function save_with_name(name)
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
		
	var id = name;
	
	//console.log("save id="+id);
	
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
		
		cnv.onclick = selectSaveCanvas;
		
		document.getElementById("saves").appendChild(cnv);
	}
	
	cnv.width = canvas.width;
	cnv.height = canvas.height;
	
	var save_context = cnv.getContext("2d"); 
	save_context.putImageData(context.getImageData(0,0,canvas.width,canvas.height),0,0);
	
	setTimeout( function(){
				logg('save('+cnv.id+')'); //after or before? what question
			}, 100 );	
			
}




