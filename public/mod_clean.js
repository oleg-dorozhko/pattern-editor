function clean__getSelectedBorderedSaveCanvas()
{
	var ind = null;
	var list = document.querySelector('#saves').childNodes;
	var ind = -1;
	var counter=0;
	for(var i=0;i<list.length;i++)
	{
		if(list[i].classList.contains("seed-bordered"))
		{
			ind=i;
			counter++;
		}
	}
	if(ind==-1) return null;
	if(counter>1) { alert("More then one selected. Operation canceled"); return null;}
	return list[ind];
}

function clean()
{
	var ans = confirm("Are you sure? (If cancel or close operation will be canceled)");
	if(ans)
	{
		var cnv = clean__getSelectedBorderedSaveCanvas();
		if(cnv != null)
		{
			var id = cnv.id;
			console.log("Will be deleted: "+id);
			document.getElementById("saves").removeChild(document.getElementById(""+id));
			setTimeout( function(){
				logg('remove  '+id); //after or before? what question
			}, 100 );	
			
			//console.log("Removed from body: "+id);
			
		}
		else
		{
			alert('Nothing selected');
		}
	}
	
}