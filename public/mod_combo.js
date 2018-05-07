function combo(params, callback)
{
	// search for true-bordered canvas
	// var cnv = getSelectedBorderedSaveCanvas();
	var from_script=false;
	if(params&&params.length&&params.length>0)
	{
		glob_last_selected_canvas_id=params[0];
		from_script=true;
	}
	
	else if(glob_last_selected_canvas_id==null) return;
		
	
	
	//console.log("combo id="+glob_last_selected_canvas_id);
	
	//if(document.getElementById(glob_last_selected_canvas_id).classList.contains("save-canvas-class")==false) return;
	
	//v combu nado peredavat dva md5 a na servere schit sogl plana operation
	
	var cnv = document.getElementById(glob_last_selected_canvas_id);	
	
		ident(glob_last_selected_canvas_id, 'ident', function(data){
				
				/*** writing some data to file with md5 name
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				***/
				
				var md51=data;
			//	console.log('md51='+md51);
				
				ident("canvas", 'ident', function(data2){
					
					
					var md52=data2;
			//		console.log('md52='+md52);
					
					var args = 'md51='+encodeURIComponent(md51)+'&md52='+encodeURIComponent(md52);
					textToServerAndReturnBlob(args, '/combo', function(blob)
					{
						
						getImageFromBlob( blob, function(img) {
							imageToCanvas(img, "canvas", function() { 
								//stopProgress();
								if (callback) callback();
							});	
							
						});	
						
						
						
					});
					
					
				
			
				
				});
				
				
				
				
				
				
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
					
					//setTimeout( function() {
					//	logg('combo('+glob_last_selected_canvas_id+')'); //after or before? what question
					//}, 100 );

				if (callback) 	callback();		
					
				});
				
				
			
				
			}
			xhr.send(blob);
			
				
		});
		
		 
	
	
	
	
	
	
}