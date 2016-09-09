function sendBlobToServerForCopy(blob)
{	
	
	startProgress();
	
	var xhr = new XMLHttpRequest();
						
		xhr.open('POST', '/paste', true);
		xhr.responseType = "blob";
		xhr.onload = function(e) {  
		
			//progressBar.hidden = true;
		
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  
			
				stopProgress();  
				var msg = xhr.status + ': ' + xhr.statusText;
				console.log(msg); 
				throw new Error(msg);
			
			}

			
			var newImg = document.createElement("img");

			var urlCreator = window.URL || window.webkitURL;
			var imageUrl = urlCreator.createObjectURL(this.response);

			newImg.onload = function() {	
	
				
				console.log("loaded");
								
				var canvas = document.getElementById("canvas");
				canvas.width=this.width;
				canvas.height=this.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(this,0,0);
				
				stopProgress();
								
				
			}
			
			newImg.src = imageUrl;
			
			
		}

						
		xhr.send(blob);
					
						
}


function sendCopyToServer()
{
	var seed_img = getSelectedBorderedSeedImage();
		
	if(seed_img!=null)
	{
		
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.onload = function()
		{
			canvas.width = this.width;
			canvas.height = this.height;
			ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
			
			transform("canvas", "/paste");
			
			
		}
		img.src=seed_img.src;
		return;
	}
	
	var cnv = getSelectedBorderedSaveCanvas();
	
	if(cnv != null) return cnv.toBlob(sendBlobToServerForCopy);	
		
	return null;
	
}
