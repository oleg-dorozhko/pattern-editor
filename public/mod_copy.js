
function sendCopyToServer()
{
	var ind=null;
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(!list[i].style.border == '') {ind= i; break;}
	}
	
	if(ind!=null)
	{
		
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.onload = function()
		{
			canvas.width = this.width;
			canvas.height = this.height;
			ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
			
			transform("canvas", "/paste");
			
			
		}
		img.src=list[i].src;
		return;
	}
	
	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].id=="pixels") continue;
		if(!list[i].style.border == '') {ind= i; break;}
	}
	
	if(ind != null) return transform(list[ind].id, "/paste");	
		
	return null;
	
}
