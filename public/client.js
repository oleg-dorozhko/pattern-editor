/****
function revenge()
{
	alert("we need revenge!");
	//location = '/revenge'; // NO! NO! NO!
	
	
    
        $.post(
		
			"/revenge", 
			
			{ name: "Donald Duck", city: "Ленинград" }, 
			
			function( data, state ) 
			{ 
				alert("Data: " + data + "\nState: " + state); 
				if(state == "success") $("#img1").attr("src",data);
			}
        
        );
   

	
	//ONCLICK AJAX POST
}

*****/

function sendMsgToServer(msg)
{
	console.log("client: in sendMsgToServer");
	$.post( msg, {}, function( data, state ) { 
						
						console.log("data: "+data);
						console.log("state: "+state);
						if(state == "success") loadOut(data);	
						
					 });
			
}

function sendPostMsgToServer(msg, params)
{
	
	var xhr = new XMLHttpRequest();
	var parameters = '';
	var tmp = '';
	for(item in params)
	{
		parameters += (tmp + item+'='+encodeURIComponent(params[item]));
		tmp = '&';
	}		
			//console.log(parameters);return;
	//var parameters = 'x=' + encodeURIComponent(x) +  '&y=' + encodeURIComponent(y)+"&flag="+encodeURIComponent(flag);
	
		xhr.open('POST', msg, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onload = function(e) {  
		
			//progressBar.hidden = true;
		
			if (xhr.readyState != 4) return;

			
			
			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }

			console.log("filled as "+xhr.responseText);
			window['loadOut'](xhr.responseText);
		
			
		}

		
		xhr.send(parameters);
			
}

function loadOut(img_rnd_name)
{
	console.log("client: in loadOut: img_rnd_name="+img_rnd_name);
	var canvas = document.getElementById("canvas");
	var img = new Image(); 
	img.onload = function() 
	{ 
		var ctx = canvas.getContext("2d");
		canvas.width = this.width;
		canvas.height = this.height;
		ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
	}
	img.src = img_rnd_name;
}

function getNewSaveNumber()
{

	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(!list[i].style.border == '') return i;
	}
	
	for(var i=0;i<500;i++)
	{
		
		var el = document.getElementById("save_canvas"+i);
		if(el==undefined || el == null)
		{
			return i;
		}
	}
	
	return 501;
}



function save_pattern()
{
	
	var ind = -1;
	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(!list[i].style.border == '') {ind = i; break;}
	}
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	if(ind == -1)
	{
		var save_canvas = document.createElement("canvas");
		
		var n = getNewSaveNumber();
		save_canvas.id = "save_canvas"+n;
		save_canvas.alt = "save_canvas"+n;
		var sp = document.createElement("span");
		sp.id="span_"+save_canvas.id;
		sp.innerHTML = ""+n;
		save_canvas.onclick = function() { selectSaveCanvas(this.id); }
		sp.appendChild(save_canvas);
		document.getElementById("saves").appendChild(sp);
		
	}
	else
	{
		var save_canvas = document.getElementById(list[ind].id);
	
	}
	
	save_canvas.width = canvas.width;
	save_canvas.height = canvas.height;
	var save_context = save_canvas.getContext("2d"); 
	
	save_context.putImageData(context.getImageData(0,0,canvas.width,canvas.height),0,0);
	
	
}



var glob_x_left_top = null;
var glob_y_left_top = null;
var glob_pg_main_color = null;
var glob_showing_scale_div = false;
var glob_scale_div = null;

window.onload = function()
{
	loadOut($("#canvas").attr("init-path"));
	
	$("#save").click(function(){
		console.log("client: was click save");
		save_pattern(); 

	});
	
	$("#inv").click(function(){
		console.log("client: was click inv");
		sendMsgToServer("/inverse");
	});
	
	$("#plus").click(function(){
		console.log("client: was click plus");
		sendMsgToServer("/plus");
	});
	
	$("#minus").click(function(){
		console.log("client: was click minus");
		sendMsgToServer("/minus");
	});
	
	$("#rnd").click(function(){
		console.log("client: was click rnd");
		sendMsgToServer("/rnd");
	});
	
		
	$("#multiply").click(function(){
		console.log("client: was click multiply");
		sendMsgToServer("/multiply");
	});
	
	$("#median").click(function(){
		console.log("client: was click median");
		sendMsgToServer("/median");
	});
	
	$("#fill").click(function(){
		console.log("client: was click fill");
		var params = [];
		params['simname'] = findSelectedSeedClicked();
		if(params['simname']==null) return;
		console.log(params);
		sendPostMsgToServer("/fill", params);
	});
	
	$("#combo").click(function(){
		console.log("client: was click combo");
		call_server_combo();
	});
	
	$("#mirror_right").click(function(){
		console.log("client: was click mirror_right");
		sendMsgToServer("/mright");
	});
	
	$("#mirror_down").click(function(){
		console.log("client: was click mirror_down");
		sendMsgToServer("/mdown");
	});
	
	$("#rotate").click(function(){
		console.log("client: was click rotate");
		sendMsgToServer("/rotate");
	});
	
	
	
		var c1 = document.getElementById("canvas");
		c1.onclick = function(e)
		{
			//setSelectedCanvas('canvas');
			evt = (e) ? e : event;   
			if(evt.button == 0) 
			{
				
				var x = e.offsetX==undefined?e.layerX:e.offsetX;
				var y = e.offsetY==undefined?e.layerY:e.offsetY;
				
				glob_x_left_top = x;
				glob_y_left_top = y;
								
				var context = this.getContext("2d");
				var imageData = context.getImageData(x,y,1,1);
					
				global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
				
				showSomeDiv(e.target,x,y);
				redrawPixels_main(context, x,y);
				
			}
			
		}	
		
		
		document.onclick = function(event) {
			
			if (!event.target.hasAttribute('seed-clicked')) return;

			var sim_el = event.target;
			
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
		
		
		var CLIPBOARD = new CLIPBOARD_CLASS("canvas", true);
	
}

function call_server_combo()
{
	var ind = null;
	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('init-path')) continue;
		
		if(list[i].style.border == '') continue;
		
		ind = i;
		
		break;
		
	}
	
	if(ind == null) return;
	
	var canvas = list[ind];

	canvas.toBlob(function(blob) { 
	
		console.log(blob);
			  
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/combo', true);
		
		xhr.onload = function(e) {  
		
			//progressBar.hidden = true;
		
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }
			clearAllSaveCanvas();
			console.log("combined as "+xhr.responseText);
			window['loadOut'](xhr.responseText);
			
			
		}

		/*****
		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				progressBar.value = (e.loaded / e.total) * 100;
				progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
			}
		};
		****/

		xhr.send(blob);
		
	});
		
		
}

function selectSaveCanvas(id)
{
	var list = document.getElementsByTagName('canvas'); 
	for(var i=0;i<list.length;i++)
	{
		if(id == list[i].id) continue;
		list[i].style.border = '';
	}
	var el = document.getElementById(id);
	if(el.style.border == '')
	{
		el.style.border = "1px solid red";
	}
	else
	{
		el.style.border = '';
	}
	
}

function findSelectedSeedClicked()
{
	var list = document.getElementsByTagName('img');
	for(var i=0;i<list.length;i++)
	{
		if(list[i].hasAttribute('seed-clicked'))
		{
			if(!list[i].style.border == '') return list[i].src.substr(list[i].src.lastIndexOf('/')+1);
		}
	}
	return null;
}

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

function clearAllSaveCanvas()
{
	var list = document.getElementsByTagName('canvas');
	for(var i=0;i<list.length;i++)
	{
		list[i].style.border = '';
	}
}
		
function setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main(document.getElementById("canvas").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
				
		
		
function showSomeDiv(target,x,y)
{
	
	if(glob_scale_div != null && glob_showing_scale_div == true)
	{
		document.getElementById("span_pixels").removeChild(glob_scale_div);
		glob_scale_div = null;
		glob_showing_scale_div = false;
	}
	
	var el = document.createElement('div');
    el.className = 'tooltip';

	
    var coords = target.getBoundingClientRect();

	el.style.left = (screen.width / 2 - 75) + 'px';
    el.style.top = (screen.height/4 - 75) + 'px';
	
	var tri_btns = '<input type="button" id="btn_lt" value=" left top "> <input type="button" id="btn_rb" value=" right bottom "> <input type="button" id="btn_esc" value=" cancel ">';
	
	el.innerHTML = tri_btns+'<table><tr><td><canvas id="pixels" width="150" height="150" style="cursor:crosshair;border: 1px solid gold"></canvas></td></tr><table>';
	
	
	
	glob_scale_div = el;
	glob_showing_scale_div = true;
	
	document.getElementById("span_pixels").appendChild(el);
	
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
	
}


function setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			crop_crop(glob_x_left_top,glob_y_left_top,1);
			
			document.getElementById("span_pixels").removeChild(glob_scale_div);
			glob_showing_scale_div = false;
			glob_scale_div=null;
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			crop_crop(glob_x_left_top,glob_y_left_top,2);
			document.getElementById("span_pixels").removeChild(glob_scale_div);
			glob_showing_scale_div = false;
			glob_scale_div=null;
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			document.getElementById("span_pixels").removeChild(glob_scale_div);
			glob_showing_scale_div = false;
			glob_scale_div=null;
		
		}

}


function redrawPixels_main(context, x,y)
{
	var c2 = document.getElementById("pixels");
	c2.width = 150;//(img_width * m) + (img_width - 1)*p;
	c2.height = 150;//(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			
			
			var imageData = context.getImageData(x+i,y+j,1,1);
			
			//hexColor = getColorFromArray();
			
			
			ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			if(i==0 && j==0) ctx.fillStyle = "red";
			ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
		}
	}
	
}

function crop_crop(x,y,flag)
{
	
	//var data = x+","+y+","+flag;
	
			var xhr = new XMLHttpRequest();
			
			
			var parameters = 'x=' + encodeURIComponent(x) +  '&y=' + encodeURIComponent(y)+"&flag="+encodeURIComponent(flag);
	
		xhr.open('POST', '/crop', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onload = function(e) {  
		
			//progressBar.hidden = true;
		
			if (xhr.readyState != 4) return;

			
			
			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }

			console.log("croped as "+xhr.responseText);
			window['loadOut'](xhr.responseText);
		
			
		}

		/***
		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				progressBar.value = (e.loaded / e.total) * 100;
				progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
			}
		};
		***/

		xhr.send(parameters);
	
	
	
	
	
	
	
	
	
	
}

///////////////////////////////////////////////
///////////    init paste from anywhere
//////////////////////////////////////
/*********
window.addEventListener('paste',  function(event) {
	
  //$("#progress").hidden = false;
  // Listen to the upload progress.
		var progressBar = document.querySelector('progress');
		progressBar.hidden = false;
  var items = ( event.clipboardData || event.originalEvent.clipboardData ).items;
  //console.log(JSON.stringify(items)); // will give you the mime types
  for (index in items) {
    var item = items[index];
	
    if (item.kind === 'file') {
		
		var blob = item.getAsFile();
	  
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/paste', true);
		xhr.onload = function(e) {  
		
			progressBar.hidden = true;
		
			if (xhr.readyState != 4) return;

			
			
			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }

			console.log("uploaded as "+xhr.responseText);
			window['loadOut'](xhr.responseText);
		
			
		}

		
		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				progressBar.value = (e.loaded / e.total) * 100;
				progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
			}
		};

		xhr.send(blob);
    }
  }
  
});

**************/



/**
 * image pasting into canvas
 * 
 * @param string canvas_id canvas id
 * @param boolean autoresize if canvas will be resized
 */
function CLIPBOARD_CLASS(canvas_id, autoresize) {
    var _self = this;
    
	var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
	
    var ctrl_pressed = false;
    var reading_dom = false;
    var text_top = 15;
    var pasteCatcher;
    var paste_mode;

    //handlers
    document.addEventListener('keydown', function (e) {
        _self.on_keyboard_action(e);
    }, false); //firefox fix
    document.addEventListener('keyup', function (e) {
        _self.on_keyboardup_action(e);
    }, false); //firefox fix
    document.addEventListener('paste', function (e) {
        _self.paste_auto(e);
    }, false); //official paste handler

    //constructor - prepare
    this.init = function () {
        //if using auto
        if (window.Clipboard)
            return true;

        pasteCatcher = document.createElement("div");
        pasteCatcher.setAttribute("id", "paste_ff");
        pasteCatcher.setAttribute("contenteditable", "");
        pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
        pasteCatcher.style.marginLeft = "-20px";
        pasteCatcher.style.width = "10px";
        document.body.appendChild(pasteCatcher);
        document.getElementById('paste_ff').addEventListener('DOMSubtreeModified', function () {
            if (paste_mode == 'auto' || ctrl_pressed == false)
                return true;
            //if paste handle failed - capture pasted object manually
            if (pasteCatcher.children.length == 1) {
                if (pasteCatcher.firstElementChild.src != undefined) {
						
						//console.log("we here!");                  
						
						// image
                     _self.paste_createImage(pasteCatcher.firstElementChild.src);
                }
            }
            //register cleanup after some time.
            setTimeout(function () {
                pasteCatcher.innerHTML = '';
            }, 20);
        }, false);
    }();
    //default paste action
    this.paste_auto = function (e) {
        paste_mode = '';
        pasteCatcher.innerHTML = '';
        var plain_text_used = false;
        if (e.clipboardData) {
            var items = e.clipboardData.items;
            if (items) {
                paste_mode = 'auto';
                //access data directly
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        //image
                        var blob = items[i].getAsFile();
						
						
						
						
						console.log(blob);
						
						
						var xhr = new XMLHttpRequest();
						
						xhr.open('POST', '/paste', true);
						
						xhr.onload = function(e) {  
						
							//progressBar.hidden = true;
						
							if (xhr.readyState != 4) return;

							if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }

							console.log("combined as "+xhr.responseText);
							window['loadOut'](xhr.responseText);
						
							
						}

						/*****
						xhr.upload.onprogress = function(e) {
							if (e.lengthComputable) {
								progressBar.value = (e.loaded / e.total) * 100;
								progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
							}
						};
						****/

						xhr.send(blob);
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
                        //var URLObj = window.URL || window.webkitURL;
                        //var source = URLObj.createObjectURL(blob);
                        //this.paste_createImage(source);
                    }
                }
                e.preventDefault();
            }
            else {
                //wait for DOMSubtreeModified event
                //https://bugzilla.mozilla.org/show_bug.cgi?id=891247
            }
        }
    };
    //on keyboard press - 
    this.on_keyboard_action = function (event) {
        k = event.keyCode;
        //ctrl
        if (k == 17 || event.metaKey || event.ctrlKey) {
            if (ctrl_pressed == false)
                ctrl_pressed = true;
        }
        //c
        if (k == 86) {
            if (document.activeElement != undefined && document.activeElement.type == 'text') {
                //let user paste into some input
                return false;
            }

            if (ctrl_pressed == true && !window.Clipboard)
                pasteCatcher.focus();
        }
    };
    //on kaybord release
    this.on_keyboardup_action = function (event) {
        k = event.keyCode;
        //ctrl
        if (k == 17 || event.metaKey || event.ctrlKey || event.key == 'Meta')
            ctrl_pressed = false;
    };
	

    //draw image
    this.paste_createImage = function (source) {
        var pastedImage = new Image();
        pastedImage.onload = function () {
            if(autoresize == true){
                //resize canvas
                canvas.width = pastedImage.width;
                canvas.height = pastedImage.height;
            }
            else{
                //clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(pastedImage, 0, 0);
			
			
			
			
			canvas.toBlob(function(blob) { 
	
				console.log(blob);
					  
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/paste', true);
				
				xhr.onload = function(e) {  
				
					//progressBar.hidden = true;
				
					if (xhr.readyState != 4) return;

					if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }

					console.log("combined as "+xhr.responseText);
					window['loadOut'](xhr.responseText);
				
					
				}

				/*****
				xhr.upload.onprogress = function(e) {
					if (e.lengthComputable) {
						progressBar.value = (e.loaded / e.total) * 100;
						progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
					}
				};
				****/

				xhr.send(blob);
				
			});
			
			
			
			
			
			
			
			
			
			
			
        };
        pastedImage.src = source;
    };
	
}