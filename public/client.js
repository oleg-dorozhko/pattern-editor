function loadDivFirst(callback)
{
		  
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/load_div_first', true);
		
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }
				
			document.getElementById("first").innerHTML = xhr.responseText;
			
			callback();
	
			
	}
		
	xhr.send();
	
}



window.onload = function()
{
	loadDivFirst( function() {
	
		var canvas = document.getElementById("canvas");
		if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
		var img = new Image();
		img.onload = function() {
			var ctx = canvas.getContext("2d");
			canvas.width = this.width;
			canvas.height = this.height;
			ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
		}
		img.src = canvas.init_path;

		$("#inv").click( function() { transform("canvas", '/inverse'); } );
		
	
		var CLIPBOARD = new CLIPBOARD_CLASS("canvas", true);
		
	});
	
	
}

window.onerror = function(message, url, lineNumber) {
    alert("Поймана ошибка, выпавшая в глобальную область!\n" + "Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
}


