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
			var id = list[ind].id;
			console.log("Will be deleted: "+id);
			document.body.removeChild(document.getElementById(""+id));
			console.log("Removed from body: "+id);
			
		}
		else
		{
			alert('Nothing selected');
		}
	}
	
}