var gridDimensions = [30,20,4];

window.onload = function() {
	$('#terrain .box').on('click', function() {
		gradient.counter = 0;
		gradient.setPoint(event);
	});
}

var Map = function() {
    this.initialize = function() {
        var data = '';

        for(y = 0; y < gridDimensions[1]; y++) {
            for(x = 0; x < gridDimensions[0]; x++) {
                data = data + '<div id="' + x + ',' + y + '" class="box"></div>';
            }
        }
        document.getElementById('terrain').innerHTML = data;
        data = '';
    }
}

// Idea: Create a class that can be called to create a gradient map that decays across grid squares

// Process:
	// 1. Determine the initial cell targeted by the mouse
	// 2. Determine the adjacent cell positions and store them
	// 3. Iterate over the adjacent cells and give them an opacity that will decrement
	// 4. Repeat steps 2 & 3 as many times as necessary

var Gradient = function() {
	this.heatMap = [], this.position = [0,0];
	this.maxIntensity = 1.0, this.intensityDecrement = 0.40;
	this.counter = 1, this.posX = 0, this.posY = 0;

	this.setPoint = function(event) {
		this.posX = parseInt(event.target.id.split(',')[0]);
		this.posY = parseInt(event.target.id.split(',')[1]);

		this.position = [this.posX, this.posY];
		//console.log('setPoint called');

		document.getElementById(event.target.id).style.backgroundColor = 'rgba(255,0,0,' + this.maxIntensity + ')';
		this.getAdjacentCells();
	}

	this.getAdjacentCells = function() {
		//console.log('getAdjacentCells called');

		for(x = -1; x <= 1; x++) {
			for(y = -1; y <= 1; y++) {
				//console.log((this.posX + x) + ',' + (this.posY + y));
				if(Math.abs(x) != Math.abs(y) && (this.posX + x) < gridDimensions[0] && (this.posX + x) >= 0 && (this.posY + y) < gridDimensions[1] && (this.posY + y) >= 0) {
					console.log(x + ',' + y);
				}
			}
		}
		//console.log('Exited loop');
	}

	this.colorHeatMap = function() {

	}
}










// GARBAGE?
//console.log(currentPosition[0]);
//console.log(currentPosition[1]);
//var currentX = parseInt(currentPosition[0]);
//var currentY = parseInt(currentPosition[1]);
//
//for(x = -1; x <= 1; x++) {
//	for(y = -1; y <= 1; y++) {
//		if(Math.abs(x) != Math.abs(y) && currentX + x >= 0 && currentY + y >= 0 && currentX + x < 30 && currentY + y < 20) {
//			//console.log(x + ',' + y);
//			if(intensity-intensityDecrement > 0) {
//				heatMap[counter] = [[currentX + x, currentY + y],intensity-intensityDecrement];
//
//				//console.log(heatMap[counter]);
//
//				getCells([currentX + x, currentY + y],intensity-intensityDecrement);
//
//				counter++;
//			}
//		}
//	}
//}
//
//console.log(heatMap);
//
//colorHeatMap();

//for(x = 0; x < heatMap.length; x++) {
//	//console.log(heatMap[x][0][0] + ',' + heatMap[x][0][1]);
//	//console.log(heatMap[x][1][0]);
//
//	document.getElementById(heatMap[x][0][0] + ',' + heatMap[x][0][1]).style.backgroundColor = 'rgba(255,0,0,' + heatMap[x][1][0] + ')';
//}
