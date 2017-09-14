function restart()
{
	global_ec_vars_arr = null;
	global_ec_vars_arr_index=null;
	global_ec_vars_arr_length=0;
	global_client_typing_mode = false;
	localStorage.setItem('history_chain',null);
}