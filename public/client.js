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




window.onload = function()
{
	loadDivFirst( function() {
	
		setInitialImageToCanvas();
		moveDraggableOnOwnPlace();

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
		$("#fill").click( function() { send_seed(); } );
		
		// $("#canvas").click( function(ev) { whenClickedOnCanvas(ev); } );
		
		
		
		//drag and drop implementation
		
		document.onmousedown = function(e) {

		  if (e.which != 1) { // если клик правой кнопкой мыши
			return; // то он не запускает перенос
		  }

		  var elem = e.target.closest('.draggable');

		  if (!elem) return; // не нашли, клик вне draggable-объекта

		  // запомнить переносимый объект
		  dragObject.elem = elem;

		  // запомнить координаты, с которых начат перенос объекта
		  dragObject.downX = e.pageX;
		  dragObject.downY = e.pageY;
		  
		}
		
		
		
		
		
		document.onmousemove = function(e) {
			
		  if (!dragObject.elem) return; // элемент не зажат

		  if ( !dragObject.avatar ) { // если перенос не начат...

			// посчитать дистанцию, на которую переместился курсор мыши
			var moveX = e.pageX - dragObject.downX;
			var moveY = e.pageY - dragObject.downY;
			if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
			  return; // ничего не делать, мышь не передвинулась достаточно далеко
			}

			dragObject.avatar = createAvatar(e); // захватить элемент
			if (!dragObject.avatar) {
			  dragObject = {}; // аватар создать не удалось, отмена переноса
			  return; // возможно, нельзя захватить за эту часть элемента
			}

			// аватар создан успешно
			// создать вспомогательные свойства shiftX/shiftY
			var coords = getCoords(dragObject.avatar);
			dragObject.shiftX = dragObject.downX - coords.left;
			dragObject.shiftY = dragObject.downY - coords.top;

			startDrag(e); // отобразить начало переноса
		  }

		  // отобразить перенос объекта при каждом движении мыши
		  dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
		  dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

		  return false;
		  
		}
		
		
		
		
		document.onmouseup = function(e) {
		  // (1) обработать перенос, если он идет
		  if (dragObject.avatar) {
			finishDrag(e);
		  }

		  // в конце mouseup перенос либо завершился, либо даже не начинался
		  // (2) в любом случае очистим "состояние переноса" dragObject
		  dragObject = {};
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
				
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

