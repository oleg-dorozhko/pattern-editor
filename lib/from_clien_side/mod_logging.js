var global_logging_mode = 1; //1 -write actions names, 2 - write actions names and saving images

function logg(s)
{
	if(global_logging_mode==0)
	{
	}
	else if(global_logging_mode==1)
	{
		var ms = (new Date()).getTime();
		console.log("["+ms+"]: "+s);
	}
	else if(global_logging_mode==2)
	{
		var ms = (new Date()).getTime();
		console.log("["+ms+"]: "+s);
		save_on_server(ms,s);
	}
}

function errror(err)
{
	var ms = (new Date()).getTime();
	console.log("["+ms+"]: "+err);
}