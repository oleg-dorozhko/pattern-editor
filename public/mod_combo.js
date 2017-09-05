function combo()
{
	// search for true-bordered canvas
	// var cnv = getSelectedBorderedSaveCanvas();
	
	if(glob_last_selected_canvas_id==null) return;
	
	
	//console.log("combo id="+glob_last_selected_canvas_id);
	
	if(document.getElementById(glob_last_selected_canvas_id).classList.contains("save-canvas-class")==false) return;
	
	var cnv = document.getElementById(glob_last_selected_canvas_id);	
	
		
		
		cnv.toBlob( function( blob) {
		
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/prepare_combo', true);
			xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
			 
				transform("canvas",'/combo', function () {
					
					setTimeout( function() {
						logg('combo('+glob_last_selected_canvas_id+')'); //after or before? what question
					}, 100 );	
					
				});
				
				
			
				
			}
			xhr.send(blob);
			
				
		});
		
		 
	
	
	
	
	
	
}

function combo_with_name(name, callback)
{
	// search for true-bordered canvas
	// var cnv = getSelectedBorderedSaveCanvas();
	
	glob_last_selected_canvas_id=name;
	
	
	//console.log("combo id="+glob_last_selected_canvas_id);
	
	if(document.getElementById(glob_last_selected_canvas_id).classList.contains("save-canvas-class")==false) return;
	
	var cnv = document.getElementById(glob_last_selected_canvas_id);	
	
		
		
		cnv.toBlob( function( blob) {
		
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/prepare_combo', true);
			xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
			 
				transform("canvas",'/combo', function () {
					
					setTimeout( function() {
						logg('combo('+glob_last_selected_canvas_id+')'); //after or before? what question
					}, 100 );

					callback();		
					
				});
				
				
			
				
			}
			xhr.send(blob);
			
				
		});
		
		 
	
	
	
	
	
	
}