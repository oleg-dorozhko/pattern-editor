function execute_script()
{
	if (document.getElementById("modal_window0")==null)
	{
		modal_window( hexecute_script );
	}
}


function hexecute_script(el)
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
			execute_t_script(el);
			}
			chld.innerHTML = "Execute";
			//el.getElementsByTagName("p")[1].removeChild(chld);
				//console.log(el.getElementsByTagName("textarea")[0].innerHTML);
			el.getElementsByTagName("textarea")[0].placeholder = "Paste your script here";	
			
	/******		
		}
	}
	xhr.send();
	*****/


}

var global_ec_vars_arr = null;
var global_ec_vars_arr_index=null;
var global_ec_vars_arr_length=0;

function execute_t_script(el)
{
	if(global_ec_vars_arr_index==null)
	{		
		var s = el.getElementsByTagName("textarea")[0].value.trim();
		
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
		
		
		
		setTimeout ( execute_t_script, 500 );
	}
	else if (global_ec_vars_arr_index < global_ec_vars_arr_length)
	{
		
		execute_instruction ( global_ec_vars_arr[global_ec_vars_arr_index], function(){ 
		
			global_ec_vars_arr_index++;
			setTimeout ( execute_t_script, 500 );
			
		});
	}
	else
	{
		global_ec_vars_arr = null;
		global_ec_vars_arr_index=null;
		global_ec_vars_arr_length=0;
		global_client_typing_mode = false;
	}
	
	
}

function execute_instruction ( instr, callback)
{
	instr = instr.trim();
	instr = instr.replace(/%/g,",");
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
				
		combo_with_name(instr, callback);
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
