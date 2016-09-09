function combo()
{
	// search for true-bordered canvas
	var cnv = getSelectedBorderedSaveCanvas();
	
	if(cnv != null) 
	{

		
		
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
	
	
	else 
		
	{
	
		
			
	}	
	
	
	
	
	
	
	
}