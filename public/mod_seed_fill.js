//for seed filling
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

function whenSomeSeedSelected(ev)
{
	var sim_el = ev.target;
			
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