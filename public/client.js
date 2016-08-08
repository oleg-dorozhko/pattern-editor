function test_call_server()
{
	
	
	var canvas = document.getElementById("canvas");

	canvas.toBlob( function(blob) { 
	
		//console.log(blob);
			  
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/test_call', true);
		
		xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }
			
			console.log("SERVEr ANSWER: "+xhr.responseText);
			
		}
		

		xhr.send(blob);
		
	});


}

window.onload = function()
{
	document.getElementById("canvas").onclick = function()
	{
		var ctx = this.getContext("2d");
		ctx.fillStyle = "blue";
		ctx.fillRect(100,100,200,200);
	
	}
	
	document.getElementById("test_call_server").onclick = function()
	{
		
		test_call_server();
		
	}
}