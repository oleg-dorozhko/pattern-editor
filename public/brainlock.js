function imageToCanvas(img, canvas_id, callback)
{
	var canvas = document.getElementById(canvas_id);
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	var ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
	
	//close timer
	callback();
	
}

function getImageFromBlob(blob, callback)
{
	var newImg = document.createElement("img");
				
	var urlCreator = window.URL || window.webkitURL;
	var imageUrl = urlCreator.createObjectURL(blob);
		
	newImg.onload = function() {	
		
		console.log("img loaded");
		callback(this);
			
	}
				
	newImg.src = imageUrl;
	
}


function getImageFromCanvas(canvas_id, callback )
{
	var canvas = document.getElementById( canvas_id );//"canvas"
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	canvas.toBlob( callback );
	
}


function blobToServer(blob, action, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', action, true);
	xhr.responseType = "blob";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
				
		/*****		
		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				progressBar.value = (e.loaded / e.total) * 100;
				progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
			}
		};
		******/
					
	}
	
	xhr.send(blob);
}

function redrawProgress( progressBar )
{
	if(progressBar.value >= 99)  progressBar.value = 0;
	progressBar.value ++;
	progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
		
}

function transform(canvas_id, action)
{
	var progressBar = document.getElementById("progress");
	progressBar.hidden = false;
	
	var intervalID = setInterval(function(){redrawProgress(progressBar)}, 1000);
	//init timer and redraw progress
	
	getImageFromCanvas( canvas_id, function(blob) { 
		blobToServer(blob, action, function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				imageToCanvas(img, canvas_id, function() { 
					progressBar.hidden = true;
					clearInterval(intervalID); 
				});	
				
			});	
		}); 
	});
}

