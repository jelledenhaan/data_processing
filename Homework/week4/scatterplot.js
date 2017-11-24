/* Jelle den Haan 
 11975458
 svg.js
 this file creates a scatter plot using d3
 coding style based on tutorial which was provided on website.
 source: https://bl.ocks.org/mbostock/3887118
*/

'use strict';


window.onload = function() {

		// variables to set margins 
		var margin = {top: 50, right: 50, bottom: 70, left: 50},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		// scaling the x and y axis
		var x = d3.scale.linear().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		var color = d3.scale.category10();
	
		var x_axis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var y_axis = d3.svg.axis()
			.scale(y)
			.orient("left");

		// append svg to body with right dimensions
		var svg = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// load data form output4.json
		d3.json('output4.json', function(error, data) {
			if (error) throw error;

			data.forEach( function(d) {
				d.happy = +d.happy;
				d.population = +d.population;
				d.gdp = +d.gdp;
			});

			// set x and y domain
			x.domain(d3.extent(data, function(d) { return d.happy; })).nice();
			y.domain(d3.extent(data, function(d) { return d.gdp; })).nice();
			
			// append g class for x axis and append text
			svg.append('g')
				.attr('class', 'x axis')
		        .attr('transform', 'translate(0,' + height + ')')
		        .call(x_axis)
		    .append('text')
		        .attr('class', 'label')
		    	.attr('x', width)
		     	.attr('y', -6)
		     	.style('text-anchor', 'end')
		      	.text('Happy Index');

		    // append g class for y axis and append text
		    svg.append('g')
		    	.attr('class', 'y axis')
		    	.call(y_axis)
		    .append('text')
		    	.attr('class', 'label')
		    	.attr('transform', 'rotate(-90)')
		    	.attr('y', 6)
		    	.attr("x", -50)
		    	.attr('dy', '.71em')
		    	.style('text-anchor', 'end')
		    	.text('GDP per Capita (US dollars)')

		    // create tooltip 
		    var tooltip = d3.select("body").append("div")
    			.attr("class", "tooltip")
    			.style("opacity", 0);

			// plot circles in scatterplot with right dimensions
			svg.selectAll(".dot")
				.data(data)
			.enter().append("circle")
			    .attr("class", "dot")
			    .attr("r", function(d) { return Math.sqrt(d.population / 10000000);})
			    .attr("cx", function(d) { return x(d.happy); })
		      	.attr("cy", function(d) { return y(d.gdp); })
		      	.style("fill", function(d) { return color(d.continent); })
		      	.on("mouseover", function(d) {
		        	tooltip.transition()
		            	.duration(200)
		            	.style("opacity", .9)
		            tooltip.html(d.country)
		            	.style("left", (d3.event.pageX + 5) + "px")
		            	.style("top", (d3.event.pageY - 28) + "px");
				})
				.on("mouseout", function(d) {
				    tooltip.transition()
		            	.duration(500)
		            	.style("opacity", 0);
				});	 	
										
			// append legend to svg 
			var legend = svg.selectAll(".legend")
      				.data(color.domain())
    			.enter().append("g")
				    .attr("class", "legend")
				    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  			legend.append("rect")
      			.attr("x", width - 17)
      			.attr("y", 44)
      			.attr("width", 17)
      			.attr("height", 17)
      			.style("fill", color);

  			legend.append("text")
      			.attr("x", width - 24)
      			.attr("y", 50)
      			.attr("dy", ".35em")
      			.style("text-anchor", "end")
      			.text(function(d) { return d; });		

		});	

	};