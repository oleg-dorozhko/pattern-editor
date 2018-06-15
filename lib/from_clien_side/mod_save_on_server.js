
	
	function save_on_server(time,msg)
	{
			
				var canvas = document.getElementById("canvas");
				var context = canvas.getContext("2d");

				var dataURL = canvas.toDataURL(); //  = "data:image/png...."
				
				var formData = new FormData();
				formData.append("msg", msg);
				formData.append("time", time);
				formData.append("saving_canvas", dataURL);
				
				// отослать
				//var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

				//var xhr = new XHR();
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://127.0.0.1/gifmaker/php/save_saved_pattern_on_server0.php",true);
				/****
				xhr.setRequestHeader("Access-Control-Allow-Origin","*");
				   xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
				   xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
				   xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
				*****/
				xhr.onload = function(data)
				{
					// alert(data);
				}
				xhr.send(formData);

				
				/*****
				var fd = document.createElement("form");
				fd.setAttribute("id", "image_form0");
				fd.setAttribute("action", "localhost/gifmaker/php/save_saved_pattern_on_server.php");
				fd.setAttribute("method", "POST");
				document.body.appendChild(fd);
				var formData = new FormData(document.forms.image_form0);
				*******/

			
			
	}
   
   function removeFrames()
	  {
		  
var myNode = document.getElementById("frames");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
		  
			
		  
	  }
   
   function make_gif()
   {
	   alert('make_gif');
   }
  