function loadDesktop()
{
	
		var s0 = localStorage.getItem("desktop");
		if(s0==null) return;
	
		
		var obj = JSON.parse(s0);
				
		var s = obj.buttons;
		var s2 = obj.saves;
		var s4 = obj.canvas;
				
		var lst = document.getElementById('history_div');
		while( lst.hasChildNodes()  )
		{
			lst.removeChild(lst.childNodes[0]);
		}

		
		
		for (var i=0;i<s.length;i++)
		{
			
			
			
			var btn = s[i];

			xcmd(btn)
			
		}
		
		var lst2 = document.getElementById('saves');
		while( lst2.hasChildNodes()  )
		{
			lst2.removeChild(lst2.childNodes[0]);
		}

		//all remove need
		
		
		for (var i=0;i<s2.length; i++)
		{
				
				setTimeout( function(s22, n){
				
					
					var arr = s22[n];
					var id = arr[0];
					var dataUrl = arr[1];
					
					return function(){
						
						loadSave( n, id, dataUrl );
					}
					
				}(s2, i), 100 ); 
		
		
			
		}
		
		setTimeout ( function(){
		
		if 	(s4.length>0)
		{
			
			var img = new Image();
			img.onload = function()
			{
				var canvas = document.getElementById("canvas");
				canvas.width = this.width;
				canvas.height = this.height;
				canvas.getContext("2d").drawImage(this,0,0); 
			}
			img.src = s4[1]; 
		
		}
		else
		{
			setInitialImageToCanvas();
		}
		
			
		}, 500);
		
	
}

function loadSave( i, id, dataUrl )
{
	
		
				
				var cnv =  document.createElement("canvas");
				cnv.className = "draggable";
				cnv.id = id;
				cnv.alt = ""+i;
				cnv.classList.toggle("save-canvas-class");
				cnv.classList.toggle("seed-unbordered");
				
				//cnv.setAttribute("bordered","false");
				
				cnv.onclick = selectSaveCanvas;
				
				
			
				var img = new Image();
				img.onload = function()
				{
					
					cnv.width = this.width;
					cnv.height = this.height;
					cnv.getContext("2d").drawImage(this,0,0); 
					
					document.getElementById("saves").appendChild(cnv);
					
				}
				img.src = dataUrl;
							
}



function print_all()
{
	if (document.getElementById("modal_window0")==null)
	{
		modal_window( function (div) {
			
			var btn = document.getElementById("save_settings");//document.createElement("button");
			//btn.innerHTML = "Save";
			btn.onclick = parseTextAreaAndSaveToLocalStore;
			
			//localStorage.clear();
			var lst = document.getElementById('history_div').childNodes;
			var s = [];
			
			for (var i=0;i<lst.length;i++)
			{
				var value = lst[i].innerHTML;
				s.push(value);
			}
			
			var lst2 = document.getElementById('saves').childNodes;
			var s2 = [];
			
			for (var i=0;i<lst2.length;i++)
			{
				var key = "saves_div_"+lst2[i].id;
				var value = lst2[i].toDataURL();
				s2.push ([key, value]);
			}
			
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			var dataURL = canvas.toDataURL(); 
			
			s3 = ["desktop_canvas",dataURL];
			
			var obj = {};
			obj.buttons = s;
			obj.saves = s2;
			obj.canvas = s3;
			
			div.getElementsByTagName("textarea")[0].innerHTML = JSON.stringify (obj);
			div.getElementsByTagName("textarea")[0].addEventListener('paste', handlePaste);
			
			
			
			//alert('saved');
			
			
			
		});
	}
}

function load_all()
{
	if (document.getElementById("modal_window0")==null)
	{
		modal_window(function (div)
		{
			var btn = document.getElementById("save_settings");//document.createElement("button");
			//btn.innerHTML = "Save";
			btn.onclick = parseTextAreaAndSaveToLocalStore;
			
			div.getElementsByTagName("textarea")[0].addEventListener('paste', handlePaste);
			
			div.getElementsByTagName("textarea")[0].innerHTML = '';
			div.getElementsByTagName("textarea")[0].placeholder = 'Insert your buttons and patterns here and press save';
			/********
			var btn0 = document.getElementById("close_modal_window");
			div.getElementsByTagName("p")[1].removeChild(btn0);
			div.getElementsByTagName("p")[1].appendChild(btn);
			div.getElementsByTagName("p")[1].appendChild(btn0);
			/****
			document.getElementById("close_modal_window").onclick = function() 	{
				document.body.removeChild(document.getElementById("modal_window0"));
			}
			
			.insertBefore(div.getElementById('close_modal_window'),btn);
			****/
		});
	}
	
	
	
}

function modsld_saveDesktop()
{
	var lst = document.getElementById('history_div').childNodes;
			var s = [];
			
			for (var i=0;i<lst.length;i++)
			{
				var value = lst[i].innerHTML;
				s.push(value);
			}
			
			var lst2 = document.getElementById('saves').childNodes;
			var s2 = [];
			
			for (var i=0;i<lst2.length;i++)
			{
				var key = "saves_div_"+lst2[i].id;
				var value = lst2[i].toDataURL();
				s2.push ([key, value]);
			}
			
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
			var dataURL = canvas.toDataURL(); 
			
			s3 = ["desktop_canvas",dataURL];
			
			var obj = {};
			obj.buttons = s;
			obj.saves = s2;
			obj.canvas = s3;
			
			var json = JSON.stringify (obj);
			
			localStorage.clear();
			localStorage.setItem("desktop",json);
			
		//	div.getElementsByTagName("textarea")[0].innerHTML = JSON.stringify (obj);
		//	div.getElementsByTagName("textarea")[0].addEventListener('paste', handlePaste);
			
			
			
			
}



function setInitialButtonsToCanvas()
{

			
			var json = '{"buttons":["plus","minus","half","median","vortex","axes minus","axes plus","combo","border minus","border plus","colors","min colors","rotate 45 degree","fill","random","inverse","black white","save","copy","clean"],"saves":[],"canvas":[]}';
			
			localStorage.clear();
			localStorage.setItem("desktop",json);
	
			
}


function parseTextAreaAndSaveToLocalStore()
{
	var div = document.getElementById("modal_window0"); 
	if ( div != null )
	{
		var s0 = div.getElementsByTagName("textarea")[0].innerHTML;
		try
		{
			var obj = JSON.parse(s0);
			
			var s = obj.buttons;
			var s2 = obj.saves;
			var s4 = obj.canvas;
			
			var lst = document.getElementById('history_div');
			while( lst.hasChildNodes()  )
			{
				lst.removeChild(lst.childNodes[0]);
			}

			for (var i=0;i<lst.length;i++)
			{
				
			}
			
			for (var i=0;i<s.length;i++)
			{
				
				
				
				var btn = s[i];
		
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
			
			var lst2 = document.getElementById('saves');
			while( lst2.hasChildNodes()  )
			{
				lst2.removeChild(lst2.childNodes[0]);
			}

			//all remove need
			
			
			
			
			for (var i=0;i<s2.length;i++)
			{
				var arr = s2[i];
				var id = arr[0];
				var dataUrl = arr[1];
				
				
	
				//console.log("save id="+id);
				
				
					var cnv =  document.createElement("canvas");
					cnv.className = "draggable";
					cnv.id = id;
					cnv.alt = ""+i;
					cnv.classList.toggle("save-canvas-class");
					cnv.classList.toggle("seed-unbordered");
					
					//cnv.setAttribute("bordered","false");
					
					cnv.onclick = selectSaveCanvas;
					
					document.getElementById("saves").appendChild(cnv);
				
					var img = new Image();
					img.onload = function()
					{
						
						cnv.width = this.width;
						cnv.height = this.height;
						cnv.getContext("2d").drawImage(this,0,0); 
					}
					img.src = dataUrl;
								
				
				
			}
			
			
			
			var img = new Image();
					img.onload = function()
					{
						var canvas = document.getElementById("canvas");
						
						canvas.width = this.width;
						canvas.height = this.height;
						canvas.getContext("2d").drawImage(this,0,0); 
					}
					img.src = s4[1]; 
		
			localStorage.clear();
			localStorage.setItem("desktop",s0);
			
			
			document.body.removeChild(document.getElementById("modal_window0"));
			
			
		}
		
		catch (err)
		{
			console.log(err);
		}
		
	}
}

function handlePaste (e) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

	this.innerHTML = pastedData;
    // Do whatever with pasteddata
    //alert(pastedData);
}

