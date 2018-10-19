// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}


function breath_of_chaos()
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var im = context.getImageData(0,0,w,h);
	var n=500;
	for(var i=0;i<n;i++)
	{
		var rx = getRandomInt(0, w);
		var ry = getRandomInt(0, h);
		var rgba = getRndColor();
		var ind = ry*w + rx << 2;
		im.data[ind] = rgba[0];
		im.data[ind+1] = rgba[1];
		im.data[ind+2] = rgba[2];
		im.data[ind+3] = rgba[3];
	
	}
	
	canvas.width = w;
	canvas.height = h;
	context = canvas.getContext("2d");
	context.putImageData(im,0,0);

	
}