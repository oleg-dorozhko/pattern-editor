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
		
	//	console.log("img loaded");
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

/**
function blobAndParamsToServer( blob, params, action, callback, onerror)
{  
    
	var args = '';
	var t='';
	
	for(var key in params) { args += (''+t+''+key+'='+encodeURIComponent(params[key])); t='&';}
	
	args  += '&md5='+imageToMd5(canvas_id);
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/pre_'+action, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		
		blobToServer(blob, '/'+action, callback, onerror);
	}
	
	xhr.send(args);
}
**/

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
	clearInterval(glob_intervalID); 
}

function textToServerAndReturnText(txt, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(txt);
}

function textToServerAndReturnBlob(txt, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "blob";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; if(onerror) { onerror(error); return; } else throw new Error(error); }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(txt);
}

function blobToServerAndReturnText(blob, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(blob);
}

function sendImageToUrlGetText(canvas_id, url, callback)
{
	startProgress();
	getImageFromCanvas( canvas_id, function(blob) { 
	blobToServerAndReturnText( blob, url, function( msg_from_server ) {
		
				stopProgress();
				if (callback) callback(msg_from_server);
				
				
			}, function(msg) {
			
				stopProgress();
				console.log("sendImageToUrlGetText(): Was error: "+msg);
				throw new Error(msg);
			
		}); 
	});
}

function transform(canvas_id, action, callback)
{
	startProgress();
	getImageFromCanvas( canvas_id, function(blob) { 
		blobToServer(blob, action, function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				imageToCanvas(img, canvas_id, function() { 
					stopProgress();
					if (callback) callback();
				});	
				
			});	
		}, function(msg) {
			
			stopProgress();
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	});
	 
}


function blobToServerForMD5(blob, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(blob);
}

function ident(canvas_id, action, callback)
{
	
	getImageFromCanvas( canvas_id, function(blob) { 
	
		blobToServerForMD5(blob, 'ident', function( data ) {
			if (callback) callback(data);
				}
				
				, function(msg) {
			
			
			console.log("ident(): Was error: "+msg);
			throw new Error(msg);
			
		}
				
				
				);	
				
			
		}); 
	
	 
}

