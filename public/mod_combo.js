function combo()
{
	// search for true-bordered canvas
	var cnv = null;
	var list = document.getElementsByTagName("canvas");
	for(var i=0;i<list.length;i++)
	{
		if(isSelectable(list[i])) 
		{	
			if(list[i].getAttribute("bordered")=="true") 
			{
				cnv = list[i];
				break;
			}	
		}
	}
	
	if(cnv == null) return; // or check for selected save canvas
	

		
		
		cnv.toBlob( function( blob) {
		
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/prepare_combo', true);
			xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
			 
				transform("canvas",'/combo');
				
			}
			xhr.send(blob);
			
				
		});
		
		 
	
}