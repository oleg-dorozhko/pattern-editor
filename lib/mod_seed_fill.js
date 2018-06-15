function fill()
{
	
	if(glob_last_selected_canvas_id==null) return;
	if(document.getElementById(glob_last_selected_canvas_id).classList.contains("save-canvas-class"))
	{
		var cnv = document.getElementById(glob_last_selected_canvas_id);	
		
			
				cnv.toBlob( function( blob) {
				
					var xhr = new XMLHttpRequest();
					xhr.open('POST', '/send_seed', true);
					xhr.onload = function(e) {  
					
						if (xhr.readyState != 4) return;
						
						if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
					 
						transform("canvas",'/fill');
						
						setTimeout( function(){
							logg('fill with '+glob_last_selected_canvas_id); //after or before? what question
						}, 100 );	
			
						
					}
					xhr.send(blob);
					
						
				});
				
		
		
		
		
		
		
		
		
	}
	else
	{
		
		var canvas =  document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		
		var cnv = document.getElementById(glob_last_selected_canvas_id);
			
		
		var newimg = new Image();
		newimg.onload = function()
		{
			canvas.width = this.width;
			canvas.height = this.height;
			ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
			
			
			canvas.toBlob( function( blob) {
			
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/send_seed', true);
				xhr.onload = function(e) {  
				
					if (xhr.readyState != 4) return;
					
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
				 
					transform("canvas",'/fill');
					
				}
				xhr.send(blob);
				
					
			});
			
			
			
		}
		newimg.src = cnv.src;
		
		
	}
	
	
	
	var img = getSelectedBorderedSeedImage();
	
	if(img != null) { // or check for selected save canvas
	
		
	}
	else
	{
		var cnv = getSelectedBorderedSaveCanvas();
	
		if(cnv != null) { 
		
			
			
				
		}
	}		
	
}

/********
function old_send_seed() //when sends on server increased image 20x20
{
	
	var img = null;
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(!list[i].style.border == '') 
			{
				
				var img = list[i];
				break;
			}
		}
	}
	
	if(img == null) return; // or check for selected save canvas
	
	var canvas =  document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0,canvas.width,canvas.height);

	canvas.toBlob( function( blob) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/send_seed', true);
		xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
		 
			transform("canvas",'/fill');
			
		}
		xhr.send(blob);
		
			
	});
	
	
}

*******/