/**
function generate_seed(params,callback)
{
	gen();

	if(callback) callback();
}


function gen()
{
	var s = prompt("enter number");
	if(s==null) return; 	
	
	var wh = Number(s.trim());
	
	
	
	
}
**/
function generate_random_seed(params,callback)
{
	gen_rnd(params,callback);

	
}



function gen_rnd(params, callback)
{
	var wh = -1;
	
	
	var wh2 = -1;
	
	
	
	if(params && params.length > 0)
	{
		wh = Number(params[0].trim());
		if(wh<3) return;
		if(wh>20) return;
		
		 wh2 = Number(params[1].trim());
		if(wh2<2) return;
		if(wh2>8) return;
		
	}
	
	
	var obj = {};
	obj.size=wh;
	obj.num_colors=wh2;
	var params = JSON.stringify(obj);	
	
	
	
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/generate_random_seed', true);
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

				
				
				
				getImageFromBlob( xhr.response, function(img) 	{
						
						imageToCanvas(img, "canvas", function()  { 
						
						if (callback) callback();
						
					});	
					
				});	
				
				
				
				
				
		}

		xhr.send(params);
		
	
	
}
