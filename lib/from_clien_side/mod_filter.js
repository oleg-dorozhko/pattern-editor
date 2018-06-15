function whenClickedOnFilter()
{
	if(document.getElementById("filter_div").style.display == "none")
	{
	
	//document.getElementById("scale_div").style.visibility = "hidden";
	document.getElementById("filter_div").style.display = "block"; //or hidden
	document.getElementById("min_red_range").onclick = min_range;
	document.getElementById("max_red_range").onclick = max_range;
	document.getElementById("min_green_range").onclick = min_range;
	document.getElementById("max_green_range").onclick = max_range;
	document.getElementById("min_blue_range").onclick = min_range;
	document.getElementById("max_blue_range").onclick = max_range;
	document.getElementById("min_alpha_range").onclick = min_range;
	document.getElementById("max_alpha_range").onclick = max_range;
	
	setInputFilterValue(document.getElementById("min_alpha_range"), 255);
	
	}
	else
	{
		document.getElementById("filter_div").style.display = "none";
	}
}

function getInputFilterValue(el)
{
	var s = el.id.replace("max_","");
	var s2 = s.replace("_range","");
	var s3 = s2.replace("min_","");
	
	return Number(document.querySelector("input#"+s3).value.trim());
}

function setInputFilterValue(el, val)
{
	var s = el.id.replace("max_","");
	var s2 = s.replace("_range","");
	var s3 = s2.replace("min_","");
	document.querySelector("input#"+s3).value = val;
}


function min_range()
{
	var t = getInputFilterValue(this) - 1;
	if(t==-1) t=0;
	setInputFilterValue(this, t);
}

function max_range()
{
	var t = getInputFilterValue(this) + 1;
	if(t==256) t=255;
	setInputFilterValue(this, t);
	
}

function inc(a,b)
{
	if(b==0) return a;
	
	if(document.getElementById("cyclic").checked)
	{
		if(a == 255) return b;
		if(a+b < 255) return a+b;
		return (a+b)-255;
	}
	else
	{
		if(a+b >  255) return 255;
		return a+b;
	}
	
}

function getStrColorFromRGBAArray(data)
{
	return "rgba("+data[0]+','+data[1]+','+data[2]+','+data[3]+')';
}


function update_colors()
{
	
	var dRed = Number(document.getElementById("red").value);
	var dGreen = Number(document.getElementById("green").value);
	var dBlue = Number(document.getElementById("blue").value);
	var dAlpha = Number(document.getElementById("alpha").value);
	
	var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
	
	var canvasTemp = document.createElement("canvas");
    canvasTemp.width = canvas.width;
	canvasTemp.height = canvas.height;
	var contextTemp = canvasTemp.getContext("2d");
	
	
	for(var j=0;j<canvas.height;j++)
	{
		for(var i=0;i<canvas.width;i++)
		{
		//	var arr = [];
			
		//	var imageData = context.getImageData(i,j,1,1);
		//	arr.push(inc(imageData.data[0],dRed));
		//	arr.push(inc(imageData.data[1],dGreen));
		//	arr.push(inc(imageData.data[2],dBlue));
		//	arr.push(inc(imageData.data[3],dAlpha));
			
			
			contextTemp.fillStyle = "rgba("+dRed+","+dGreen+","+dBlue+","+dAlpha/255+")";
			contextTemp.fillRect(i,j,1,1);
			
		}

	
	}
		
	context.putImageData(contextTemp.getImageData(0,0,canvas.width,canvas.height),0,0);
}

function user_change_r_color()
{
	document.getElementById("red").value = Number(document.getElementById("range_red").value);
}

function user_change_g_color()
{
	document.getElementById("green").value = Number(document.getElementById("range_green").value);
}

function user_change_b_color()
{
	document.getElementById("blue").value = Number(document.getElementById("range_blue").value);
}

function user_change_a_color()
{
	document.getElementById("alpha").value = Number(document.getElementById("range_alpha").value);
}

