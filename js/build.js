window.addEventListener("keydown", determineKey);

function determineKey(event) {
    if (event.keyCode == "37") {
        paintLeft();
    }
    if (event.keyCode == "38") {
        paintUp();
    }
    if (event.keyCode == "39") {
        paintRight();
    }
    if (event.keyCode == "40") {
        paintDown();
    }
}

window.onload = function() {
    $("#container").mousedown(function() {
        paintByDrag.start();
    });
    $("#container").mouseover(function() {
        paintByDrag.move();
    });
    $("#container").mouseup(function() {
        paintByDrag.end();
    });
    $("#container").mouseleave(function() {
        paintByDrag.clear();
    });
    $('#changelogOptions .toggle.left').click(function() {
		$('#changelogOptions').removeClass('translate');
		$('#changelogOptions .toggle.right').removeClass('hidden');
        $('#changelogOptions .toggle.right').removeClass('scroll');
	});
	$('#changelogOptions .toggle.right').click(function() {
		$('#changelogOptions').addClass('translate');
        $('#changelogOptions .toggle.right').addClass('hidden');
	});
    $('.terrain.img.grid').mouseenter(function(event) {
        if (prerender.checked) {
            var tempId = event.target.id.split(",");
            $(document.getElementById(tempId[0] + "," + tempId[1] + "," + layerNumber)).removeClass("x" + terrain[tempId[0]][tempId[1]][layerNumber][0] + " y" + terrain[tempId[0]][tempId[1]][layerNumber][1]);
            $(document.getElementById(tempId[0] + "," + tempId[1] + "," + layerNumber)).addClass("temp x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
        }
        previewLayers(tempId[0],tempId[1]);
    });
    $('.terrain.img.grid').mouseout(function(event) {
        if (prerender.checked) {
            var tempId = event.target.id.split(",");
            $(document.getElementById(tempId[0] + "," + tempId[1] + "," + layerNumber)).removeClass("temp x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
            $(document.getElementById(tempId[0] + "," + tempId[1] + "," + layerNumber)).addClass("x" + terrain[tempId[0]][tempId[1]][layerNumber][0] + " y" + terrain[tempId[0]][tempId[1]][layerNumber][1]);
        }
    });
};

function mapInitialization() {
    var data = '';

    for(z = 0; z < 4; z++) {
        for(y = 0; y < localY; y++) {
            for(x = 0; x < localX; x++) {
                data = data + '<div id="' + x + ',' + y + ',' + z + '" class="" onClick="paint();"></div>';
            }
        }
        document.getElementById('layer' + z).innerHTML = data;
    }
}

var Map = function() {
    var temp = [];
    var terrain = [];

    var loadMap = function(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, false);
        xhr.onload = function(e) {
            if(this.status == 200) {
                var data = (this.response);
                callback(data);
            } else {
                console.log("error");
            }
        }
        xhr.onerror = function() {
            console.log("error");
        }
        xhr.ontimeout = function() {
            console.log("timeout");
        }
        xhr.send();
    }

    var parseMap = function(data) {
        var zData = data.replace(/(\r\n|\n|\r)/gm,"").split("|");
        for(z = 0; z < zData.length; z++) {
            temp[z] = [];
            var yData = zData[z].split(":");
            for(y = 0; y < yData.length; y++) {
                temp[z][y] = [];
                var xData = yData[y].split("+");
                for(x = 0; x < xData.length; x++) {
                    temp[z][y][x] = xData[x];
                }
            }
        }

        var xTile, yTile;
        for (x = 0; x < localX; x++) {
            terrain[x] = [];
            for (y = 0; y < localY; y++) {
                terrain[x][y] = [];
                for (z = 0; z < 4; z++) {
                    xTile = temp[z][y][x].charAt(0) + temp[z][y][x].charAt(1);
                    yTile = temp[z][y][x].charAt(2) + temp[z][y][x].charAt(3);

                    terrain[x][y][z] = [xTile,yTile];
                }
            }
        }
    }

    this.render = function() {
        var tempID = '';
        var tempData = '';

        for(z = 0; z < 4; z++) {
            for(x = 0;x < localX; x++) {
                for(y = 0; y < localY; y++) {
                    tempID = document.getElementById(x + ',' + y + ',' + z);
                    tempData = 'terrain img grid x' + terrain[x][y][z][0] + ' y' + terrain[x][y][z][1];
                    $(tempID).removeClass();
                    $(tempID).addClass(tempData);
                }
            }
        }
    }

    this.load = function(x,y){
        var hexX = Number(x).toString(16);
        var hexY = Number(y).toString(16);
        var url = './map/' + hexX + '' + hexY + '.TERRAIN';

        loadMap(url, parseMap);
    }

    this.getTerrain = function() {
        return terrain;
    }
}

var previewLayers = function(x,y) {
    var tempId = [];

    for (z = 0; z < 4; z++) {
        tempId[z] = 'terrain img x' + terrain[x][y][z][0] + ' y' + terrain[x][y][z][1];
        $(document.getElementById("preview" + z)).removeClass();
        $(document.getElementById("previewAll" + z)).removeClass();
        $(document.getElementById("preview" + z)).addClass(tempId[z]);
        $(document.getElementById("previewAll" + z)).addClass(tempId[z]);
    }
}

function grid() {
    var tempID='';

    if (document.getElementById('grid').checked == true) {
        for(z = 0; z < 4; z++) {
            for(x = 0;x < localX; x++) {
                for(y = 0; y < localY; y++) {
                    tempID = document.getElementById(x + ',' + y + ',' + z);
                    $(tempID).addClass('grid');
                }
            }
        }
    } else {
        for(z = 0; z < 4; z++) {
            for(x = 0;x < localX; x++) {
                for(y = 0; y < localY; y++) {
                    tempID = document.getElementById(x + ',' + y + ',' + z);
                    $(tempID).removeClass('grid');
                }
            }
        }
    }
}

var Tileset = function() {
    var terrain = tilesetMap.getTerrain()

    this.solid = function() {
        var layerData = 'layerNum0.checked = true; layerNumber = 0;';
        var tilesetData = '';

        var y = 0;
        while (terrain[0][y][0][1] != '--') {
            var x = 0;
            while(terrain[x][y][0][0] != '--') {
                var tileIdX = terrain[x][y][0][0];
                var tileIdY = terrain[x][y][0][1];
                tilesetData += '<div class="tileset terrain img x' + tileIdX + ' y' + tileIdY + '" onclick="tileId=\'' + tileIdX + ',' + tileIdY + '\';' + layerData + '"></div>';
                x++;
            }
            y++;
            tilesetData += '</br>';
        }

        document.getElementById('solidTiles').innerHTML = tilesetData;
    }

    this.semiTransparent = function() {
        var layerData = 'layerCheck();';
        var tileIdX = '', tileIdY = '';
        var tilesetData = '';

        var y = 0;
        while (terrain[0][y][1][1] != '--') {
            var x = 0;
            while(terrain[x][y][1][0] != '--') {
                var tileIdX = terrain[x][y][1][0];
                var tileIdY = terrain[x][y][1][1];
                tilesetData += '<div class="tileset terrain img x' + tileIdX + ' y' + tileIdY + '" onclick="tileId=\'' + tileIdX + ',' + tileIdY + '\';' + layerData + '"></div>';
                x++;
            }
            y++;
            tilesetData += '</br>';
        }
        document.getElementById('semiTiles').innerHTML = tilesetData;

    }

    this.transparent = function() {
        var layerData = 'layerCheck();';
        var tileIdX = '', tileIdY = '';
        var tilesetData = '';

        tileIdX = '--';
        tileIdY = '--';

        tilesetData += '<div class="tileset terrain img x' + tileIdX + ' y' + tileIdY + '" onclick="tileId=\'' + tileIdX + ',' + tileIdY + '\';' + layerData + '"></div>';
        document.getElementById('transTiles').innerHTML = tilesetData;
    }
}

function layerCheck() {
    if (layerNum0.checked == true) {
        layerNum1.checked = true;
        layerNumber = 1;
    }
}

function paint(position) {
    var tempTileId = tileId.split(',');

    if (position == null){
        var tempPos = event.target.id.split(',');
    } else {
        var tempPos = position.split(',');
    }

    var tempId = tempPos[0] + ',' + tempPos[1] + ',' + layerNumber;

    var tempData1 = 'x' + terrain[tempPos[0]][tempPos[1]][layerNumber][0] + ' y' + terrain[tempPos[0]][tempPos[1]][layerNumber][1];
    $(document.getElementById(tempId)).removeClass(tempData1);

    var tempData2 = 'x' + tempTileId[0] + ' y' + tempTileId[1];
    $(document.getElementById(tempId)).addClass(tempData2);

    latestPosition = tempId;
    terrain[tempPos[0]][tempPos[1]][layerNumber][0] = tempTileId[0];
    terrain[tempPos[0]][tempPos[1]][layerNumber][1] = tempTileId[1];
    previewLayers(tempPos[0],tempPos[1]);
}

var Paint = function() {
    this.tempPos = [];
    this.deltaX = [], this.deltaY = [];

    this.painting = function() {
        for(x=Math.min(this.tempPos[0][0],this.tempPos[2][0]);x<=Math.max(this.tempPos[0][0],this.tempPos[2][0]);x++) {
            for(y=Math.min(this.tempPos[0][1],this.tempPos[2][1]);y<=Math.max(this.tempPos[0][1],this.tempPos[2][1]);y++) {
                $(document.getElementById(x + "," + y + "," + layerNumber)).removeClass("temp" + " x" + terrain[x][y][layerNumber][0] + " y" + terrain[x][y][layerNumber][1]);
                $(document.getElementById(x + "," + y + "," + layerNumber)).removeClass("temp" + " x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
                $(document.getElementById(x + "," + y + "," + layerNumber)).addClass(" x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
                //console.log(terrain[x][y][layerNumber]);
                terrain[x][y][layerNumber] = [tileId.split(",")[0], tileId.split(",")[1]];
            }
        }
    }
    this.preview = function() {
        this.removeRangeMinX, this.removeRangeMaxX, this.removeRangeMinY, this.removeRangeMaxY;

        this.removeRangeMinX = Math.min(this.tempPos[0][0],this.tempPos[1][0],this.tempPos[2][0]);
        this.removeRangeMaxX = Math.max(this.tempPos[0][0],this.tempPos[1][0],this.tempPos[2][0]);

        this.removeRangeMinY = Math.min(this.tempPos[0][1],this.tempPos[1][1],this.tempPos[2][1]);
        this.removeRangeMaxY = Math.max(this.tempPos[0][1],this.tempPos[1][1],this.tempPos[2][1]);

        for(x=this.removeRangeMinX;x<=this.removeRangeMaxX;x++) {
            for(y=this.removeRangeMinY;y<=this.removeRangeMaxY;y++) {
                //console.log("x" + terrain[x][y][layerNumber][0] + " y" + terrain[x][y][layerNumber][1]);
                //console.log(x + "," + y + "," + layerNumber);
                $(document.getElementById(x + "," + y + "," + layerNumber)).removeClass("temp" + " x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
                $(document.getElementById(x + "," + y + "," + layerNumber)).addClass("temp" + " x" + terrain[x][y][layerNumber][0] + " y" + terrain[x][y][layerNumber][1]);
            }
        }
        for(x=Math.min(this.tempPos[0][0],this.tempPos[2][0]);x<=Math.max(this.tempPos[0][0],this.tempPos[2][0]);x++) {
            for(y=Math.min(this.tempPos[0][1],this.tempPos[2][1]);y<=Math.max(this.tempPos[0][1],this.tempPos[2][1]);y++) {
                //console.log("x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
                $(document.getElementById(x + "," + y + "," + layerNumber)).removeClass("temp" + " x" + terrain[x][y][layerNumber][0] + " y" + terrain[x][y][layerNumber][1]);
                $(document.getElementById(x + "," + y + "," + layerNumber)).addClass("temp" + " x" + tileId.split(",")[0] + " y" + tileId.split(",")[1]);
            }
        }
    }
}

var PaintByDrag = function() {
    this.mouseDown = false;

    this.start = function() {
        parent.mouseDown = true;

        this.tempPos[0] = event.target.id.split(",");
        this.tempPos[1] = this.tempPos[0];
        this.tempPos[2] = this.tempPos[0];
        this.preview();
    }
    this.move = function() {
        if(parent.mouseDown) {
            this.tempPos[1] = this.tempPos[2];
            this.tempPos[2] = event.target.id.split(",");
            this.preview();
        }
    }
    this.end = function() {
        parent.mouseDown = false;
        this.painting();
    }
    this.clear = function() {
        console.log("This was a blast!");
    }
}

PaintByDrag.prototype = new Paint();
var paintByDrag = new PaintByDrag();

function paintLeft() {
    var tempPos = latestPosition.split(',');

    if (parseInt(tempPos[0]) > 0 && parseInt(tempPos[0]) <= (localX - 1)) {
        var tempId = (parseInt(tempPos[0]) - 1) + ',' + tempPos[1] + ',3';
        paint(tempId);
    }
}

function paintUp() {
    var tempPos = latestPosition.split(',');

    if (parseInt(tempPos[1]) > 0 && parseInt(tempPos[1]) <= (localY - 1)) {
        var tempId = tempPos[0] + ',' + (parseInt(tempPos[1]) - 1) + ',3';
        paint(tempId);
    }
}

function paintRight() {
    var tempPos = latestPosition.split(',');

    if (parseInt(tempPos[0]) >= 0 && parseInt(tempPos[0]) < (localX - 1)) {
        var tempId = (parseInt(tempPos[0]) + 1) + ',' + tempPos[1] + ',3';
        paint(tempId);
    }
}

function paintDown() {
    var tempPos = latestPosition.split(',');

    if (parseInt(tempPos[1]) >= 0 && parseInt(tempPos[1]) < (localY - 1)) {
        var tempId = tempPos[0] + ',' + (parseInt(tempPos[1]) + 1) + ',3';
        paint(tempId);
    }
}

function printMap() {
    var data = '';
    for(z = 0; z < 4; z++) {
        for(y = 0; y < localY; y++) {
            for(x = 0; x < localX; x++) {
                for(n = 0; n < 2; n++) {
                    if (terrain[x][y][z] != "") {
                        data += terrain[x][y][z][n];
                    } else {
                        data += '--';
                    }
                }
                if (x == 29 && y == 19) {
                    data = data + '|\n';
                } else if (x == 29){
                    data = data + ':\n';
                } else {
                    data = data + '+';
                }
            }
        }
    }
    alert(name.value);
    console.log(data);
}