/**
 * FROM: http://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in
 * image pasting into canvas
 * 
 * @param {string} canvas_id - canvas id
 * @param {boolean} autoresize - if canvas will be resized
 */
 
 /***
 <style>
textarea {
    border: none;
    overflow: auto;
    outline: none;
    color: transparent;
	text-shadow: 0px 0px 0px rgba(0,0,255,0.5);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
	cursor:pointer;
}
</style>

<div style='width:90px;height:34px;border:2px solid blue;text-align:center;'>
<textarea  style='margin: 3px 12px;width:74px;height:26px;font-weight:bold;font-size:1.5em;resize:none;overflow:hidden'>PASTE</textarea>

</div>
***/

function insertTextArea(s)
{
	
	var ta = document.createElement("textarea");
	
	ta.id="ta77";
	ta.classList.add('for_paste');
	ta.innerHTML = ' Paste';
	ta.title = 'Paste your image, please. Right click only';
	ta.alt= 'Paste your image, please. Right click only';
	ta.onclick = function(){alert('Right click only');}
	var ta_paste_div = document.createElement("div");
	ta_paste_div.id='ta_paste_div';
	ta_paste_div.classList.add('paste_div'); 
	// ta_paste_div.style.display='none';
	ta_paste_div.appendChild(ta);
	document.getElementById(s).insertBefore(ta_paste_div,document.getElementById(s).getElementsByTagName("div")[0]);
}


function CLIPBOARD_CLASS(canvas_id, autoresize) {
	var _self = this;
	//<textarea id="ta77">paste</textarea>
	//if(document.getElementById("ta77")==null)
	{
		
	}
	insertTextArea('controls');
	var canvas = document.getElementById(canvas_id);
	var ctx = document.getElementById(canvas_id).getContext("2d");
	var ctrl_pressed = false;
	var command_pressed = false;
	var paste_event_support;
	var pasteCatcher;

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

	//constructor - we ignore security checks here
	this.init = function () {
		pasteCatcher = document.createElement("div");
		pasteCatcher.setAttribute("id", "paste_ff");
		pasteCatcher.setAttribute("contenteditable", "");
		pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;width:10px;margin-left:-20px;';
		document.body.appendChild(pasteCatcher);

		// create an observer instance
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (paste_event_support === true || ctrl_pressed == false || mutation.type != 'childList'){
					//we already got data in paste_auto()
					return true;
				}

				//if paste handle failed - capture pasted object manually
				if(mutation.addedNodes.length == 1) {
					if (mutation.addedNodes[0].src != undefined) {
						//image
						_self.paste_createImage(mutation.addedNodes[0].src);
					}
					//register cleanup after some time.
					setTimeout(function () {
						pasteCatcher.innerHTML = '';
					}, 20);
				}
			});
		});
		var target = document.getElementById('paste_ff');
		var config = { attributes: true, childList: true, characterData: true };
		observer.observe(target, config);
	}();
	//default paste action
	this.paste_auto = function (e) {
		paste_event_support = false;
		if(pasteCatcher != undefined){
			pasteCatcher.innerHTML = '';
		}
		if (e.clipboardData) {
			var items = e.clipboardData.items;
			if (items) {
				paste_event_support = true;
				//access data directly
				for (var i = 0; i < items.length; i++) {
					if (items[i].type.indexOf("image") !== -1) {
						//image
						var blob = items[i].getAsFile();
						var URLObj = window.URL || window.webkitURL;
						var source = URLObj.createObjectURL(blob);
						this.paste_createImage(source);
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
	//on keyboard press
	this.on_keyboard_action = function (event) {
		k = event.keyCode;
		//ctrl
		if (k == 17 || event.metaKey || event.ctrlKey) {
			if (ctrl_pressed == false)
				ctrl_pressed = true;
		}
		//v
		if (k == 86) {
			if (document.activeElement != undefined && document.activeElement.type == 'text') {
				//let user paste into some input
				return false;
			}

			if (ctrl_pressed == true && pasteCatcher != undefined){
				pasteCatcher.focus();
			}
		}
	};
	//on kaybord release
	this.on_keyboardup_action = function (event) {
		//ctrl
		if (event.ctrlKey == false && ctrl_pressed == true) {
			ctrl_pressed = false;
		}
		//command
		else if(event.metaKey == false && command_pressed == true){
			command_pressed = false;
			ctrl_pressed = false;
		}
	};
	//draw pasted image to canvas
	this.paste_createImage = function (source) {
		var pastedImage = new Image();
		pastedImage.onload = function () {
			/****
			if(autoresize == true){
				//resize
				canvas.width = pastedImage.width;
				canvas.height = pastedImage.height;
			}
			else{
				//clear canvas
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			ctx.drawImage(pastedImage, 0, 0);
			******/
			
			//if(window['whenPastingFinished']!=undefined) window['whenPastingFinished'](pastedImage);
			
			
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
			
			
		};
		pastedImage.src = source;
	};
}