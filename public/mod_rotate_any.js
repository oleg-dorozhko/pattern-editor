function rotate_any(params,callback)
{
	if(params==null)
	{
		var s = prompt("enter number from 40 to 90 both include");
		if(s==undefined) return; 	
		if(s==null) return; 	
		var wh = Number(s.trim());
		if(wh<1) return;
		if(wh>359) return;
		params={};
		params.degree=wh;
		
		
	}
	else
	{
		
		
		
		
		
		var tparams={};
		tparams.degree=Number(''+params[0]);
		params=tparams;
		
	}
	
	//__rotate_any(params.degree);
	
	//return;
	
	if(params)
	{
		if(callback)
		{
			
			ident("canvas", 'ident', function(data){
				
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				
				
			});
			
		}
		else{
			
			ident("canvas", 'ident', function(data){
				
				params = 'degree='+encodeURIComponent(params.degree)+'&md5='+data;
				textToServerAndReturnText(params, '/pre_rotate_any', function()
				{
					transform("canvas", '/rotate_any', callback); 
					
				}, onerror);
				
				
			});
		
		}
	}
	else{
		
	return;
	}
	
	
}


