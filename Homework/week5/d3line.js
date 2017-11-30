"use strict";
var parsetime = d3.timeParse("%m/%d/%Y")

window.onload = function(data) {

	var Leeuwarden = "outputl.json";
	var Schiphol = "outputs.json";

	d3.queue()
		.defer(d3.json, Leeuwarden)
		.defer(d3.json, Schiphol)
		.await(load_data);	
}; 

function load_data(error, dataL, dataS) {
   		if (error) throw error;
    
    var data = dataL;

    var min_temp = [];
	var max_temp = [];
	var average_temp = [];

	data.forEach( function(d){
			var date = parsetime(d.date);
			min_temp.push({date: date, temperature: d.min_temp/10})
			max_temp.push({date: date, temperature: d.max_temp/10})
			average_temp.push({date: date, temperature: d.average_temp/10})
			});

	var good_data = [{id: "min_temp", values: min_temp}, {id: "average_temp", values: average_temp}, {id: "max_temp", values: max_temp}];

    var svg = d3.select("svg"),
	margin = {top: 30, bottom: 50, left: 50, right: 50},
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
	var x = d3.scaleTime().range([0, width]),
		y = d3.scaleLinear().range([height, 0]),
		z = d3.scaleOrdinal(d3.schemeCategory10);

  	console.log(good_data);
  	x.domain(d3.extent(min_temp, function(d) { return d.date; }));
	

	y.domain([
    d3.min(min_temp, function(d) { return d.temperature; }),
    d3.max(max_temp, function(d) { return d.temperature; })
  ]);

    g.append("g")
    	.attr("class", "axis axis--x")
      	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x));

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

  	var line = d3.line()
	    .curve(d3.curveBasis)
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.temperature); });


  	var point= g.selectAll(".point")
    	.data(good_data)
    	.enter().append("g")
    		.attr("class", "point" );

	
    point.append("path")
    	.attr("class", "line")
    	.attr("d", function(d) { return line(d.values); })
    	.style("stroke", function(d) { return z(d.id); })
    	.style("fill", "none");	


	


};