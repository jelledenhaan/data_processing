/* Jelle den Haan 
 11975458
 d3line.js
 this file creates a grouped barchart and a line chart
 which are linked
 Inspiration for grouped barchart from: https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad
*/

'use strict';


window.onload = function() {
	// load data from 2 json files 
	queue()
	.defer(d3.json, "outputGbar1.json")
	.defer(d3.json, "outputLine2.json")
	.await(init);



	function init(error, outputGbar, outputLine){
		
		if (error) throw error;

		// create grouped barchart and default line chart
		create_bar(outputGbar);
		create_line(outputLine);

		d3.selectAll("#info")
		.on("click", function(){ alert("This page shows indexes for a couple of country's in Europe.\n"
			+"I wanted to look to those indexes and wanted to know the differences between the corresponding country's\n"
			+"In the line chart, the populations growth can be seen. The aim was to search for a relationship\n"
			+"between those indexes and the growth and population numbers of the corresponding country's.\n"
			+"In the end it was hard to find a link between the indexes and the growth of the population.\n"
			+"Personnaly I think it depends more on a bunch of other factors (e.g. Economic status, Geographic position and the form of government\n"
			+"The link between those things and the different indexes is something to investigate the next time!");});

	function create_bar(data_bar){

	
	// variables for svg and parameters of elements
	var svg = d3.select("#barsvg"), 
	margin = {top: 20, right: 20, bottom: 140, left: 40},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom,
    g = svg.append("g")
	    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// variables to scale the axis
	var x0 = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
	    .range([height, 0]);

	// variable for x axis
	var x_axis = d3.svg.axis()
	    .scale(x0)
	    .tickSize(0)
	    .orient("bottom");

	// variable for y axis
	var y_axis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// colors for the barchart
	var color = d3.scale.ordinal()
	    .range(["#708090","#0000CD","#008000"]);


	var country_name = data_bar.map(function(d) { return d.country; });
    var value_size = data_bar[0].values.map(function(d) { return d.sort; });

  	// domains for all the axis
  	x0.domain(country_name);
  	x1.domain(value_size).rangeRoundBands([0, x0.rangeBand()]);
  	y.domain([0, d3.max(data_bar, function(country) { return d3.max(country.values, function(d) { return d.value; }); })]);

	// append x axis to g element
	g.append("g")
	    .attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(x_axis)
      	.selectAll("text")	
            .style("text-anchor", "start")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .on("mouseover", function(d) { d3.select(this).style("cursor", "pointer"); })
            .on("mouseout", function(d){ d3.select(this).style("cursor", "default"); })
            .on("click", function(d) { create_line(outputLine, d);})
            .attr("x", "12")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(65)" 
                });

  	// append y axis to g element
  	g.append("g")
      	.attr("class", "y axis")
      	.style("opacity","0")
      	.call(y_axis)
  	.append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 1)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.style("font-weight","bold")
      	.style("font-size", "12px")
      	.text("Value");

	svg.select(".y").transition().duration(500).delay(1300).style("opacity","1");

	var slice = g.selectAll(".slice")
	    .data(data_bar)
	    .enter().append("g")
	    	.attr("class", "g")
	      	.attr("transform",function(d) { return "translate(" + x0(d.country) + ",0)"; });

	// create tooltip 
	var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);
	
	// append transitions and tooltip
	slice.selectAll("rect")
	    .data(function(d) { return d.values; })
	  	.enter().append("rect")
	    	.attr("width", x1.rangeBand())
	      	.attr("x", function(d) { return x1(d.sort); })
	      	.style("fill", function(d) { return color(d.sort) })
	      	.attr("y", function(d) { return y(0); })
	      	.attr("height", function(d) { return height - y(0); })
	      	.on("mouseover", function(d) {		
	            tooltip.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            tooltip.html(d.sort + ":" + "<br/>" + d.value)
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
	            })					
	        .on("mouseout", function(d) {		
	           	tooltip.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	        });
	        	

	// append the actual bars
	slice.selectAll("rect")
	    .transition()
	    	.delay(function (d) {return Math.random()*1000;})
	      	.duration(1000)
	      	.attr("y", function(d) { return y(d.value); })
	      	.attr("height", function(d) { return height - y(d.value); });

	// variable for legend 
	var legend = svg.selectAll(".legend")
	    .data(data_bar[0].values.map(function(d) { return d.sort; }).reverse())
	  	.enter().append("g")
	    	.attr("class", "legend")
	      	.attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
	      	.style("opacity","0");

	// append rectangles for legend
	legend.append("rect")
	    .attr("x", width - 18)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", function(d) { return color(d); });

	// append text to legend
	legend.append("text")
	    .attr("x", width - 24)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "end")
	    .text(function(d) {return d; });

	// transition for legend
	legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
	
	
	
	};

	function create_line(data_line, d){

		// check wether a specific country is given as input, otherwise show chart of Austria by default
		if (d == undefined) {
			d = "Austria";
			data_line = data_line[d];	

		}
		else { 
			// console.log(data_line[d]);
			d3.selectAll(".graph").remove();
			data_line = data_line[d];
		}

		// variables for parameters of graph
		var svg = d3.select("#linesvg"),
		margin = {top: 40, right: 20, bottom: 50, left: 70},
			width = 1200 - margin.left - margin.right,
			height = 600 - margin.top - margin.bottom,
			g= svg.append("g")
				.attr("class", "graph")
				.attr("transform", 
					"translate(" + margin.left + "," + margin.top + ")");


		// set ranges of axis
		var x = d3.scale.linear().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		// define and create x axis
		var x_axis = d3.svg.axis().scale(x)
			.orient("bottom").ticks(17)
			.tickFormat(function(d){ return d;});

		// define and create y axis
		var y_axis = d3.svg.axis().scale(y)
			.orient("left")
			.ticks(15);

		// create line variable
		var line = d3.svg.line()
			.x(function(d){ return x(d.year); })
			.y(function(d){ return y(d.value); });

		// set the domains of x and y axis  
		x.domain(d3.extent(data_line, function(d) { return d.year } ));
		y.domain([0,d3.max(data_line, function(d) { return 1.25 * d.value } )]);	

		// append line to g element
		g.append("path")
			.attr("class", "line")
			.attr("d", line(data_line));

		// create tooltip 
		var tooltip = d3.select("body").append("div")
    		.attr("class", "tooltip")
    		.style("opacity", 0);
	    


	    // Add dots to line chart to represent the data points, including tooltip 
	    g.selectAll("dot")	
	        .data(data_line)			
	    .enter().append("circle")								
	        .attr("r", 5)		
	        .attr("cx", function(d) { return x(d.year); })		 
	        .attr("cy", function(d) { return y(d.value); })		
	        .on("mouseover", function(d) {		
	            tooltip.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            tooltip.html(d.year + ":" + "<br/>"  + d.value)	
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
	            })					
	        .on("mouseout", function(d) {		
	           	tooltip.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	        });	

		// append x axis to g element
		g.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(x_axis);

		// append text for x axis to g element
		g.append("text")      
	        .attr("x", width/2 )
	        .attr("y",  550 )
	        .style("text-anchor", "middle")
	        .attr("font-size", "16px")
	        .text("Year");
			
	    // append y axis to g element
		g.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(0," + height + ")")
			.attr("transform", "rotate(-0)")
			.call(y_axis);		

		// append text for y axis to g element
		g.append("text")      
	        .attr("x", -250)
	        .attr("y",  25 )
	        .attr("transform", "rotate(-90)")
	        .style("text-anchor", "middle")
	        .attr("font-size", "16px")
	        .text("Population");	

	   // append title of graph, depending on country, to g element
	   	g.append("text")      
	        .attr("x", width/2)
	        .attr("y",  -25 )
	        .style("text-anchor", "middle")
	        .attr("font-size", "16px")
	        .attr("text-decoration", "underline") 
	        .text(d);	


		
	};
};
};