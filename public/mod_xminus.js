function xminus()
{

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var img = new Image(canvas.width,canvas.height);
	img.onload = function() {
		
		
		canvas.width = img.width*0.5;
		canvas.height = img.height*0.5;
		ctx.drawImage(img, 0, 0,img.width*0.5,img.height*0.5);
		
	}
	img.src=canvas.toDataURL();

}
