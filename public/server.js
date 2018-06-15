function s_inverse(params,callback)
{
	transform("canvas", '/inverse',callback); 
}

function s_paint_over(params,callback)
{
	transform("canvas", '/paint_over',callback); 
}

function s_random(params,callback)
{
	transform("canvas", '/random',callback); 
}

function s_black_white(params,callback) 
{  
	transform("canvas", '/blackwhite', callback); 
	
} 

function s_plus(params,callback)
{
	transform("canvas", '/plus',callback); 
}

function s_ident( params, callback )
{
	transform("canvas", '/ident', callback ); 
}

function s_border_minus(params, callback)
{
	transform("canvas", '/borderminus', callback ); 
	
}
function s_both_axes_minus(params, callback)
{
	
	transform("canvas", '/axes_minus', callback ); 
}
function s_both_axes_plus(params, callback)
{
	
	transform("canvas", '/axes_plus', callback ); 
}

function s_crop_lt( params, callback )
{
	crop_lt( params, callback )
}

function s_crop_rb( params, callback )
{
	crop_rb( params, callback )
}

function s_half( params, callback )
{
	transform("canvas", '/half', callback); 
}

function s_vortex(  )
{
	execute_t_script("mirror right, mirror down"); 
}

function s_minus(params,callback)
{
	transform("canvas", '/minus',callback); 
}

function s_mirror_right(params,callback)
{
	transform("canvas", '/mright',callback); 
}

function s_mirror_down(params,callback)
{
	transform("canvas", '/mdown',callback); 
}

function s_median(params,callback)
{
	transform("canvas", '/median',callback); 
}

function s_rio(params,callback,callback)
{
	transform("canvas", '/rio',callback); 
}

function s_gcombo(params,callback)
{
	transform("canvas", '/gcombo',callback); 
}

function s_brain(params,callback)
{
	transform("canvas", '/brain',callback); 
}

function s_razn_colors(params,callback)
{
	
	//textToServerAndReturnText(txt, url, callback, onerror)
	transform("canvas", '/razn_colors',callback); 
}

function s_step_colors(params,callback)
{
	transform("canvas", '/step_colors',callback); 
}
function s_join_colors(params,callback)
{
	transform("canvas", '/join_colors',callback); 
}
function s_odin_dva_colors(params,callback)
{
	transform("canvas", '/odin_dva_colors',callback); 
}

function s_smooth(params,callback)
{
	transform("canvas", '/smooth',callback); 
}

function s_colors(params,callback)
{
	sendImageToUrlGetText( "canvas", '/colors', colors, callback ); 
}


function s_up(params,callback)
{
	transform("canvas", '/up',callback); 
}