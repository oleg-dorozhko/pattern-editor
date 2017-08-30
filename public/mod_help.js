function help()
{
	if (document.getElementById("modal_window0")==null)
	{
		modal_window( printHelp );
	}
}

function printHelp(el)
{
	//console.log(el.getElementsByTagName("textarea")[0].innerHTML);
	el.getElementsByTagName("textarea")[0].innerHTML = 'Help here';
}