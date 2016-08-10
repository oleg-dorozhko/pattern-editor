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