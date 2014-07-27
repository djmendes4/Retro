var gridDimensions = [30,20,4];
var currentPosition = [0,0];
var tileID = ['x00','y00'];
var terrain = [];
var layer = 0;

window.onload = function() {
    paintByArrows = new PaintByArrows();
    paintByDrag = new PaintByDrag();

    window.addEventListener('keydown', determineKey);
    function determineKey(event) {
        // keyCode 37: Down Arrow Key
        // keyCode 38: Up Arrow Key
        // keyCode 39: Right Arrow Key
        // keyCode 40: Left Arrow Key
        if (event.keyCode == '37' || event.keyCode == '38' || event.keyCode == '39' || event.keyCode == '40') {
            event.preventDefault();
        }
        if (event.keyCode == '37') {
            paintByArrows.left(currentPosition[0],currentPosition[1]);
        }
        if (event.keyCode == '38') {
            paintByArrows.up(currentPosition[0],currentPosition[1]);
        }
        if (event.keyCode == '39') {
            paintByArrows.right(currentPosition[0],currentPosition[1]);
        }
        if (event.keyCode == '40') {
            paintByArrows.down(currentPosition[0],currentPosition[1]);
        }
    }
    $('#changelogOptions .toggle.left').click(function() {
		$('#changelogOptions').removeClass('translate');
		$('#changelogOptions .toggle.right').removeClass('hidden');
        $('#changelogOptions .toggle.right').removeClass('scroll');
	});
	$('#changelogOptions .toggle.right').click(function() {
		$('#changelogOptions').addClass('translate');
        $('#changelogOptions .toggle.right').addClass('hidden');
	});
    $('#terrain').mousedown(function() {
        event.preventDefault();
        paintByDrag.start();
    });
    $('#terrain').mouseover(function() {
        paintByDrag.move();
    });
    $('#terrain').mouseup(function() {
        paintByDrag.end();
    });
    $('#terrain').mouseleave(function() {
        paintByDrag.clear();
    });
    $('#solid div').click(function() {
        tileID = [event.target.id.split(',')[0],event.target.id.split(',')[1]];
        options_layer0.checked = true;
        options.layer(0);
    });
    $('#semitransparent div').click(function() {
        tileID = [event.target.id.split(',')[0],event.target.id.split(',')[1]];
        if (options_layer0.checked) {
            options_layer1.checked = true;
            options.layer(1);
        }
    });
}

/* Painting Functions */
var PaintByArrows = function() {
    var tileType;
    var paintID;

    this.left = function(x,y) {
        if (x > 0 && x < gridDimensions[0]) {
            this.paint((x - 1), y);
        }
    }

    this.up = function(x,y) {
        if (y > 0 && y < gridDimensions[1]) {
            this.paint(x, (y - 1));
        }
    }

    this.right = function(x,y) {
        if (x >= 0 && x < (gridDimensions[0] - 1)) {
            this.paint((x + 1), y);
        }
    }

    this.down = function(x,y) {
        if (y >= 0 && y < (gridDimensions[1] - 1)) {
            this.paint(x, (y + 1));
        }
    }

    this.paint = function(x,y) {
        tileType = terrain[x][y][layer];
        paintID = x + ',' + y + ',' + layer;
        currentPosition = [x,y];
        $(document.getElementById(paintID)).removeClass(tileType[0] + ' ' + tileType[1]);
        $(document.getElementById(paintID)).addClass(tileID[0] + ' ' + tileID[1]);
        terrain[x][y][layer] = [tileID[0],tileID[1]];
    }
}

var PaintByDrag = function() {
    this.mouseDown = false;
    this.initial = []; this.intermediate = []; this.final = [];
    this.removeMin = []; this.removeMax = []; this.addMin = []; this.addMax = [];
    var tileType;
    var paintID;

    this.start = function() {
        this.mouseDown = true;

        this.initial = event.target.id.split(',');
        this.intermediate = this.initial;
        this.final = this.initial;

        this.setRectCoords(this.initial,this.intermediate,this.final);
        this.previewRemove(this.removeMin,this.removeMax);
        this.previewAdd(this.addMin,this.addMax);
    }

    this.move = function() {
        if (this.mouseDown) {
            this.intermediate = this.final;
            this.final = event.target.id.split(',');

            this.setRectCoords(this.initial,this.intermediate,this.final);
            this.previewRemove(this.removeMin,this.removeMax);
            this.previewAdd(this.addMin,this.addMax);
        }
    }

    this.end = function() {
        if (this.mouseDown) {
            this.mouseDown = false;

            currentPosition = [parseInt(this.final[0]),parseInt(this.final[1])];
            this.setRectCoords(this.initial,this.intermediate,this.final);
            this.paint(this.addMin,this.addMax);
        }
    }

    this.setRectCoords = function(initial,intermediate,final) {
        this.addMin = [Math.min(initial[0],final[0]),Math.min(initial[1],final[1])];
        this.addMax = [Math.max(initial[0],final[0]),Math.max(initial[1],final[1])];
        this.removeMin = [Math.min(this.addMin[0],intermediate[0]),Math.min(this.addMin[1],intermediate[1])];
        this.removeMax = [Math.max(this.addMax[0],intermediate[0]),Math.max(this.addMax[1],intermediate[1])];
    }

    this.previewRemove = function(min,max) {
        for(x = min[0]; x <= max[0]; x++) {
            for(y = min[1]; y <= max[1]; y++) {
                tileType = terrain[x][y][layer];
                paintID = x + ',' + y + ',' + layer;
                $(document.getElementById(paintID)).removeClass('temp ' + tileID[0] + ' ' + tileID[1]);
                $(document.getElementById(paintID)).addClass(tileType[0] + ' ' + tileType[1]);
            }
        }
    }

    this.previewAdd = function(min,max) {
        for(x = min[0]; x <= max[0]; x++) {
            for(y = min[1]; y <= max[1]; y++) {
                tileType = terrain[x][y][layer];
                paintID = x + ',' + y + ',' + layer;
                $(document.getElementById(paintID)).removeClass(tileType[0] + ' ' + tileType[1]);
                $(document.getElementById(paintID)).addClass('temp ' + tileID[0] + ' ' + tileID[1]);
            }
        }
    }

    this.paint = function(min,max) {
        for(x = min[0]; x <= max[0]; x++) {
            for(y = min[1]; y <= max[1]; y++) {
                tileType = terrain[x][y][layer];
                paintID = x + ',' + y + ',' + layer;
                $(document.getElementById(paintID)).removeClass('temp ' + tileType[0] + ' ' + tileType[1]);
                $(document.getElementById(paintID)).removeClass('temp ' + tileID[0] + ' ' + tileID[1]);
                $(document.getElementById(paintID)).addClass(tileID[0] + ' ' + tileID[1]);
                terrain[x][y][layer] = [tileID[0], tileID[1]];
            }
        }
    }

    this.clear = function() {
        this.mouseDown = false;

        for(x = 0; x < gridDimensions[0]; x++) {
            for(y = 0; y < gridDimensions[1]; y++) {
                tileType = terrain[x][y][layer];
                paintID = x + ',' + y + ',' + layer;
                $(document.getElementById(paintID)).removeClass('temp ' + tileType[0] + ' ' + tileType[1]);
                $(document.getElementById(paintID)).removeClass('temp ' + tileID[0] + ' ' + tileID[1]);
                $(document.getElementById(paintID)).addClass(tileType[0] + ' ' + tileType[1]);
            }
        }
    }
}

/* Map Functions */

var Map = function() {
    var temp = [];

    this.initialize = function() {
        var data = '';

        for(z = 0; z < gridDimensions[2]; z++) {
            for(y = 0; y < gridDimensions[1]; y++) {
                for(x = 0; x < gridDimensions[0]; x++) {
                    data = data + '<div id="' + x + ',' + y + ',' + z + '"></div>';
                }
            }
            document.getElementById('terrain_layer' + z).innerHTML = data;
        }
    }

    this.loadMap = function(url, callback) {
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

    this.parse = function(data) {
        var zData, yData, xData;
        var xTile, yTile;

        zData = data.replace(/(\r\n|\n|\r)/gm,"").split("|");
        for(z = 0; z < zData.length; z++) {
            temp[z] = [];
            yData = zData[z].split(":");
            for(y = 0; y < yData.length; y++) {
                temp[z][y] = [];
                xData = yData[y].split("+");
                for(x = 0; x < xData.length; x++) {
                    temp[z][y][x] = xData[x];
                }
            }
        }
        for (x = 0; x < gridDimensions[0]; x++) {
            terrain[x] = [];
            for (y = 0; y < gridDimensions[1]; y++) {
                terrain[x][y] = [];
                for (z = 0; z < 4; z++) {
                    xTile = 'x' + temp[z][y][x].charAt(0) + temp[z][y][x].charAt(1);
                    yTile = 'y' + temp[z][y][x].charAt(2) + temp[z][y][x].charAt(3);
                    terrain[x][y][z] = [xTile,yTile];
                    //console.log(terrain[x][y][z]);
                }
            }
        }
    }

    this.render = function() {
        var tempID = '';
        var tempData = '';

        for(z = 0; z < 4; z++) {
            for(x = 0;x < gridDimensions[0]; x++) {
                for(y = 0; y < gridDimensions[1]; y++) {
                    tempID = document.getElementById(x + ',' + y + ',' + z);
                    tempData = 'terrain img grid ' + terrain[x][y][z][0] + ' ' + terrain[x][y][z][1];
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

        this.loadMap(url, this.parse);
    }
}

/* Map Functions */

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

var Options = function() {
    this.grid = function() {
        var tempID='';

        if (document.getElementById('options_toggleGrid').checked == true) {
            for(z = 0; z < gridDimensions[2]; z++) {
                for(x = 0;x < gridDimensions[0]; x++) {
                    for(y = 0; y < gridDimensions[1]; y++) {
                        tempID = document.getElementById(x + ',' + y + ',' + z);
                        $(tempID).addClass('grid');
                    }
                }
            }
        } else {
            for(z = 0; z < gridDimensions[2]; z++) {
                for(x = 0;x < gridDimensions[0]; x++) {
                    for(y = 0; y < gridDimensions[1]; y++) {
                        tempID = document.getElementById(x + ',' + y + ',' + z);
                        $(tempID).removeClass('grid');
                    }
                }
            }
        }
    }
    this.layer = function(level) {
        layer = level;
    }
}

var Tileset = function() {
    this.create = function(name,layer) {
        var tilesetID = [], tileClass = [];
        var newTile = {}, newTileset = {}, newBreak = {}, newTitle = {};
        var x = 0, y = 0;

//        if (type != 'solid' && type != 'semitransparent' && type != 'transparent') {
//            alert('The tile type being added is not supported.');
//            return;
//        }

        newTileset = document.createElement('section');
        newTileset.setAttribute('class','subtitle');

        newTitle = document.createTextNode(name);
        newTileset.appendChild(newTitle);

        document.getElementById('tileset').appendChild(newTileset);

        newTileset = document.createElement('section');
        newTileset.setAttribute('class','content');

        y = 0;
        while (terrain[0][y][layer][1] != 'y--') {
            x = 0;
            while(terrain[x][y][layer][0] != 'x--') {
                tileID = terrain[x][y][layer][0] + ',' + terrain[x][y][layer][1];
                tileClass = 'tile terrain img ' + terrain[x][y][layer][0] + ' ' + terrain[x][y][layer][1];

                newTile = document.createElement('div');
                newTile.setAttribute('id',tileID);
                newTile.setAttribute('class',tileClass);

                newTileset.appendChild(newTile);
                x++;
            }
            newBreak = document.createElement('br');
            newTileset.appendChild(newBreak);

            y++;
        }
        document.getElementById('tileset').appendChild(newTileset);
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

/* ------------ CHANGELOG ------------*/
var Changelog = function() {
    this.tempEventNumber = 1;
    this.changelogData = [];
    this.changelogData[0] = ['EventNumber','ActionNumber','ID','Class','Action','Description','Details'];
    this.tempChangelogData = [];

    this.paintByDrag = function(event,eventState) {
        var tempActionNumber = 1;
        var tempID = event.target.id.split(',');
        var tempClass = document.getElementById(tempID[0] + ',' + tempID[1] + ',' + layer).getAttribute('class');

        this.tempChangelogData[eventState] = [tempActionNumber,tempID[0] + ',' + tempID[1] + ',' + layer,tempClass,tempAction];

        if(eventState == 1) {


            this.changelogData[this.tempEventNumber] = [this.tempEventNumber,this.tempChangelogData[0][0],this.tempChangelogData[0][1],this.tempChangelogData[0][2],this.tempChangelogData[0][3],this.tempChangelogData[0][4],this.tempChangelogData[0][5] + ' --> ' + this.tempChangelogData[1][5],'ID:(' + tempID + ') changed from <div class="' + tempClass + '"></div> to <div class="' + tempClass + '"></div>'];
            console.log(this.changelogData[this.tempEventNumber]);
            this.write();
        }
    }

    this.write = function() {
        //this.changelogData[this.tempEventNumber] = [this.tempEventNumber,"1","0,0","terrain img grid x00 y00","Paint(By Click)","Grass 1 --> Sand 2","Extended Description"];
        var newRow = document.createElement("tr");

        for(x = 0; x < 7; x++) {
            var newCell = document.createElement("td");
            var newDiv = document.createElement("div");

            newDiv.appendChild(document.createTextNode(this.changelogData[this.tempEventNumber][x]));
            newCell.appendChild(newDiv);

            if(this.numChecked[x + 1] == 0) {
                newCell.style.display = "none";
            }

            newRow.appendChild(newCell);
        }
        document.getElementById("changelogTableBody").insertBefore(newRow,document.getElementById("changelogTableBody").firstChild);

        this.tempEventNumber++;
        this.flushData();
    }
    this.flushData = function() {
        this.tempChangelogData.length = 0;
    }

    this.toggleField = function(fieldName, fieldNumber) {
        var tempName = 'changelog' + fieldName;
        var tempHeader = '#changelogTable th:nth-child(' + fieldNumber + ')';
        var tempCellData = '#changelogTable tr td:nth-child(' + fieldNumber + ')';
        var numChecked = [];
        var tempWidth = [];

        if(document.getElementById(tempName).checked) {
            $(tempHeader).show();
            $(tempCellData).show();
            numChecked[fieldNumber] = 1;
            tempWidth[fieldNumber] = $(tempHeader).width();
        } else {
            $(tempHeader).hide();
            $(tempCellData).hide();
            numChecked[fieldNumber] = 0;
            tempWidth[fieldNumber] = $(tempHeader).width();
        }
        this.changeWidth(numChecked,tempWidth);
    }

    this.changeWidth = function(numChecked,tempWidth) {
        var finalWidth = 0;
        var finalAdjustment = 0;

        for(x = 1; x < 8;x ++) {
            finalWidth += numChecked[x] * tempWidth[x] + 3 * numChecked[x];
        }

        finalAdjustment = 588 - (finalWidth + 1);

        if(numChecked[6]==1) {
            var temp = finalAdjustment + tempWidth[6];
            $('#changelogTable th:nth-child(6) div').css("width",temp);
            $('#changelogTable td:nth-child(6) div').css("width",temp);
        } else {
            var temp = finalAdjustment + tempWidth[7];
            $('#changelogTable th:nth-child(7) div').css("width",temp);
            $('#changelogTable td:nth-child(7) div').css("width",temp);
        }
    }
}

var changelog = new Changelog();
