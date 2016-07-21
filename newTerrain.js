

var debug = document.getElementById("debug");

var newTerrain = new NewTerrain();

function NewTerrain(){

	var renderer = new Renderer('renderCanvas');
	var canvasContainer = document.getElementById("canvasContainer");
	var canvas = document.getElementById("renderCanvas");

	var width = 512;
	var height = 512;
	
	function scale(){

		var pxRatio = window.devicePixelRatio || 1;
		
		canvas.width = ~~(canvasContainer.clientWidth * pxRatio);
		canvas.height = ~~(canvasContainer.clientHeight * pxRatio);
			
	}

	window.onresize = scale;

	scale();

	var probability = 0.25;
	var continentCount = 8;

	if(window.location.search.substring(1)){
		probability = parseFloat(window.location.search.substring(1));
	}

	var args = window.location.search;
	if(args){
		var probArg = args.split("prob=")[1];
		if(probArg){
			probability = parseFloat(probArg.split("&")[0]);
		}
		var cArg = args.split("c=")[1];
		if(cArg){
			continentCount = parseInt(cArg.split("&")[0]);
			if(continentCount > width*height){
				console.error("Continent count must be below "+width*height);
				continentCount = 8;
			}
		}
	}


	var cells = new Uint8Array(height * width);

	var continents = [];

	var free = cells.length;

	for(var i = 0; i < continentCount; i++){
		continents[i] = ~~(i*(255)/continentCount+1)
	}
	
	for(var i = 0; i < continentCount; i++){
		var point = 0;
		do{
			point = ~~(Math.random()*cells.length);
		} while(cells[point] != 0);
		
		cells[point] = continents[i];
		free--;
	}

	var newCells = new Uint8Array(cells.length);

	while(free > 0){

		newCells.set(cells);

		for(var i = 0; i < cells.length; i++){
			
			if(free <= 0){
				break;
			}
			
			if(cells[i] != 0){
				var y = ~~(i / height) * width;
				var x = ~~(i % height);
				var c;
				
				if(Math.random() < probability){
					c = y + ((x+1)%width);
					if(newCells[c] == 0){
						newCells[c] = cells[i];
						free--;
					}
				}

				if(Math.random() < probability){
					c = y + ((x-1+width)%width);
					if(newCells[c] == 0){
						newCells[c] = cells[i];
						free--;
					}
				}

				if(Math.random() < probability){
					c = (y+width)%cells.length + x;
					if(newCells[c] == 0){
						newCells[c] = cells[i];
						free--;
					}
				}

				if(Math.random() < probability){
					c = (y-width+cells.length)%cells.length + x;
					if(newCells[c] == 0){
						newCells[c] = cells[i];
						free--;
					}
				}
			}
		}

		cells.set(newCells);
		renderer.render(cells);

	}

	renderer.render(cells);

}













