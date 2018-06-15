
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
						
						CopyPasteMod_BlobToCanvas(canvas_id,blob);
						
						
						
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
			
		
			
			
        };
        pastedImage.src = source;
    };
	
}


function CopyPasteMod_BlobToCanvas(canvas_id, blob)
{
	
	var newImg = document.createElement("img");

	var urlCreator = window.URL || window.webkitURL;
	var imageUrl = urlCreator.createObjectURL(blob);
		//document.querySelector("#image").src = imageUrl;
		
		//url = URL.createObjectURL(server_blob);

		newImg.onload = function() {	

			//URL.revokeObjectURL(url);
			
			
			
			var canvas = document.getElementById(canvas_id);
			canvas.width=this.width;
			canvas.height=this.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this,0,0);
			
			//stopProgress();
			
			
			console.log("pasted");
			
			if(window['copyPasteFinished'] != undefined) window['copyPasteFinished']();
			
			
			
			
		}
		
		newImg.src = imageUrl;
						
						
}




