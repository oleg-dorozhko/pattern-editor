function destroy()
{
	var ans = confirm("Are you sure? (If cancel or close operation will be canceled)");
	if(ans)
	{
		var ind = null;
		var list = document.getElementsByTagName('canvas');
		for(var i=0;i<list.length;i++)
		{
			if(list[i].id=="pixels") continue;
			if(list[i].id=="canvas") continue;
			if(list[i].style.border != '') {ind= i; break;}
		}
		
		if(ind != null)
		{
			console.log("Will be deleted: "+list[ind].id);
			document.body.removeChild(document.getElementById(""+list[ind].id));
			console.log("Removed from body: "+list[ind].id);
			
		}
		else
		{
			alert('Nothing selected');
		}
	}
	
}