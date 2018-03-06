console.log('mod gcombo on');
var PNG = require('pngjs').PNG;
module.exports.__gcombo = __gcombo;


function getRandomInt(min, max) 
{
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

function includesColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) && (colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) && (colors[i][3]== color[3])
					
		) 
			{
				return true;
			}
	}
	return false;
}
	
function setPoint(im0, w, i,j,x,y,color)
{
	var idx = w * (j+y) + (i+x) << 2;
	
	im0.data[idx] = color[0];
	im0.data[idx+1] = color[1];
	im0.data[idx+2] = color[2];
	im0.data[idx+3] = color[3];
	
	return im0;
}
	
	
function __gcombo(im)
{
	var randoms = [];
	while(true)
	{
		var rgba = getRndColor();
		if(includesColor(randoms,rgba)==false)
		{
			randoms.push(rgba);
			if(randoms.length==3) break;
		}
	}
	
	var w = im.width;
	var h = im.height;
	var i = getRandomInt(2, w-2);
	var j = getRandomInt(2, h-2);
	 
	var x = 0;
	var y = 0;
	var ind = 0;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 0;
	y = 2;
	ind = 0;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 2;
	y = 0;
	ind = 0;	
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 2;
	y = 2;
	ind = 0;	
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 1;
	y = 0;
	ind = 1;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 0;
	y = 1;
	ind = 1;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 2;
	y = 1;
	ind = 1;

	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 1;
	y = 2;
	ind = 1;	
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 1;
	y = 1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	-1;
	y= 1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	3;
	y= 1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	1;
	y= -1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	1;
	y= 3;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	console.log(randoms);
	
	return im;
}