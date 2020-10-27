/*!
 * Copyright 2020 Zijian Zhang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Configurations on Setup
// const config.cell_size = 2; // The size of a single cell
const collection = All; // The pattern collection to show, two collections are officially provided: All, Official

// Configurations variable (Cound be modified in GUI)
let config = {
	speed: 5, // The log_2 value of how many milliseconds between two updates(LESS is FASTER)
	pattern: 'block', // The default pattern's name, 'Blank' if collection Official and 'block' if collection All
	position: '(0, 0)', // The position of the mouse (Not able to modify)
	pattern_x: 0, // X offset of pattern
	pattern_y: 0, // Y offset of pattern
	clear_map: clear_map, // Clear the map
	paint: paint, // Painter tool
	erase: erase, // Eraser tool
	iterations: 0, // How many iterations since start
	survivals: 0, // How many cells survival
	last_survivals: Array(16).fill(0),
	status: '稳定态', // Active or Steady
	cell_size: 25 // The size of a single cell
}

// Utilities
function create_2D_array(w, h){
	let arr = new Array(w);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(h).fill(0);
	}
	return arr;
}

function place_cell_graph(cell_graph, game_map, x, y){
	for (let i = 0; i < cell_graph.length && y+i < game_map[0].length; i++) {
		for (let j = 0; j < cell_graph[i].length && x+j < game_map.length; j++) {
			game_map[x+j][y+i] = cell_graph[i][j];
		}
	}
}

function clear_map() {
	config.iterations = 0;
	game_map = create_2D_array(Math.ceil(canvas.width / config.cell_size), Math.ceil(canvas.height / config.cell_size));
}

function paint(){
	config.pattern = '_paint';
}

function erase(){
	config.pattern = '_erase';
}

function main(){
	++config.iterations;
	let tmp_map = create_2D_array(game_map.length, game_map[0].length);
	let tmp_survival = 0;
	for (var i = 1; i < game_map.length - 1; i++) {
		for (var j = 1; j < game_map[i].length - 1; j++) {
			if(game_map[i-1][j-1] + game_map[i-1][j] + game_map[i-1][j+1] + game_map[i][j-1] + game_map[i][j+1] + game_map[i+1][j-1] + game_map[i+1][j] + game_map[i+1][j+1] == 3){
				tmp_map[i][j] = 1;
				++tmp_survival;
			}else if(game_map[i-1][j-1] + game_map[i-1][j] + game_map[i-1][j+1] + game_map[i][j-1] + game_map[i][j+1] + game_map[i+1][j-1] + game_map[i+1][j] + game_map[i+1][j+1] <= 1){
				tmp_map[i][j] = 0;
			}else if(game_map[i-1][j-1] + game_map[i-1][j] + game_map[i-1][j+1] + game_map[i][j-1] + game_map[i][j+1] + game_map[i+1][j-1] + game_map[i+1][j] + game_map[i+1][j+1] >= 4){
				tmp_map[i][j] = 0;
			}else{
				tmp_map[i][j] = game_map[i][j];
				tmp_survival += game_map[i][j];
			}
		}
	}
	config.last_survivals.shift();
	config.last_survivals.push(config.survivals);
	config.survivals = tmp_survival;
	let is_steady = true;
	for(let i of config.last_survivals){
		if(config.survivals != i){
			is_steady = false;
		}
	}
	config.status = is_steady ? 'Steady' : 'Active';
	game_map = tmp_map;
}

function draw(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < game_map.length; i++) {
		for (var j = 0; j < game_map[i].length; j++) {
			if(game_map[i][j]){
				ctx.fillStyle = 'black';
				ctx.fillRect(i * config.cell_size, j * config.cell_size, config.cell_size, config.cell_size);
			}
		}
	}
	ctx.fillStyle = 'black';
	preview_ctx.drawImage(canvas, 0, 0);
}

// Canvas and events
let preview = document.querySelector('#preview');
let canvas = document.createElement('canvas');
preview.width = window.innerWidth;
preview.height = window.innerHeight;
canvas.width = preview.width;
canvas.height = preview.height;

// Click to place the pattern
preview.onclick = function(e){
	place_cell_graph(collection[config.pattern], game_map, config.pattern_x, config.pattern_y)
}

preview.onmousemove = function(e){
	if((config.pattern == '_paint' || config.pattern == '_erase') && preview.mouseon)
		place_cell_graph(collection[config.pattern], game_map, config.pattern_x, config.pattern_y); // Dragging mode
	config.pattern_x = Math.floor(e.clientX / config.cell_size);
	config.pattern_y = Math.floor(e.clientY / config.cell_size);
	config.position = '(' + String(config.pattern_x) + ', ' + String(config.pattern_y) + ')';
}

// If painter or eraser selected, dragging mode is on
preview.mouseon = false;

preview.onmousedown = function(e){
	preview.mouseon = true;
}

preview.onmouseup = function(e){
	preview.mouseon = false;
}


let ctx = canvas.getContext('2d', {alpha: false});
let preview_ctx = preview.getContext('2d', {alpha: false});

// Game map and collection
let game_map = create_2D_array(Math.ceil(canvas.width / config.cell_size), Math.ceil(canvas.height / config.cell_size));

// GUI
let gui = new dat.GUI();
let shifts = gui.addFolder('Console');
let echo = gui.addFolder('Dashboard');
shifts.open();
echo.open();

shifts.add(config, 'cell_size', 1, 50).name('Cell Size').onFinishChange(function(value){
	let tmp_map = create_2D_array(Math.ceil(canvas.width / config.cell_size), Math.ceil(canvas.height / config.cell_size));
	for (let i = 0; i < game_map.length && i < tmp_map.length; i++) {
		for (let j = 0; j < game_map[i].length && j < tmp_map[i].length; j++) {
			tmp_map[i][j] = game_map[i][j];
		}
	}
	game_map = tmp_map;
});
shifts.add(config, 'speed', 0, 100).name('Refresh Rate').onFinishChange(function(value){
	if(interval){
		clearInterval(interval);
	}
	if(value){
		interval = setInterval(function(){
			main();
		}, Math.ceil(2 ** (10 - config.speed / 10) - 1));
	}
});
shifts.add(config, 'pattern', Object.keys(collection)).name('Pattern').listen();
shifts.add(config, 'paint').name('Brush');
shifts.add(config, 'erase').name('Eraser');
shifts.add(config, 'clear_map').name('Reset Map');

echo.add(config, 'position').name('Mouse Position').listen();
echo.add(config, 'iterations').name('Iterations').listen();
echo.add(config, 'survivals').name('Cell Count').listen();
echo.add(config, 'status').name('Status').listen();

// Main interval
let interval = setInterval(function(){
	main();
}, Math.ceil(2 ** (10 - config.speed / 10) - 1));

// Animation interval
function animate(){
	draw();
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
