function save_to_history(cmd)
{
	var h = localStorage.getItem('history_chain'); 
	h += cmd;
	localStorage.setItem('history_chain',h);
}

function load_from_history()
{
	var h = localStorage.getItem('history_chain'); 
	return h;
}
