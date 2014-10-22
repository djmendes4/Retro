window.onload = function() {
	document.getElementById('tiles').addEventListener('click',function() {
		//console.log(event.target.id.split('tile_')[1]);
		
		setTile(event.target.id.split('tile_')[1]);
	});
}

/* GLOBAL VARIABLES */
var activeTile = 0;

/* FUNCTIONS */
var setTile = function(tileID) {
	$(document.getElementById('tile_' + activeTile)).removeClass('highlight');
	
	activeTile = tileID || activeTile;
	//console.log(activeTile);

	$(document.getElementById(event.target.id)).addClass('highlight');
}
							  
var Initialize = function() {
	this.globalX = 20;
	this.globalY = 30;
	this.globalZ = 1;
	
	this.createGrid = function() {
		this.gridDefinition = '';
		
		for(x = 0; x < this.globalX; x++) {
			for(y = 0; y < this.globalY; y++) {
				for(z = 0; z < this.globalZ; z++) {
					this.gridDefinition += '<div id="' + x + ',' + y + ',' + z + '"></div>';
				}
			}
		}
		//console.log(this.grid);
		document.getElementById('terrain').innerHTML = this.gridDefinition;
	}
	
	this.createTileset = function() {
		this.tilesetDefinition = '';
		
		for(x = 0; x < 70; x++) {
			this.tilesetDefinition += '<div id="tile_' + x + '" class="tilesetTile"></div>';
		}
		document.getElementById('tiles').innerHTML = this.tilesetDefinition;
	}
}