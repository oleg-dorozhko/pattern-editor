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

// event.type должен быть keypress
function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

function showHide(el)
{
	if(el.style.visibility == 'hidden') el.style.visibility = 'visible';
	else el.style.visibility = 'hidden';
	
	if(el.id == 'scale_div') {  
		el.style.border = "";
		glob_x_left_top = canvas.width/2|0;
		glob_y_left_top = canvas.height/2|0;
		redrawPixels_main(document.getElementById("canvas").getContext("2d"), glob_x_left_top , glob_y_left_top );
	
	 }
}

window.onload = function()
{
	loadDivFirst( function() {
	
		setInitialImageToCanvas();
		moveDraggableOnOwnPlace();
		initModPixels();
	

		$("#save").click( function() { save_pattern(); } );
		$("#copy").click( sendCopyToServer );
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
		
		$("#canvas").click( function(ev) { whenClickedOnCanvas(ev); } );
		
		document.onkeypress = function(e)
		{
			var ch = getChar(e);
			if(ch == null) return;
			if(ch == 'p') showHide(document.getElementById("scale_div"));
			else if(ch == 's') showHide(document.getElementById("seed_list"));
			else if(ch == 'b') showHide(document.getElementById("buttons_list"));
				
		}
		
		
		
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
			if ( ev.target.hasAttribute('selectable') || ev.target.parentElement.hasAttribute('selectable') )
			{
				unselectAll();
				selectSelectableElement(ev);
			}
		};
	
		var CLIPBOARD = new CLIPBOARD_CLASS("canvas", true);
		
	});
	
	
}


function unselectAll()
{
	var list = document.getElementsByTagName('*');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('selectable'))
		{
			list[i].style.border = '';
		}
	}
}

function selectSelectableElement(ev)
{
	var _el = ev.target;
		
	if(_el.style.border == '')
	{
		_el.style.border = "1px solid red";
	}
	else
	{
		_el.style.border = '';
	}
	
}

window.onerror = function(message, url, lineNumber) {
    alert("Поймана ошибка, выпавшая в глобальную область!\n" + "Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
}

