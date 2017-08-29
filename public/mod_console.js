
		//$("#upload").click( function() { alert('Not implemented yet'); } );
		//$("#paste").click( function() { alert('Not implemented yet'); } );
		//$("#seed_list").click( selectSeed );
		//$("#desktop").click( selectSaveCanvas );
		
		/*******
		$("#axesp").click( whenUserClickAxesP );
		$("#axes").click( axes );
		$("#vaxem").click( vertical_axe_minus );
		$("#haxem").click( horizontal_axe_minus );
		$("#clean").click( clean );
		$("#save").click( function() { save_pattern(); } );
		$("#copy").click( sendCopyToServer );
		$("#combo").click( combo );
		$("#xcombo").click( xcombo );
		// $("#lighter").click( lighter );
		
		$("#lighter3").click( lighter3 );
		$("#lighter2").click( lighter2 );
		$("#darker").click( darker );
		$("#hider").click( hider );
		
		$("#save_on_server_btn").click( save_on_server );
		
		$("#vortex").click( vortex );
		
		$("#borderminus").click( function() { transform("canvas", '/borderminus'); logg('borderminus');  } );
		$("#borderplus").click( function() {transform("canvas", '/borderplus'); logg('borderplus');  } );
		$("#blackwhite").click( function() {  transform("canvas", '/blackwhite');logg('blackwhite');} );
		$("#inv").click( function() {  transform("canvas", '/inverse'); console.log('inverse');} );
		$("#plus").click( plus );
		$("#gen").click( generate_seed );
		$("#minus").click( minus );// function() { transform("canvas", '/minus'); console.log('minus'); } );
		$("#multiply").click( function() { transform("canvas", '/multiply'); console.log('multiply'); } );
		
		// $("#half").click( function() { transform("canvas", '/half'); } );
		$("#half").click( half );
	
		$("#median").click( median );
	//	$("#median").click( function() { transform("canvas", '/median'); console.log("median"); } );
	
	//$("#rotate90").click( function() { transform("canvas", '/rotate'); } );
	
		$("#rotate_plus_90").click( rotate90 );
		$("#rotateff").click( function() {transform("canvas", '/rotateff');  console.log('rotate 45'); } );
		$("#mirror_down").click( mdown ); // function() { transform("canvas", '/mdown');  console.log('mdown');} );
		$("#mirror_right").click( mright ); // function() { transform("canvas", '/mright'); console.log('mright'); } );
		
		$("#random").click( random );
		$("#add_cyclic").click( add_cyclic );
	//	$("#random").click( function() { transform("canvas", '/random'); console.log('random'); } );
		
		$("#fill").click( function() {send_seed();  console.log('fill'); } );
		
		$("#canvas").click( function(ev) { whenClickedOnCanvas(ev); } );
		
		
		

		**************/
		function mod_console_dummy(cmd)
		{
			return cmd;
		}
		
		function exec1(cmd)
		{
			if (cmd=='median') median();
			else if (cmd == 'both axes minus') both_axes_minus();
			else if (cmd == 'both axes plus') both_axes_plus();
			else if (cmd == 'vertical axe minus') vertical_axe_minus();
			else if (cmd == 'horizontal axe minus') horizontal_axe_minus();
			else if (cmd == 'save') save();
			else if (cmd == 'copy') copy();
			else if (cmd == 'clean') clean();
			else if (cmd == 'combo') combo();
			else if (cmd == 'xcombo') xcombo();
			else if (cmd == 'inverse') inverse();
			else if (cmd == 'plus') plus();
			else if (cmd == 'minus') minus();
			else if (cmd == 'generate seed') generate_seed();
			else if (cmd == 'border minus') border_minus();
			else if (cmd == 'border plus') border_plus();
			else if (cmd == 'save on server') save_on_server();
			else if (cmd == 'vortex') vortex();
			else if (cmd == 'black white') black_white();
			else if (cmd == 'half') half();
			else if (cmd == 'rotate plus 90')  rotate_plus_90();
			else if (cmd == 'rotate plus 45')   rotate_plus_45();
			else if (cmd == 'mirror down') mirror_down (); 
			else if (cmd == 'mirror right') mirror_right (); 
			else if (cmd == 'random') random();	
			else if (cmd == 'fill')  fill();  
			else 
			{
				alert('Unknown error');
				return;
			}
		}
		
		function check(cmd)
		{
			if (cmd=='median') return true;
			else if (cmd == 'both axes minus')  return true;
			else if (cmd == 'both axes plus')  return true;
			else if (cmd == 'vertical axe minus')  return true;
			else if (cmd == "horizontal axe minus")  return true;
			else if (cmd == 'save')  return true;
			else if (cmd == 'copy')  return true;
			else if (cmd == 'clean')  return true;
			else if (cmd == 'combo')  return true;
			else if (cmd == 'xcombo')  return true;
			else if (cmd == 'inverse')  return true;
			else if (cmd == 'plus')  return true;
			else if (cmd == 'minus')  return true;
			else if (cmd == 'generate seed')  return true;
			else if (cmd == 'border minus')  return true;
			else if (cmd == 'border plus')  return true;
			else if (cmd == 'save on server')  return true;
			else if (cmd == 'vortex')  return true;
			else if (cmd == 'black white') return true;
			else if (cmd == 'half')  return true;
			else if (cmd == 'rotate plus 90')  return true;
			else if (cmd == 'rotate plus 45')   return true;
			else if (cmd == 'mirror down')  return true;
			else if (cmd == 'mirror right') return true; 
			else if (cmd == 'random')  return true;
			else if (cmd == 'fill')   return true;
			else 
			{
				alert('Unknown error');
				return false;
			}
		}
		
		function xcmd(cmd)
		{
			
			var cmd = mod_console_dummy(cmd);
			
			if (check (cmd))
			{
				var sp = document.createElement('span');
				sp.className = "history";
				sp.innerHTML = cmd;
				
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
		
function process_console_text()
{
	var con = prompt('enter cmd');
	if(con==null) return;
	var cmd = con.trim();
	xcmd(cmd);
	
	//	$("#random").click( random );
	//	$("#add_cyclic").click( add_cyclic );
	//	$("#random").click( function() { transform("canvas", '/random'); console.log('random'); } );
		
	//	$("#fill").click( function() {send_seed();  console.log('fill'); } );
		
	
	//$("#rotateff").click( function() {transform("canvas", '/rotateff');  console.log('rotate 45'); } );
	
	//$("#upload").click( function() { alert('Not implemented yet'); } );
	//$("#paste").click( function() { alert('Not implemented yet'); } );
	//$("#seed_list").click( selectSeed );
	//$("#desktop").click( selectSaveCanvas );
		
		/*******
		$("#axesp").click( whenUserClickAxesP );
		$("#axes").click( axes );
		$("#vaxem").click( vertical_axe_minus );
		$("#haxem").click( horizontal_axe_minus );
		$("#clean").click( clean );
		$("#save").click( function() { save_pattern(); } );
		$("#copy").click( sendCopyToServer );
		$("#combo").click( combo );
		$("#xcombo").click( xcombo );
		// $("#lighter").click( lighter );
		
		$("#lighter3").click( lighter3 );
		$("#lighter2").click( lighter2 );
		$("#darker").click( darker );
		$("#hider").click( hider );
		
		$("#save_on_server_btn").click( save_on_server );
		
		$("#vortex").click( vortex );
		
		$("#borderminus").click( function() { transform("canvas", '/borderminus'); logg('borderminus');  } );
		$("#borderplus").click( function() {transform("canvas", '/borderplus'); logg('borderplus');  } );
		$("#blackwhite").click( function() {  transform("canvas", '/blackwhite');logg('blackwhite');} );
		$("#inv").click( function() {  transform("canvas", '/inverse'); console.log('inverse');} );
		$("#plus").click( plus );
		$("#gen").click( generate_seed );
		$("#minus").click( minus );// function() { transform("canvas", '/minus'); console.log('minus'); } );
		$("#multiply").click( function() { transform("canvas", '/multiply'); console.log('multiply'); } );
		
		// $("#half").click( function() { transform("canvas", '/half'); } );
		$("#half").click( half );
	
		$("#median").click( median );
	//	$("#median").click( function() { transform("canvas", '/median'); console.log("median"); } );
	
	//$("#rotate90").click( function() { transform("canvas", '/rotate'); } );
	
		$("#rotate_plus_90").click( rotate90 );
		$("#rotateff").click( function() {transform("canvas", '/rotateff');  console.log('rotate 45'); } );
		$("#mirror_down").click( mdown ); // function() { transform("canvas", '/mdown');  console.log('mdown');} );
		$("#mirror_right").click( mright ); // function() { transform("canvas", '/mright'); console.log('mright'); } );
		
		$("#random").click( random );
		$("#add_cyclic").click( add_cyclic );
	//	$("#random").click( function() { transform("canvas", '/random'); console.log('random'); } );
		
		$("#fill").click( function() {send_seed();  console.log('fill'); } );
		
		******/


}

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