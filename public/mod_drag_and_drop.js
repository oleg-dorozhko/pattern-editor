
var dragObject = {};

function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}


function startDrag(e) {
  var avatar = dragObject.avatar;

  document.body.appendChild(avatar);
  avatar.style.zIndex = 9999;
  avatar.style.position = 'absolute';
}


function createAvatar(e) {

  // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
  var avatar = dragObject.elem;
  var old = {
    parent: avatar.parentNode,
    nextSibling: avatar.nextSibling,
    position: avatar.position || '',
    left: avatar.left || '',
    top: avatar.top || '',
    zIndex: avatar.zIndex || ''
  };

  // функция для отмены переноса
  avatar.rollback = function() {
    old.parent.insertBefore(avatar, old.nextSibling);
    avatar.style.position = old.position;
    avatar.style.left = old.left;
    avatar.style.top = old.top;
    avatar.style.zIndex = old.zIndex
  };

  return avatar;
}

function findDroppable(event) {
  // спрячем переносимый элемент
  dragObject.avatar.hidden = true;

  // получить самый вложенный элемент под курсором мыши
  var elem = document.elementFromPoint(event.clientX, event.clientY);

  // показать переносимый элемент обратно
  dragObject.avatar.hidden = false;

  if (elem == null) {
    // такое возможно, если курсор мыши "вылетел" за границу окна
    return null;
  }

  return elem.closest('.droppable');
}

function finishDrag(e) {
    var dropElem = findDroppable(e);

    if (!dropElem) {
		onDragCancel(dragObject);
    } else {
        onDragEnd(dragObject, dropElem);
    }
  }

  function onDragCancel(dragObject) {
      dragObject.avatar.rollback();
    }

    function onDragEnd(dragObject, dropElem) {
      //dragObject.elem.style.display = 'none';
      //dropElem.classList.add('computer-smile');
      //setTimeout(function() {    dropElem.classList.remove('computer-smile');     }, 200);
	  /*******
	  console.log('drag stop: ');
	  console.log(dragObject.elem.id );
	  console.log(dragObject.elem.style.left );
	  console.log(dragObject.elem.style.top );
	  console.log(dragObject.elem.style.position );
	  console.log(dropElem);
	  ********/
	  var obj_xyp = {};
	  obj_xyp.x = dragObject.elem.style.left;
	  obj_xyp.y = dragObject.elem.style.top;
	  obj_xyp.p = dragObject.elem.style.position;
	  
	  // Store
	  localStorage.setItem(dragObject.elem.id, JSON.stringify(obj_xyp));
    }

	function moveDraggableOnOwnPlace()
	{
		var list = document.getElementsByTagName('*');
		for (var i = 0; i < list.length; i++) {
			if (list[i].className == "draggable")
			{
				var json_obj = localStorage.getItem(''+list[i].id);
				if(json_obj == null) 
				{
					 var obj_xyp = {};
					  obj_xyp.x = list[i].style.left;
					  obj_xyp.y = list[i].style.top;
					  obj_xyp.p = list[i].style.position;
					  
					  // Store
					  localStorage.setItem(list[i].id, JSON.stringify(obj_xyp));
				}
				else
				{
					var xyp = JSON.parse(json_obj);
					list[i].style.position = xyp.p;
					list[i].style.left = xyp.x;
					list[i].style.top = xyp.y;
				}
			}
	    }

	}
