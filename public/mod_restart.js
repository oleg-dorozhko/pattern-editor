function restart_all()
{
	var ans = confirm("Are you sure? (If cancel or close operation will be canceled)");
	if(ans)
	{
		restart();
	}
}

function restart()
{
	global_ec_vars_arr = null;
	global_ec_vars_arr_index=null;
	global_ec_vars_arr_length=0;
	global_client_typing_mode = false;
	
	localStorage.clear();
	
	var lst = document.getElementById('history_div');
	while( lst.hasChildNodes()  )
	{
		lst.removeChild(lst.childNodes[0]);
	}
	
		
	var lst2 = document.getElementById('saves');
	while( lst2.hasChildNodes()  )
	{
		lst2.removeChild(lst2.childNodes[0]);
	}

	var canvas = document.getElementById("canvas");
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	var img = new Image();
	img.onload = function() {
		
		var ctx = canvas.getContext("2d");
		canvas.width = this.width;
		canvas.height = this.height;
		ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
					
		modsld_saveDesktop();
	
		reload();
	setInitialButtonsToCanvas();
	}
	
	img.src = 'initial-image.png';
	
	
	
}