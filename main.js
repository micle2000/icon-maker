
var canvas = document.querySelector('#maincanvas');
var iconSize = 16;
var pixelSize = 10;
canvas.width = iconSize;
canvas.height = iconSize;
canvas.style.width = iconSize*pixelSize + "px";
canvas.style.height = iconSize*pixelSize + "px";

var grid = document.querySelector('#gridcanvas');
grid.width = iconSize*pixelSize;
grid.height = iconSize*pixelSize;
grid.style.width = iconSize*pixelSize + "px";
grid.style.height = iconSize*pixelSize + "px";

var ctx = canvas.getContext('2d');
var imgData = ctx.getImageData(0,0,iconSize,iconSize);
var data = imgData.data;
var img = {};
ctx.imageSmoothingEnabled = false;

var pairs = [];
for(var pairx = 0; pairx < iconSize; pairx++)
	for(var pairy = 0; pairy < iconSize; pairy++)
		pairs.push([pairx,pairy]);
pairs.forEach(function(p){
	var x = p[0]; var y = p[1];
	if(!img[x]) {
		var xobj = {};
		img[x] = xobj;
	}
	xobj = img[x];
	Object.defineProperty(xobj, y, {
		set: function (col){
			for(var z = 0; z < 4; z++)
				data[(y*iconSize + x)*4 + z] = col[z];
			ctx.putImageData(imgData,0,0);
			style_display.innerHTML = img.toDataURL();
		},
		get: function (){
			var col = [];
			for(var z = 0; z < 4; z++)
				col[z] = data[(y*iconSize + x)*4 + z];
			return col;
		},
	});
});

img.clear = function clearCanvas() {
	for(var i = 0; i < data.length; i ++){
		data[i] = 0;
	}
}
img.clear();

img.toDataURL = function (){
	return "background-image: url("+canvas.toDataURL("image/png")+");";
};

var drawing = null;
var moved = false;
canvas.addEventListener('mousedown', function (e){
	var x = Math.floor((e.offsetX - this.offsetLeft)/pixelSize);
	var y = Math.floor((e.offsetY - this.offsetTop)/pixelSize);
	console.log(x,y);

	var col = img[x][y];
	if(col[3] == 0) drawing = [0,0,0,255];
	else            drawing = [0,0,0,0];
	moved = false;
});
canvas.addEventListener('mousemove', function (e){
	var x = Math.floor((e.offsetX - this.offsetLeft)/pixelSize);
	var y = Math.floor((e.offsetY - this.offsetTop)/pixelSize);
	if(drawing) draw(x,y,drawing);
	moved = true;
});
canvas.addEventListener('mouseup', function (e){
	var x = Math.floor((e.offsetX - this.offsetLeft)/pixelSize);
	var y = Math.floor((e.offsetY - this.offsetTop)/pixelSize);
	if(!moved) draw(x,y,drawing); // click
	drawing = false;
});
function draw(x,y,col){
	if(x < 0 || x >= iconSize || y < 0 || y >= iconSize) return;
	img[x][y] = col;
}

function drawGrid(){
	var c = grid.getContext('2d');
	c.clearRect(0,0,grid.width,grid.height);
	c.beginPath();
	for (var i = 0.25; i < 1; i += 0.25){
		c.moveTo(grid.width*i,0);
		c.lineTo(grid.width*i,grid.height);
		c.moveTo(0,grid.height*i);
		c.lineTo(grid.width,grid.height*i);
	}
	c.stroke();

}
drawGrid();
var gridButton = document.querySelector("#gridbutton");
gridButton.addEventListener('click', function (){
	if(!grid.style.display)
		grid.style.display = "none";
	else
		grid.style.display = "";
});
