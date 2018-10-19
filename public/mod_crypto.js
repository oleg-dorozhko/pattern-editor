function cripto_script()
{
	if (document.getElementById("modal_window0")==null)
	{
		global_ec_vars_arr = null;
		global_ec_vars_arr_index=null;
		global_ec_vars_arr_length=0;
		global_client_typing_mode = false;
		
		modal_window( hcripto_script );
	}
	
	global_ec_vars_arr = null;
		global_ec_vars_arr_index=null;
		global_ec_vars_arr_length=0;
		global_client_typing_mode = false;
}

function decripto_script()
{
	var s = prompt('enter cripted');
	if (s==null) return;
	s = s.replace(/\s/g," "); 
			///////////// processing random(100,100,100,255) ////////////////
		var zam =  s.match(/cf\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\)/g); 
		if (zam )
		{
			for (var i=0;i<zam.length;i++)
			{
				t = zam[i].replace(/,/g,"%");
				s = s.replace(zam[i], t); 
			}
		}
		//////////////////////////////////////////////////
		var arr = s.split(",");
	var arr2 = [];
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]=='') continue;
		arr[i]=arr[i].replace(/%/g,",");
		arr2.push(dgcs(arr[i].trim()));
	}
	
	global_ec_vars_arr = null;
	global_ec_vars_arr_index=null;
	global_ec_vars_arr_length=0;
	global_client_typing_mode = false;
	
	prompt('copy decripted',arr2);
	
}



function dgcs(cmd0) //get_decripto_symbol
{
	var bbb = '';// here number in skobki

	if (cmd0=='bf(45)') return 'rotate 45 degree';
	else if (cmd0=='be') return 'rotate plus 90';
	
	var cmd = cmd0;
	if( cmd0.indexOf('(') >= 0 ) 
	{
		cmd = cmd0.substring( 0, cmd0.indexOf('(') );
		bbb = cmd0.substring( cmd0.indexOf('(') );
	}
	
	
	
	//if (check(cmd)==false )  return 'fd'+bbb; 
	
	console.log("dgcs: bbb="+ bbb );
	console.log("dgcs: cmd="+ cmd );
	
			
			if (cmd=='aa') return 'median'+bbb;
			else if (cmd == 'fd') return '';
			else if (cmd == 'fd') return '';
			else if (cmd == 'ab') return '';
			else if (cmd == 'ca') return 'axes minus'+bbb;
			else if (cmd == 'dc') return 'axes plus'+bbb;
			//else if (cmd == 'vertical axe minus') vertical_axe_minus();
			//else if (cmd == 'horizontal axe minus') horizontal_axe_minus();
			else if (cmd == 'ed') return 'save'+bbb;
			else if (cmd == 'ff') return 'copy'+bbb;
			else if (cmd == 'fa') return 'clean'+bbb;
			else if (cmd == 'ea') return 'colors'+bbb;
			else if (cmd == 'af') return 'floor colors'+bbb;
			else if (cmd == 'ad') return 'min colors'+bbb;
			else if (cmd == 'bb') return 'normal colors'+bbb;
			else if (cmd == 'cb') return 'combo'+bbb;
			//else if (cmd == 'xcombo') xcombo();
			else if (cmd == 'ae') return 'inverse'+bbb;
			else if (cmd == 'df') return 'plus'+bbb;
			else if (cmd == 'fb') return 'minus'+bbb;
			else if (cmd == 'ee') return 'generate seed'+bbb;
			else if (cmd == 'bc') return 'border minus'+bbb;
			else if (cmd == 'cc') return 'border plus'+bbb;
			//else if (cmd == 'save on server') save_on_server();
			else if (cmd == 'ac') return 'vortex'+bbb;
			else if (cmd == 'ba') return 'black white'+bbb;
			else if (cmd == 'bd') return 'half'+bbb;
			else if (cmd == 'be')  return 'rotate plus 90';
			else if (cmd == 'bf')   return 'rotate 45 degree';
			else if (cmd == 'cd') return 'mirror down'+bbb;
			else if (cmd == 'ce') return 'mirror right'+bbb; 
			else if (cmd == 'cf') return 'random'+bbb;	
			else if (cmd == 'da') return 'rgb++'+bbb;
			else if (cmd == 'db') return 'rgb--'+bbb;
			else if (cmd == 'dd')  return 'fill'+bbb;
			else 
			{
				
				console.log('get_cripto_symbol:error: unknown error ['+cmd0+']');
				return 'fd';
			}
}



function gcs(cmd0) //get_cripto_symbol
{
	cmd0 = cmd0.trim();
	var bbb = '';// here number in skobki

	if (cmd0=='rotate(45)') return 'bf,';
	else if (cmd0=='rotate(90)') return 'be,';
	
	var cmd = cmd0;
	if( cmd0.indexOf('(') >= 0 ) 
	{
		cmd = cmd0.substring( 0, cmd0.indexOf('(') );
		bbb = cmd0.substring( cmd0.indexOf('(') );
	}
	
	bbb += ',';
	
	if (check(cmd)==false )  return 'fd'+bbb; 
	
	console.log("gcs: bbb="+ bbb );
	console.log("gcs: cmd="+ cmd );
	
			
			if (cmd=='median') return 'aa'+bbb;
			else if (cmd == ' ') return 'fd'+bbb;
			else if (cmd == '') return 'fd'+bbb;
			//else if (cmd == 'execute script') return 'ab'+bbb;
			else if (cmd == 'axes minus') return 'ca'+bbb;
			else if (cmd == 'axes plus') return 'dc'+bbb;
			//else if (cmd == 'vertical axe minus') vertical_axe_minus();
			//else if (cmd == 'horizontal axe minus') horizontal_axe_minus();
			else if (cmd == 'save') return 'ed'+bbb;
			else if (cmd == 'copy') return 'ff'+bbb;
			else if (cmd == 'clean') return 'fa'+bbb;
			else if (cmd == 'colors') return 'ea'+bbb;
			else if (cmd == 'floor colors') return 'af'+bbb;
			else if (cmd == 'min colors') return 'ad'+bbb;
			else if (cmd == 'normal colors') return 'bb'+bbb;
			else if (cmd == 'combo') return 'cb'+bbb;
			//else if (cmd == 'xcombo') xcombo();
			else if (cmd == 'inverse') return 'ae'+bbb;
			else if (cmd == 'plus') return 'df'+bbb;
			else if (cmd == 'minus') return 'fb'+bbb;
			else if (cmd == 'generate seed') return 'ee'+bbb;
			else if (cmd == 'border minus') return 'bc'+bbb;
			else if (cmd == 'border plus') return 'cc'+bbb;
			//else if (cmd == 'save on server') save_on_server();
			else if (cmd == 'vortex') return 'ac'+bbb;
			else if (cmd == 'black white') return 'ba'+bbb;
			else if (cmd == 'half') return 'bd'+bbb;
			else if (cmd == 'rotate plus 90')  return 'be'+bbb;
			else if (cmd == 'rotate 45 degree')   return 'bf'+bbb;
			else if (cmd == 'mirror down') return 'cd'+bbb;
			else if (cmd == 'mirror right') return 'ce'+bbb; 
			else if (cmd == 'random') return 'cf'+bbb;	
			else if (cmd == 'rgb++') return 'da'+bbb;
			else if (cmd == 'rgb--') return 'db'+bbb;
			else if (cmd == 'fill')  return 'dd'+bbb;
			else 
			{
				
				console.log('get_cripto_symbol:error: unknown error ['+cmd+']');
				return 'fd'+bbb;
			}
}

function hcripto_script(el)
{
	/********
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/help.txt');
	xhr.onload = function ()
	{
		if (xhr.status != 200) 
		{
			alert('pprintHelp(): unknown error ' + xhr.status + ': ' + xhr.statusText)
		}
		else
		{
	*******/		
			var chld = el.getElementsByTagName("p")[1].childNodes[0];
			el.getElementsByTagName("textarea")[0].addEventListener('paste', handlePaste);
			chld.onclick = function() { 
			localStorage.setItem("last_script",el.getElementsByTagName("textarea")[0].value.trim());
			cripto_t_script(el);
			
			}
			chld.innerHTML = "Cripto";
			//el.getElementsByTagName("p")[1].removeChild(chld);
				//console.log(el.getElementsByTagName("textarea")[0].innerHTML);
			el.getElementsByTagName("textarea")[0].placeholder = "Paste your script here";	
			var scr = localStorage.getItem("last_script");
			if (scr != null) el.getElementsByTagName("textarea")[0].value = scr;
			
	/******		
		}
	}
	xhr.send();
	*****/


}

var global_ec_vars_arr = null;
var global_ec_vars_arr_index=null;
var global_ec_vars_arr_length=0;

var global_result_cripted_script = "";

function cripto_t_script(el)
{
	if(global_ec_vars_arr_index==null)
	{		
		var s = el.getElementsByTagName("textarea")[0].value.trim();
		s = s.replace(/\s/g," ");
		document.body.removeChild(document.getElementById("modal_window0"));
		
		///////////// processing random(100,100,100,255) ////////////////
		var zam =  s.match(/random\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\)/g); 
		if (zam )
		{
			for (var i=0;i<zam.length;i++)
			{
				t = zam[i].replace(/,/g,"%");
				s = s.replace(zam[i], t); 
			}
		}
		//////////////////////////////////////////////////
		var arr = s.split(",");
		global_ec_vars_arr = arr;
		global_ec_vars_arr_index = 0;
		global_ec_vars_arr_length = arr.length;
		
		
		
		setTimeout ( cripto_t_script, 500 );
	}
	else if (global_ec_vars_arr_index < global_ec_vars_arr_length)
	{
		
		cripto_instruction ( global_ec_vars_arr[global_ec_vars_arr_index], function(){ 
		
			global_ec_vars_arr_index++;
			setTimeout ( cripto_t_script, 50 );
			
		});
	}
	else
	{
		global_ec_vars_arr = null;
		global_ec_vars_arr_index=null;
		global_ec_vars_arr_length=0;
		global_client_typing_mode = false;
		prompt("cripted",global_result_cripted_script);
	
	}
	
	
}

function cripto_instruction ( instr, callback)
{
	instr = instr.trim();
	instr = instr.replace(/%/g,",");
	
	global_result_cripted_script += gcs(instr);
	callback();
	/****
	if (instr.match(/random\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\)/))
	{
		instr = instr.replace ("random(","");
		instr = instr.replace (")","");
		instr = instr.trim();
		var instr_arr = instr.split(",");
		var n1 = Number(instr_arr[0]);
		var n2 = Number(instr_arr[1]);
		var n3 = Number(instr_arr[2]);
		var n4 = Number(instr_arr[3]);
		
		random_with_param(n1,n2,n3,n4);
		callback();
	}
	else if (instr.match(/combo\(save_canvas[0-9]+\)/))
	{
		instr = instr.replace ("combo(","");
		instr = instr.replace (")","");
		instr = instr.trim();
				
		global_result_cripted_script += combo_with_name(instr, callback);
	}
	else if (instr.match(/generate\sseed\(\d{1,2}\)/))
	{
		instr = instr.replace ("generate seed(","");
		instr = instr.replace (")","");
		instr = instr.trim();
				
		generate_seed_with_param(instr, callback);
	}
	else if (instr.match(/axes\sminus\(\d{1,2}\)/))
	{
		instr = instr.replace ("axes minus(","");
		instr = instr.replace (")","");
		instr = instr.trim();
				
		both_axes_minus_with_param(instr, callback);
	}
	else if (instr.match(/save\(save_canvas[0-9]+\)/))
	{
		instr = instr.replace ("save(","");
		instr = instr.replace (")","");
		instr = instr.trim();
				
		save_with_name(instr);
		callback();
	}
	else if (instr.match(/rotate\(\d{1,3}\)/))
	{
		instr = instr.replace ("rotate(","");
		instr = instr.replace (")","");
		instr = instr.trim();
		
		var n1 = Number(instr);
		rotate(n1);
		callback();
	}
	else
	{
		exec1(instr);
		callback();
	}
	******/
}


function handlePaste (e) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

	this.value += pastedData;
    // Do whatever with pasteddata
    //alert(pastedData);
}
