console.log('mod join colors on');
var PNG = require('pngjs').PNG;
//var mod_mirror = require('./mod_mirror');
//var mod_median = require('./mod_median');
module.exports.joinColorsForImageData = joinColorsForImageData;

var global_m=0;

function get_arrays_of_colors(im0)
{
	var w = im0.width;
	var h = im0.height;
	
			var obj = {};
			var arr = [[],[],[],[],[],[],[]];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						//arr.push(col); 
						obj[key]= {cnt:1,arr:col};
						
						var m = get_kategory_index(col);
					//	console.log ( "m="+m);
					//	console.log ( "col="+col);
						arr[m].push(col);
						
						
						
					
					}
					else
					{
						var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			for(var i=0;i<7;i++)
			{
				global_m=i;
				arr[i]= SelectionSort(arr[i], i, compare) ;
				//arr[i].sort();
			}
			
			return arr;
}

function SelectionSort(A, m,  __compare)       // A - массив, который нужно
{                               // отсортировать по возрастанию.
    var n = A.length;
    for (var i = 0; i < n-1; i++)
     { var min = i;
       for (var j = i+1; j < n; j++)
        { if (__compare(A[j],A[min],m)<0) min = j; } 
       var t = A[min]; A[min] = A[ i ]; A[ i ] = t;
     }                    
    return A;    // На выходе сортированный по возрастанию массив A.
}

function global_m_compare(f,s)
{
	
	if(global_m==0) return cmp(f[0],f[1],f[2],s[0],s[1],s[2]);
	if(global_m==1) return cmp(f[0],f[2],f[1],s[0],s[2],s[1]);
	if(global_m==2) return cmp(f[1],f[0],f[2],s[1],s[0],s[2]);
	if(global_m==3) return cmp(f[1],f[2],f[0],s[1],s[2],s[0]);
	if(global_m==4) return cmp(f[2],f[0],f[1],s[2],s[0],s[1]);
	if(global_m==5) return cmp(f[2],f[1],f[0],s[2],s[1],s[0]);
	return cmp(f[0],f[1],f[2],s[0],s[1],s[2]);
}

function compare(f,s,m)
{
	if(m==0) return cmp(f[0],f[1],f[2],s[0],s[1],s[2]);
	if(m==1) return cmp(f[0],f[2],f[1],s[0],s[2],s[1]);
	if(m==2) return cmp(f[1],f[0],f[2],s[1],s[0],s[2]);
	if(m==3) return cmp(f[1],f[2],f[0],s[1],s[2],s[0]);
	if(m==5) return cmp(f[2],f[1],f[0],s[2],s[1],s[0]);
	return cmp(f[0],f[1],f[2],s[0],s[1],s[2]);
}

function cmp(f,s,t,f2,s2,t2)
{
	if(f>f2) return 1;
	if(f<f2) return -1;
	if(s>s2) return 1;
	if(s<s2) return -1;
	if(t>t2) return 1;
	if(t<t2) return -1;
	return 0;
}

function get_kategory_index(rgb)
{
	//console.log ( "rgb="+rgb);
	if((rgb[0]>rgb[1])&&(rgb[0]>rgb[2]))
	{
		if(rgb[1]>rgb[2])return 0;
		return 1;
	}
	
	if((rgb[1]>rgb[0])&&(rgb[1]>rgb[2]))
	{
		if(rgb[0]>rgb[2])return 2;
		return 3;
	}
	
	if((rgb[2]>rgb[0])&&(rgb[2]>rgb[0]))
	{
		if(rgb[0]>rgb[1])return 4;
		return 5;
	}
	
	return 6;
}

function joinColorsForImageData(im)
{
	var w = im.width;
	var h = im.height;
	
	var arr = get_arrays_of_colors(im);
	/* var rgb_arr = arr[0];
	var rbg_arr = arr[1];
	var grb_arr = arr[2];
	var gbr_arr = arr[3];
	var brg_arr = arr[4];
	var bgr_arr = arr[5]; */
	
	//console.log ( "c-----------------------------------olors.length="+colors.length);
	/*
	var rgb_arr2 = JSON.parse(JSON.stringify(rgb_arr));
	var rbg_arr2 = JSON.parse(JSON.stringify(rbg_arr));
	var grb_arr2 = JSON.parse(JSON.stringify(grb_arr));
	var gbr_arr2 = JSON.parse(JSON.stringify(gbr_arr));
	var brg_arr2 = JSON.parse(JSON.stringify(brg_arr));
	var bgr_arr2 = JSON.parse(JSON.stringify(bgr_arr));
	*/
	
	var arr2 = JSON.parse(JSON.stringify(arr));
	for(var i=0;i<7;i++)
	{
		console.log ('\n\n' +arr2[i]);
		/*
		for(var n=0;n<arr[i].length;n++)
		{
			var m=/2|0;
			arr2[i].splice(m+1);
		}
		*/
	}
	/*
	for(var i=0;i<6;i++)
	{
		var m=arr[i].length/2|0;
		arr2[i].splice(m+1);
	}
	
	/*/
	
	//console.log ( "colors.length="+colors.length);
	//return im;
	//var jj = obj.keys();
	//obj[jj[jj.length-1]]=undefined;
	
			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
					
						
						var idx = (w * y + x) << 2;
						
						var m = get_kategory_index(	[im.data[idx], im.data[idx+1], im.data[idx+2]] );
						
				//		console.log ( "m="+m);
				//		console.log ( "arr2[m]="+arr2[m]);
						var ind = get_index_of_color (arr2[m], im, idx);
				//		console.log ( "ind="+ind);
						//ind = ind/2|0;
						
						
						var new_idx = idx;
						
						var nc =  arr2[m][ind];
						
					//	console.log ( "nc="+nc+", x="+x+" y="+y);
						
						im.data[new_idx] =  nc[0];
						im.data[new_idx+1] =  nc[1]; //cyclic_random_plus ( im0.data[idx+1], g );
						im.data[new_idx+2] =  nc[2];  //cyclic_random_plus ( im0.data[idx+2], b );
						im.data[new_idx+3] =   nc[3];  //cyclic_random_plus ( im0.data[idx+3], a );
						
						
						
						
				}
			}
		return im;
	
}

function get_index_of_color (colors, im0, idx)
{
	//console.log ( "in get_index_of_color colors.length="+colors.length);
	for (var i = 0; i < colors.length; i++) 
	{
		//console.log ( "colors["+i+"][0]="+colors[i][0]); //", x="+x+" y="+y);
		//console.log ( "im0.data["+idx+"][0]="+im0.data[idx]);
		if (
		
		im0.data[idx] == colors[i][0] &&
		im0.data[idx+1] == colors[i][1] &&
		im0.data[idx+2] == colors[i][2] 
		
		// &&	im0.data[idx+3] == colors[i][3]
		) 
		{
			//console.log ( "out from get_index_of_color #1");
			return i;
			
		}
		
	}
	//console.log ( "out from get_index_of_color #2");
	return null;
	
}

