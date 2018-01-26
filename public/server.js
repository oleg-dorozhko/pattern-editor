function s_plus()
{
	transform("canvas", '/plus'); 
}

function s_minus()
{
	transform("canvas", '/minus'); 
}

function s_mirror_right()
{
	transform("canvas", '/mright'); 
}

function s_mirror_down()
{
	transform("canvas", '/mdown'); 
}

function s_median()
{
	transform("canvas", '/median'); 
}

function s_rio()
{
	transform("canvas", '/rio'); 
}

function s_razn_colors()
{
	
	//textToServerAndReturnText(txt, url, callback, onerror)
	transform("canvas", '/razn_colors'); 
}

function s_step_colors()
{
	transform("canvas", '/step_colors'); 
}
function s_join_colors()
{
	transform("canvas", '/join_colors'); 
}
function s_odin_dva_colors()
{
	transform("canvas", '/odin_dva_colors'); 
}

function s_smooth()
{
	transform("canvas", '/smooth'); 
}

function s_colors()
{
	sendImageToUrlGetText( "canvas", '/colors', colors ); 
}


function s_up()
{
	transform("canvas", '/up'); 
}