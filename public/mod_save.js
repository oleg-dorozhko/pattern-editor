function getNewSaveNumber()
{

	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(!list[i].style.border == '') return i;
	}
	
	for(var i=0;i<500;i++)
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
	
	var ind = -1;
	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(!list[i].style.border == '') {ind = i; break;}
	}
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	if(ind == -1)
	{
		var save_canvas = document.createElement("canvas");
		
		var n = getNewSaveNumber();
		save_canvas.id = "save_canvas"+n;
		save_canvas.alt = "save_canvas"+n;
		var sp = document.createElement("span");
		sp.id="span_"+save_canvas.id;
		sp.innerHTML = ""+n;
		save_canvas.onclick = function() { selectSaveCanvas(this.id); }
		sp.appendChild(save_canvas);
		document.getElementById("saves").appendChild(sp);
		
	}
	else
	{
		var save_canvas = document.getElementById(list[ind].id);
	
	}
	
	save_canvas.width = canvas.width;
	save_canvas.height = canvas.height;
	var save_context = save_canvas.getContext("2d"); 
	
	save_context.putImageData(context.getImageData(0,0,canvas.width,canvas.height),0,0);
	
	
}
