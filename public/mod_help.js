function help()
{
	if (document.getElementById("modal_window0")==null)
	{
		modal_window( printHelp );
	}
}

function printHelp(el)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/help.txt');
	xhr.onload = function ()
	{
		if (xhr.status != 200) 
		{
			alert('pprintHelp(): unknown error ' + xhr.status + ': ' + xhr.statusText)
		}
		else
		{
			
			var chld = el.getElementsByTagName("p")[1].childNodes[0];
			el.getElementsByTagName("p")[1].removeChild(chld);
				//console.log(el.getElementsByTagName("textarea")[0].innerHTML);
			el.getElementsByTagName("textarea")[0].innerHTML = xhr.responseText;	
			
			
		}
	}
	xhr.send();


}