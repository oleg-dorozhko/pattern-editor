function imageToCanvas(img, canvas_id, callback)
{
	var canvas = document.getElementById(canvas_id);
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	var ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
	
	//close timer
	if(callback) callback();
	
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


function blobToServer(blob, action, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', action, true);
	xhr.responseType = "blob";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(blob);
}

function redrawProgress( progressBar )
{
	if(progressBar.value >= 99)  progressBar.value = 0;
	progressBar.value ++;
	progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
		
}

var glob_intervalID = null;
// init timer for redraw progress
function startProgress()
{
	var progressBar = document.getElementById("progress");
	progressBar.hidden = false;
	progressBar.value = 0;
	progressBar.position = "absolute";
	// progressBar.left = document.getElementById(canvas_id).width / 2|0 - 50;
	// progressBar.top =  document.getElementById(canvas_id).height / 2|0 - 50;
	glob_intervalID = setInterval(function(){redrawProgress(progressBar)}, 1000);
	
}

function stopProgress()
{
	var progressBar = document.getElementById("progress");
	progressBar.hidden = true;
	clearInterval(intervalID); 
}

function transform(canvas_id, action)
{
	startProgress();
	getImageFromCanvas( canvas_id, function(blob) { 
		blobToServer(blob, action, function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				imageToCanvas(img, canvas_id, function() { 
					stopProgress();
				});	
				
			});	
		}, function(msg) {
			
			stopProgress();
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	});
	 
}

