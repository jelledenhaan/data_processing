" use strict" ;

// variables and constants
const padding = 50;
var data_list = [];
var temp_list = [];
var month_list = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const height = 500;
const width = 700;

document.addEventListener('DOMContentLoaded', function() { 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

    	var data = this.responseText; 
    	// console.log(data);
    	// console.log(typeof(data));
	    // splits raw data line by line and append the right data in the right list
		var row = data.split("\n");
		for (i= 0; i < row.length - 1; i++){
			var date = row[i].split(",");
			var year = date[0].substr(0 , 4);
			var month = date[0].substr(4 , 2);
			var day = date[0].substr(6 , 2);
			var right_date = new Date(year, month, day);
			
			data_list.push(right_date);
			temp_list.push(parseInt(date[1]));
			
		}
		
		// calculates minimum temperature from temp_list
		temp_list.min = function( temp_list ){
	    return Math.min.apply( Math, temp_list );
		};
		// calculates minimum temperature from temp_list
		temp_list.max = function( temp_list ){
	    return Math.max.apply( Math, temp_list );
		};

		// list to define boundaries of graph on canvas
		var min_max = [temp_list.min(temp_list) - 15, temp_list.max(temp_list) + 15];

		// create canvas and define its height and width
		var canvas = document.getElementById("mycanvas");
		var ctx = canvas.getContext('2d');
		canvas.height = height;
		canvas.width = width;
		
		// create the the x- and y-axis
		ctx.beginPath();
		ctx.moveTo(padding, 0);
		ctx.lineTo(padding, canvas.height - padding);
		ctx.lineTo(canvas.width, canvas.height - padding);
		ctx.stroke();
		
		// define transformation in order to draw datapoints on canvas
		var y_axis = createTransform(min_max, [canvas.height - padding, 0])
		var x_axis = createTransform([0 ,temp_list.length], [padding, canvas.width])

		ctx.beginPath();
		ctx.moveTo(padding, y_axis(temp_list[0]));
		
		// draw lines from data point to data point 
		for ( var i = 1; i < temp_list.length; i++){
			var xPoint = x_axis(i);
			var yPoint = y_axis(temp_list[i]);
			ctx.lineTo(xPoint, yPoint);

		}
		ctx.stroke();

		// scales the y-axis and adds the right numbers
		for ( var i = 0; i < canvas.height; i += 20){
			ctx.moveTo(padding, y_axis(i));
			ctx.lineTo(padding - 5, y_axis(i));
			ctx.fillText((i / 10), 30, y_axis(i), padding);
			ctx.stroke();	
		}
		//
		for ( var i = 0; i > min_max[0]; i -= 20){
			ctx.moveTo(padding, y_axis(i));
			ctx.lineTo(padding - 5, y_axis(i));
			ctx.fillText((i / 10), 30, y_axis(i), padding);
			ctx.stroke();
				
		}
		ctx.moveTo(padding, canvas.height - padding);
		
		// variables
		var month_counter = 0;
		var month = 1000;

		// iterates over datalist and scales the x-axis and adds months if needed
		for ( var i = 1; i < data_list.length; i++){
		
			if (month != data_list[i].getMonth()){
				month = data_list[i].getMonth();
				ctx.moveTo(x_axis(i), canvas.height - padding);
				ctx.lineTo(x_axis(i), (canvas.height - padding + 5));
				ctx.font = '12px serif';
				ctx.fillText(month_list[month_counter], x_axis(i) + 15, canvas.height - 25);
				month_counter ++;
			}
			ctx.stroke();
		}
		// gives title to x-axis
		ctx.font = '18px serif';
		ctx.textAlign = "left";
		ctx.fillText("Date (months)", 350, canvas.height - 5);

		// gives title to y-axis 
		ctx.save();
		ctx.rotate(-Math.PI/2);
		ctx.font = '18px serif';
		ctx.textAlign = "right";
		ctx.fillText("Temperature (\xB0C)",padding - 175,25 );
		ctx.restore()

	        }
	};
	xhttp.open("GET", "data.txt", true);
	xhttp.send();

})

function createTransform(domain, range){
	var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

