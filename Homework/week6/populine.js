'use strict';


window.onload = function() {
	queue()
	.defer(d3.json, 'outputGbar.json')
	.defer(d3.json, 'outputLine.json')
	.await(create_bar);

	function create_bar(error, outputGbar, outputLine){
		if (error) throw error;


		
	};

};	