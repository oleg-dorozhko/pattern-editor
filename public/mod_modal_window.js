function modal_window( callback )
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/modal_window.html');
	xhr.onload = function ()
	{
		if (xhr.status != 200) 
		{
			alert('modal_window(): unknown error ' + xhr.status + ': ' + xhr.statusText)
		}
		else
		{
			var div = document.createElement("div");
			div.id="modal_window0";
			div.innerHTML = xhr.responseText;
			
			document.body.appendChild(div);
			document.getElementById("close_modal_window").onclick = function() 	{
				document.body.removeChild(document.getElementById("modal_window0"));
			}
			
			if ( callback ) ( callback ( div ));
				
			
			
		}
	}
	xhr.send();
	
}