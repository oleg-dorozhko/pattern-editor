function min_colors(params,callback)
{
	sendImageToUrlGetText( "canvas", '/colors', function(num_colors)
	{
		//arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент
		var s = prompt("enter number",num_colors);
		if 	(s==null) return null;
		var obj = {};
		obj.num_colors=s;
		var params = JSON.stringify(obj);		
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/set_num_colors', true);
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

				transform("canvas",'/min_colors');
				
		}

		xhr.send(params);
	
	} ); 
}