" use strict" ;
const padding = 50;
var data_list = [];
var temp_list = [];
document.addEventListener('DOMContentLoaded', function() { 
	var data = (document.getElementById("rawdata"));
	// console.log(data.value);
	

	var row = data.value.split("\n");
	//date = data.split(",");
	//console.log(row);
	for (i= 0; i < row.length - 1; i++){
		var date = row[i].split(",");
		var year = date[0].substr(2 , 4);
		var month = date[0].substr(6 , 2);
		var day = date[0].substr(8 , 2);
		var goededatum = new Date(year, month, day);
		
		data_list.push(goededatum);
		temp_list.push(parseInt(date[1]));
		
	}
	temp_list.min = function( temp_list ){
    return Math.min.apply( Math, temp_list );
	};

	temp_list.max = function( temp_list ){
    return Math.max.apply( Math, temp_list );
	};

	var minMax = [temp_list.min(temp_list), temp_list.max(temp_list)];
	
	// console.log(minimum);
	// console.log(maximum);

	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext('2d');

	canvas.height = 500;
	canvas.width = 700
	ctx.beginPath();
	ctx.moveTo(padding, 0);
	ctx.lineTo(padding, canvas.height - padding);
	ctx.lineTo(canvas.width, canvas.height - padding);
	ctx.stroke();


	// var createTransform()
	
	
	var y_axis = createTransform(minMax, [canvas.height - padding, 0])
	var x_axis = createTransform([0 ,temp_list.length], [padding, canvas.width])

	ctx.beginPath();
	// DIT NOG OPLOSSEN DAT DIE OP DE GOEDE PLEK BEGINT
	ctx.moveTo(padding, y_axis(temp_list[0]));
	console.log(temp_list);
	// loop 
	for ( var i = 1; i < temp_list.length; i++){
		var xPoint = x_axis(i);
		var yPoint = y_axis(temp_list[i]);
		ctx.lineTo(xPoint, yPoint);

	}
	ctx.stroke();
	

})





function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 		// a solution would be:

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

