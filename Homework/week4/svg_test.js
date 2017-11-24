d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    	document.body.appendChild(xml.documentElement);  

    var data =  ["#ccece6","#99d8c9","#66c2a4","#41ae76"]
    var text = ["1", "2", "3", "4"]
	

	d3.select("svg")
		.append("rect")
			.attr("id", "kleur4")
			.attr("x", "13")
			.attr("y", "138.7")
			.attr("class", "st1")
			.attr("width", "21")
			.attr("height", "29")

	d3.selectAll(".st1")
		.data(data)
			.style("fill", function(d,i){ return d; })

	d3.select("svg")
		.append("text")
			.attr("x", "100")
			.attr("y", "35")
			.attr("height", "28")
			.attr("width", "119.1")
			.style('text-anchor', 'end')
			.text("1")

	d3.select("svg")
		.append("text")
			.attr("x", "100")
			.attr("y", "80")
			.attr("height", "28")
			.attr("width", "119.1")
			.style('text-anchor', 'end')
			.text("2")
	
	d3.select("svg")
		.append("text")
			.attr("x", "100")
			.attr("y", "120")
			.attr("height", "28")
			.attr("width", "119.1")
			.style('text-anchor', 'end')
			.text("3")	

	d3.select("svg")
		.append("text")
			.attr("x", "100")
			.attr("y", "160")
			.attr("height", "28")
			.attr("width", "119.1")
			.style('text-anchor', 'end')
			.text("4")						


});





