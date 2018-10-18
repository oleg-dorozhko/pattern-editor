function client_x_combo(params, callback)
{
	// search for true-bordered canvas
	var cnv = getSelectedBorderedSaveCanvas();
	var from_script=false;
	if(params&&params.length&&params.length>0)
	{
		glob_last_selected_canvas_id=params[0];
		cnv = document.getElementById(glob_last_selected_canvas_id);
	}
	
	if(cnv==null) return;
		
	var w1 = document.getElementById("canvas").width;
	var h1 = document.getElementById("canvas").height;
	
	var w2 = cnv.width;
	var h2 = cnv.height;
	
	if((w1%2==1)&&(w2%2==0))  
	{	
		alert('w2 not for w1');
		if (callback) callback();
		return ;
	}
	
	if((w2%2==1)&&(w1%2==0))  
	{	
		alert('w2 not for w1');
		if (callback) callback();
		return ;
	}
	
	
	
	
	
	if((h1%2==1)&&(h2%2==0))
	{
		
		alert('h2 not for h1');if (callback) callback();
		return ;
	}
	if((h1%2==0)&&(h2%2==1))
		{alert('h2 not for h1');if (callback) callback();
		return ;}
		
	

		ident(cnv.id, 'ident', function(data){
				
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
					textToServerAndReturnBlob(args, '/xcombo', function(blob)
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
