/* Jelle den Haan 
 11975458
 barchart.js
 this file creates a bar chart using d3 v4
*/
'use strict'; 

document.addEventListener('DOMContentLoaded', function() { 
	
	// variables to set margins, formats and ranges 
	var svg = d3.select("svg");
	var margin = {top: 20, right: 20, bottom: 50, left: 40};
	var width = +svg.attr("width") - margin.left - margin.right;
	var height = +svg.attr("height") - margin.top - margin.bottom;

	var tooltip = d3.select("body").append("div").attr("class", "toolTip");

	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	var y = d3.scaleLinear().rangeRound([height, 0]);

	var g = svg.append("g")
<<<<<<< HEAD
		.attr("transform", "translate(" + margin.left + "," + margin.top + ')'
=======
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
>>>>>>> 5861a914bb4b683480292e293a6e7d5cb6f42e7a
	
	
	// load data from output.json 
	d3.json("output.json", function(error, data) {
		if (error) throw error;

		
		// set x and y domain
		x.domain(data.map(function(d) { return d.station; }));
		y.domain([0, d3.max(data, function(d) { return d.wind; })]);

		
		// append g class for x axis 
		g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));
		// append text to x axis
		g.append("text")
			.attr("y", 460)
			.attr("x", 200)
			.attr("fill", "black")
			.attr("dy", "0.71em")
			.attr("text-anchor", "middle")
			.text("station number");

		// append g classes for y-axis 
		g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(10))
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", -40)
				.attr("x", -225)
				.attr("fill", "black")
				.attr("dy", "0.71em")
				.attr("text-anchor", "middle")
				.text("windspeed (0.1 m / s)");
		
		// append bar chart with right values, dimensions and functions
		// source used for the tooltip: "https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7"
		g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return x(d.station); })
				.attr("y", function(d) { return y(d.wind); })
				.attr("width", x.bandwidth())
				.attr("height", function(d) { return height - y(d.wind); })
				.on("mousemove", function(d){
		            tooltip
		              .style("left", d3.event.pageX - 50 + "px")
		              .style("top", d3.event.pageY - 70 + "px")
		              .style("display", "inline-block")
		              .html("<br>" + ((d.wind) / 10) + "(m/s)");
		        })
		    		.on("mouseout", function(d){ tooltip.style("display", "none");});
	});

});