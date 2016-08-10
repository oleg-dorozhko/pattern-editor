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

function setInitialImageToCanvas()
{
	var canvas = document.getElementById("canvas");
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	var img = new Image();
	img.onload = function() {
		
		var ctx = canvas.getContext("2d");
		canvas.width = this.width;
		canvas.height = this.height;
		ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
	}
	
	img.src = $("#canvas").attr("init-path");
}

//for seed filling
function findSelectedSeedClicked()
{
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(!list[i].style.border == '') return list[i].src.substr(list[i].src.lastIndexOf('/')+1);
		}
	}
	return null;
}

function clearAllSeedClicked(el)
{
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(el.src == list[i].src) continue;
			list[i].style.border = '';
		}
	}
}


window.onload = function()
{
	loadDivFirst( function() {
	
		setInitialImageToCanvas();

		$("#save").click( function() { save_pattern(); } );
		$("#inv").click( function() { transform("canvas", '/inverse'); } );
		$("#plus").click( function() { transform("canvas", '/plus'); } );
		$("#minus").click( function() { transform("canvas", '/minus'); } );
		$("#multiply").click( function() { transform("canvas", '/multiply'); } );
		$("#median").click( function() { transform("canvas", '/median'); } );
		$("#rotate").click( function() { transform("canvas", '/rotate'); } );
		$("#mirror_down").click( function() { transform("canvas", '/mdown'); } );
		$("#mirror_right").click( function() { transform("canvas", '/mright'); } );
		$("#random").click( function() { transform("canvas", '/random'); } );
		
		$("#canvas").click( function(ev) { whenClickedOnCanvas(ev); } );
				
		document.onclick = function (ev) { 
			if (!ev.target.hasAttribute('seed-clicked')) return;
			whenSomeSeedSelected(ev);
		};
	
		var CLIPBOARD = new CLIPBOARD_CLASS("canvas", true);
		
	});
	
	
}

window.onerror = function(message, url, lineNumber) {
    alert("Поймана ошибка, выпавшая в глобальную область!\n" + "Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
}

