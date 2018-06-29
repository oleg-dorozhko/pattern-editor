
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
		$("#execute_script").click( execute_script );
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
		
		function exec1(cmd, params, callback)
		{
			if (check(cmd)==false ) return; 
			if(cmd=='') return;
			if(cmd==' ') return;
			
			if(callback==undefined)
			{
				callback  = function(result_data)
				{
					
					if(result_data) console.log(''+cmd+' '+result_data.join(" "));
					else console.log(''+cmd);
				}
			}
			
			
			if (cmd == 'labirint') labirint();
			else if (cmd == 'map') map();
			else if (cmd=='median') s_median(params, callback);
			else if (cmd == 'execute script') { 
													global_client_typing_mode = true; 
													execute_script( params, function() {  global_client_typing_mode = false;  } ); 
			}
			else if (cmd == 'axes minus') s_both_axes_minus(params, callback);
			else if (cmd == 'axes plus') s_both_axes_plus(params, callback);
			else if (cmd == 'vertical axe minus') vertical_axe_minus(params, callback);
			else if (cmd == 'horizontal axe minus') horizontal_axe_minus(params, callback);
			else if (cmd == 'save') save(params, callback);
			else if (cmd == 'copy') copy(params, callback);
			else if (cmd == 'clean') clean(params, callback);
			//else if (cmd == 'crypto') cripto();
			else if (cmd == 'colors') s_colors(params, callback);
			else if (cmd == 'floor colors') floor_colors(params, callback);
			else if (cmd == 'razn colors') s_razn_colors(params, callback);
			else if (cmd == 'min colors') min_colors(params, callback);
			else if (cmd == 'ident') s_ident(params, callback);
			else if (cmd == 'step colors') s_step_colors(params, callback);
			else if (cmd == 'destroy colors') s_destroy_colors(params, callback);
			else if (cmd == 'brain') s_brain(params, callback);
			else if (cmd == 'generate random seed')  generate_random_seed(params, callback);
			else if (cmd == 'gen rnd seed')  generate_random_seed(params, callback);
			else if (cmd == 'join colors') s_join_colors(params, callback);
			else if (cmd == 'odin dva colors') s_odin_dva_colors(params, callback);
			else if (cmd == 'crop lt') s_crop_lt(params, callback);
			else if (cmd == 'crop rb') s_crop_rb(params, callback);
			else if (cmd == 'smooth') s_smooth(params, callback);
			else if (cmd == 'nineth') s_nineth(params, callback);
			else if (cmd == 'nonineth') s_nonineth(params, callback);
			else if (cmd == 'select') select(params, callback);
			else if (cmd == 'xminus') xminus(params, callback);
			else if (cmd == 'normal colors') normal_colors(params, callback);
			else if (cmd == 'combo') client_combo(params, callback);
			else if (cmd == 'gcombo') s_gcombo(params, callback);
			else if (cmd == 'breath of chaos') breath_of_chaos(params, callback);
			else if (cmd == 'rio') s_rio(params, callback);
			else if (cmd == 'up') s_up(params, callback);
			else if(cmd == 'paste') paste();
			//else if (cmd == 'xcombo') xcombo();
			else if (cmd == 'inverse') s_inverse(params, callback);
			else if (cmd == 'plus') s_plus(params, callback);
			else if (cmd == 'restart')  restart();
			else if (cmd == 'minus') s_minus(params, callback);
			else if (cmd == 'generate seed') generate_seed(params, callback);
			else if (cmd == 'border minus') s_border_minus(params, callback);
			else if (cmd == 'border plus') s_border_plus(params, callback);
			//else if (cmd == 'save on server') save_on_server();
			else if (cmd == 'vortex') s_vortex(params, callback);
			else if (cmd == 'black white') s_black_white(params, callback);
			else if (cmd == 'half') s_half(params, callback);
			else if (cmd == 'rotate plus 90')  rotate_plus_90(params, callback);
			else if (cmd == 'rotate plus 45')   rotate_plus_45(params, callback);
			else if (cmd == 'paint over')   s_paint_over(params, callback);
			else if (cmd == 'rotate any')   rotate_any(params, callback);
			else if (cmd == 'mirror down') s_mirror_down (params, callback); 
			else if (cmd == 'mirror right') s_mirror_right (params, callback); 
			else if (cmd == 'random') s_random(params, callback);	
			else if (cmd == 'rgb++') rgb_plus_plus(params, callback);
			else if (cmd == 'rgb--') rgb_minus_minus(params, callback);
			else if (cmd == 'fill')  fill(params, callback);  
			else 
			{
				global_client_typing_mode = false;
				console.log('mod_console:error: Unknown command ['+cmd+']');
				return false;
			}
			
			
			
			global_client_typing_mode = false;
		}
		
		function check(cmd)
		{
			//console.log('check: ['+cmd+']');
			if(cmd=='') return true;
			else if(cmd==' ') return true;
			else if (cmd == 'labirint') return true;
			else if (cmd == 'map') return true;
			else if (cmd=='median') return true;
			else if (cmd == 'execute script') return true;
			else if (cmd == 'axes minus')  return true;
			else if (cmd == 'axes plus')  return true;
			//else if (cmd == 'vertical axe minus')  return true;
			//else if (cmd == "horizontal axe minus")  return true;
			else if (cmd == 'save')  return true;
			else if (cmd == 'paste') return true;
			else if (cmd == '<textarea id="ta77">PASTE</textarea>') return true;
			else if (cmd == '<textarea id="ta77">paste</textarea>') return true;
			else if (cmd == 'copy')  return true;
			else if (cmd == 'gen rnd seed')   return true;
			else if (cmd == 'generate random seed')     return true;
			else if (cmd == 'brain')  return true;
			else if (cmd == 'crop rb') return true;
			else if (cmd == 'select')  return true;
			else if (cmd == 'crop lt') return true;
			else if (cmd == 'ident') return true;
			else if (cmd == 'clean')  return true;
			else if (cmd == 'xminus') return true;
			else if (cmd == 'restart')  return true;
			//else if (cmd == 'cripto script')  return true;
			else if (cmd == 'colors') return true;
			else if (cmd == 'smooth') return true;
			else if (cmd == 'nineth') return true;
			else if (cmd == 'nonineth') return true;
			else if (cmd == 'floor colors') return true;
			else if (cmd == 'gcombo')  return true;
			else if (cmd == 'razn colors')  return true;
			else if (cmd == 'step colors') return true;
			else if (cmd == 'destroy colors')  return true;
			else if (cmd == 'paint over')  return true;
			else if (cmd == 'join colors')  return true;
			else if (cmd == 'odin dva colors') return true;
			else if (cmd == 'normal colors') return true;
			else if (cmd == 'min colors') return true;
			else if (cmd == 'combo')  return true;
			else if (cmd == 'up')  return true;
			else if (cmd == 'rio') return true;
			else if (cmd == 'breath of chaos') return true;
			//else if (cmd == 'xcombo')  return true;
			else if (cmd == 'inverse')  return true;
			else if (cmd == 'plus')  return true;
			else if (cmd == 'minus')  return true;
			else if (cmd == 'generate seed')  return true;
			else if (cmd == 'border minus')  return true;
			else if (cmd == 'border plus')  return true;
			//else if (cmd == 'save on server')  return true;
			else if (cmd == 'vortex')  return true;
			else if (cmd == 'black white') return true;
			else if (cmd == 'half')  return true;
			else if (cmd == 'rotate plus 90')  return true;
			else if (cmd == 'rotate plus 45')   return true;
			else if (cmd == 'rotate any')     return true;
			else if (cmd == 'mirror down')  return true;
			else if (cmd == 'mirror right') return true; 
			else if (cmd == 'random')  return true;
			else if (cmd == 'rgb++') return true;
			else if (cmd == 'rgb--') return true;
			else if (cmd == 'fill')   return true;
			else 
			{
				global_client_typing_mode = false;
				//console.log('mod_console:error: Unknown command ['+cmd+']');
				return false;
			}
			global_client_typing_mode = false;
		}
		
		function xcmd(cmd)
		{
			
			var cmd = mod_console_dummy(cmd);
			
			if (check (cmd))
			{
				var sp = document.createElement('span');
				sp.className = "flex-item history";
				sp.oncontextmenu = function(e){ 
					e.preventDefault(); 
					var r = prompt("Are you sure? Choosen button will be removed. Press 'Ok' if yes");
					if(r==null) return;
					document.getElementById('history_div').removeChild(this);
				}	
				if(cmd=='paste'||cmd=='<textarea id="ta77">PASTE</textarea>'||cmd == '<textarea id="ta77">paste</textarea>')
				{
					cmd = '<textarea id="ta77">paste</textarea>';

					//<div style="width:90px;height:34px;border:2px solid blue;text-align:center;"></div>
				    sp.oncontextmenu = function(e){}	
				}
				
				sp.innerHTML = cmd;
				//sp.id='span_button_'+cmd;
				sp.onclick = function(e) { 
				
				
				if(cmd=='paste'||cmd=='<textarea id="ta77">PASTE</textarea>'||cmd == '<textarea id="ta77">paste</textarea>')
				{
					alert('Right click only');
					return;
				}
				
				
				
				
					sp.style['background-color']='red';
					setTimeout( function(){	
					sp.style['background-color']='';
					}, 100);
					//var r = cmd.replace(' ','_');
					//if( window[''+r] ) window[''+r]();
					//document.getElementById('console_text').value = e.target.innerHTML;
					//console.log(this.innerHTML);
					exec1(this.innerHTML);
				}
				
					
				
				document.getElementById('history_div').appendChild(sp);
			}
			
		}
		
function process_console_text()
{
	var con = prompt('enter cmd');
	if(con==null) { global_client_typing_mode=false; return; }
	var cmd = con.trim();
	xcmd(cmd);
	 global_client_typing_mode=false; 
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
				console.log('catch: '+this.value);
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