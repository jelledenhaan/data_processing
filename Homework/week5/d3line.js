/* Jelle den Haan 
 11975458
 d3line.js
 this file creates a multiple line graph using d3
 based on: https://bl.ocks.org/mbostock/3884955
*/

"use strict";
var parsetime = d3.timeParse("%m/%d/%Y")

window.onload = function(d) {
    
    d3.json('outputl.json', function(error, data) {
			if (error) throw error;

    // variables to store data
    var data = data;
    var min_temp = [];
	var max_temp = [];
	var average_temp = [];

	// push date to right list
	data.forEach( function(d){
			var date = parsetime(d.date);
			min_temp.push({date: date, temperature: d.min_temp/10})
			max_temp.push({date: date, temperature: d.max_temp/10})
			average_temp.push({date: date, temperature: d.average_temp/10})
			});

	// save data in right form
	var good_data = [{id: "min_temp", values: min_temp}, {id: "average_temp", values: average_temp}, {id: "max_temp", values: max_temp}];

    // parameters for the svg and margins
    var svg = d3.select("svg"),
	margin = {top: 30, bottom: 50, left: 50, right: 50},
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
	// variables to set the x and y axis, and colors for the three graphs
	var x = d3.scaleTime().range([0, width]),
		y = d3.scaleLinear().range([height, 0]),
		z = d3.scaleOrdinal(d3.schemeCategory10);

  	
  	
  	// declare x domain 
  	x.domain(d3.extent(min_temp, function(d) { return d.date; }));
	
	// declare y domain
	y.domain([
    d3.min(min_temp, function(d) { return d.temperature; }),
    d3.max(max_temp, function(d) { return d.temperature; })
  ]);

    // append x axis
    g.append("g")
    	.attr("class", "axis axis--x")
      	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x));

  	// append y axis 
  	g.append("g")
    	.attr("class", "axis axis--y")
      	.call(d3.axisLeft(y))
    .append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", "0.71em")
      	.attr("fill", "#000")
      	.text("Temperature, C"); 	

    z.domain(good_data.map(function(d) { return d.id; }));

  	// variables to draw lines 
  	var line = d3.line()
	    .curve(d3.curveBasis)
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.temperature); });


  	var point= g.selectAll(".point")
    	.data(good_data)
    	.enter().append("g")
    		.attr("class", "point" );

	
    // draw lines 
    point.append("path")
    	.attr("class", "line")
    	.attr("d", function(d) { return line(d.values); })
    	.style("stroke", function(d) { return z(d.id); })
    	.style("fill", "none");	
    	
 // LEGEND DOES NOT WORK SO CODE IS IN COMMENTS
 //    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
	// var legend = g.selectAll(".legend")
 //  				.data(color.domain())
	// 		.enter().append("g")
	// 		    .attr("class", "legend")
	// 		    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	// legend.append("rect")
	// 	.attr("x", width - 17)
	// 	.attr("y", 44)
	// 	.attr("width", 17)
	// 	.attr("height", 17)
	// 	.style("fill", color);

	// legend.append("text")
	// 	.attr("x", width - 24)
	// 	.attr("y", 50)
	// 	.attr("dy", ".35em")
	// 	.style("text-anchor", "end")
	// 	.text(function(d) { return d.id; });

	
	d3.select("#option input")
		.on("click", updateData);



	function updateData() {

    
    // Get the data again
    d3.json("outputs.json", function(error, data) {
    	
    	// variables to store the data
    	var data = data;
	    var min_temp = [];
		var max_temp = [];
		var average_temp = [];
		var parsetime = d3.timeParse("%m/%d/%Y")
	
	// push date to right list
	data.forEach( function(d){
			var date = parsetime(d.date);
			min_temp.push({date: date, temperature: d.min_temp/10})
			max_temp.push({date: date, temperature: d.max_temp/10})
			average_temp.push({date: date, temperature: d.average_temp/10})
			});

	// makes sure the data is saved properly
	var good_data = [{id: "min_temp", values: min_temp}, {id: "average_temp", values: average_temp}, {id: "max_temp", values: max_temp}];
	
	// update x domain
	x.domain(d3.extent(min_temp, function(d) { return d.date; }));
	
	// update y domain 
	y.domain([
    d3.min(min_temp, function(d) { return d.temperature; }),
    d3.max(max_temp, function(d) { return d.temperature; })
  	]);

	z.domain(good_data.map(function(d) { return d.id; }));
    

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    d3.selectAll(".line")
    	.data(good_data);
    
    // update the lines of the graph 
    svg.selectAll(".line")   
        .duration(750)
        .attr("d", function(d) { return line(d.values); });
    
    // change the x axis
    svg.select("axis axis--x") 
        .duration(750)
        .call(x);
    // change the y axis 
    svg.select("axis axis--y") 
        .duration(750)
        .call(y);

    });
	};
	



    
});
};

