function mod_console_js_showConsole(e)
{
	if(document.getElementById("console_div") == null)
	{
	
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
				
		var cons = document.createElement("div");
		cons.id = "console_div";
		cons.autofocus=true;
		cons.className = "draggable";
		cons.style.position ="fixed";
		cons.style.left = ""+(x-150)+"px";
		cons.style.top = ""+(y-50)+"px";
		cons.style.width= "364px";
		cons.style.height = "100px";
		cons.style['z-Index'] = "9999";
		cons.style['background-color']="#AAA";
		cons.oncontextmenu = function(e)
		{
			if(document.getElementById("console_div") == null) return;
			this.removeChild(document.getElementById("console"));
			document.body.removeChild(this);
			e.preventDefault();
		}
		
		var inp = document.createElement("input");
		inp.type="text";
		inp.id="console";
		inp.size="40";
		inp.style.position = "relative";
		inp.style.left = "20px";
		inp.style.top = "15px";
		inp.style.padding="5px";
		inp.autofocus=true;
		inp.onkeypress = function(e)
		{
			console.log(e);
			if(e.code == "Enter")
			{
				alert('catch: '+this.value);
				e.preventDefault();
			}
			
		}
		inp.focus();
		cons.appendChild(inp);
		/***
		cons.appendChild(document.createElement("br"));
		
		inp = document.createElement("textarea");
		inp.id="script_ta";
		inp.style.position = "relative";
		inp.style.left = "20px";
		inp.style.top = "15px";
		inp.style.padding="5px";
		inp.cols=20;
		inp.rows=7;
		cons.appendChild(inp);
		****/
		document.body.appendChild(cons);
		
		console.log(inp);
	}
}