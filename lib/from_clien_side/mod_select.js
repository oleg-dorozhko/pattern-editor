function isSelectable(el)
{
	if ( el.hasAttribute('bordered') || el.parentElement.hasAttribute('bordered') ) return true;
	return false;
}


function unselectAll()
{
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		 
		if( isSelectable(list[i]) )
		{
			list[i].style.border = '';
			list[i].setAttribute("bordered","false");
		}
	}
	
	list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		 
		if( isSelectable(list[i]) )
		{
			list[i].style.border = '';
			list[i].setAttribute("bordered","false");
		}
	}
}


function select(params,callback)
{
	if(params)
	{
		var id = params[0].trim();
		selectSaveCanvas({target: document.getElementById(id)});
		if(callback) callback();
		return;
	}
	
	return;
}


function selectSelectableElement(el)
{
	if(el.getAttribute("bordered") == "false") 
	{
		unselectAll();
		if(el.tagName=="IMG")
		{
			el.style.border = "2px solid white";
		}
		else
		{
			el.style.border = "2px solid red";
		}
		el.setAttribute("bordered","true");
	}
	else
	{
		unselectAll();
	}
	
}


function getSelectedBorderedSeedImage()
{
	var ind = null;
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(!list[i].style.border == '') {ind= i; break;}
	}
	if(ind==null) return null;
	return list[ind];
}

function getSelectedBorderedSaveCanvas()
{
	var ind = null;
	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].id=="pixels") continue;
		if(list[i].id=="canvas") continue;
		if(!list[i].style.border == '') {ind= i; break;}
	}
	if(ind==null) return null;
	return list[ind];
}