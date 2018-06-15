function vortex(params,callback)
{
	if(params)
	{
		if(callback)
		{
			
			transform("canvas", '/vortex',callback);
			
			
			
		}
		else{
			
			transform("canvas", '/vortex',callback);
		}
		
		//logg('vortex '+params.join(" ")); 
	}
	else{
		transform("canvas", '/vortex',callback);
		//logg('vortex'); 
	}
	
	
}