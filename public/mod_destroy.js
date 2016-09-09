function destroy()
{
	var ans = confirm("Are you sure? (If cancel or close operation will be canceled)");
	if(ans)
	{
		var cnv = getSelectedBorderedSaveCanvas();
		if(cnv != null)
		{
			var id = cnv.id;
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