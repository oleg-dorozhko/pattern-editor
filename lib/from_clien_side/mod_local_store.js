function save_desktop_to_local_store()
{
	localStorage.clear();
	var lst = document.getElementById('history_div').childNodes;
	for (var i=0;i<lst.length;i++)
	{
		var key = "history_div_"+lst[i].innerHTML;
		var value = lst[i].innerHTML;
		localStorage.setItem(key,value);
	}
	
	//alert('saved');
}

function load_desktop_from_local_store()
{
	for ( var i = 0, len = localStorage.length; i < len; ++i ) 			{
		
		var key = localStorage.key( i );
		
		if( key.indexOf( 'history_div_' ) != -1 )
		{			
			var btn = localStorage.getItem( key );
		
			if (check (btn))
			{
				var sp = document.createElement('span');
				sp.className = "flex-item history";
				sp.innerHTML = btn;
				
				sp.onclick = function(e) { 
					
					//var r = cmd.replace(' ','_');
					//if( window[''+r] ) window[''+r]();
					//document.getElementById('console_text').value = e.target.innerHTML;
					exec1(this.innerHTML);
				}
				
				sp.oncontextmenu = function(e){ e.preventDefault(); document.getElementById('history_div').removeChild(this);}	
				
				document.getElementById('history_div').appendChild(sp);
			}
		}
		
	}
	
}

function loadMemory( callback )
{
	
	loadJSON(	'memory/memory.json', 		function(data) {    withData(data); callback();	} );
	
}

function getMemory(key, type)
{
	var res = localStorage.getItem(key);
	if(type=='num') return Number(res);
	return res;

}