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
	
		$("#inv").click( function() { console.log("was click"); transform("canvas", '/inverse'); } );
	
		var CLIPBOARD = new CLIPBOARD_CLASS("canvas", true);
		
	});
	
	
}

window.onerror = function(message, url, lineNumber) {
    alert("Поймана ошибка, выпавшая в глобальную область!\n" + "Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
}


