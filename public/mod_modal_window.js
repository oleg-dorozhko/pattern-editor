function modal_window( callback, callback2 )
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
				global_ec_vars_arr = null;
				global_ec_vars_arr_index=null;
				global_ec_vars_arr_length=0;
				global_client_typing_mode = false;
			}
			if ( callback && callback2 ) {
				
				callback ( div, callback2 );
			}
			else if ( callback )   callback ( div );
			
			
			
		}
	}
	xhr.send();
	
}