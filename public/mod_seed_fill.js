function clearAllSeedClicked(el)
{
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(el.src == list[i].src) continue;
			list[i].style.border = '';
		}
	}
}

function whenSomeSeedSelected(ev)
{
	var sim_el = ev.target;
			
	clearAllSeedClicked(sim_el);

	if(sim_el.style.border == '')
	{
		sim_el.style.border = "1px solid red";
	}
	else
	{
		sim_el.style.border = '';
	}
	
}

function send_seed()
{
	
	var img = null;
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(!list[i].style.border == '') 
			{
				
				var img = list[i];
				break;
			}
		}
	}
	
	if(img == null) return; // or check for selected save canvas
	
	var canvas =  document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	
	var newimg = new Image();
	newimg.onload = function()
	{
		canvas.width = this.width;
		canvas.height = this.height;
		ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
		
		
		canvas.toBlob( function( blob) {
		
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/send_seed', true);
			xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
			 
				transform("canvas",'/fill');
				
			}
			xhr.send(blob);
			
				
		});
		
		
		
	}
	newimg.src = img.src;
	
}

function old_send_seed() //when sends on server increased image 20x20
{
	
	var img = null;
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(!list[i].style.border == '') 
			{
				
				var img = list[i];
				break;
			}
		}
	}
	
	if(img == null) return; // or check for selected save canvas
	
	var canvas =  document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0,canvas.width,canvas.height);

	canvas.toBlob( function( blob) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/send_seed', true);
		xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }
		 
			transform("canvas",'/fill');
			
		}
		xhr.send(blob);
		
			
	});
	
	
}