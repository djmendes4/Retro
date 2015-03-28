// Game(Unknown) - 2014
// Will McCurdy - Dillon Mendes - Ben McCurdy

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var key_w=false;
var key_a=false;
var key_s=false;
var key_d=false;
var key_sp=false;

// function get(url, callback){
//   var x;
//   if (window.XMLHttpRequest){x=new XMLHttpRequest();}
//   else{x=new ActiveXObject("Microsoft.XMLHTTP");}
//   x.onreadystatechange = function(){
//     if (x.readyState == 4 && x.status == 200) {
//       callback(x.responseText);
//     }
//   };
//   x.open("GET", url, false);
//   //x.setRequestHeader("Authorization", auth);
//   x.send();
// };

    var get = function(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url ,false);
        xhr.onload = function(e) {
            if(this.status == 200){
                var data = (this.response);
                console.log(data);
                callback(data);
            }
            else{
                console.log("error");
            }
        }
        xhr.onerror = function(){
            console.log("error");
        }
        xhr.ontimeout = function(){
            console.log("timeout");
        }
        xhr.send();
    }

function onKeyDown(event){
  var keyCode = event.keyCode;
  //console.log(keyCode);
  switch(keyCode){
    case 87: //w
      key_w = true;
      break;
    case 68: //d
      key_d = true;
      break;
    case 83: //s
      key_s = true;
      break;
    case 65: //a
      key_a = true;
      break;
    case 32: //space
      key_sp = true;
      break;
  }
}

function onKeyUp(event){
  var keyCode = event.keyCode;
  switch(keyCode){
    case 87: //w
      key_w = false;
      break;
    case 68: //d
      key_d = false;
      break;
    case 83: //s
      key_s = false;
      break;
    case 65: //a
      key_a = false;
      break;
    case 32: //space
      key_sp = false;
      break;
  }
}

var input = function(){

  // 1 key
  if ((key_w)&&(!key_a)&&(!key_s)&&(!key_d)){person.move("N");}
  else if ((!key_w)&&(key_a)&&(!key_s)&&(!key_d)){person.move("W");}
  else if ((!key_w)&&(!key_a)&&(key_s)&&(!key_d)){person.move("S");}
  else if ((!key_w)&&(!key_a)&&(!key_s)&&(key_d)){person.move("E");}

  // 2 keys
  else if ((key_w)&&(key_a)&&(!key_s)&&(!key_d)){person.move("NW");}
  else if ((key_w)&&(!key_a)&&(!key_s)&&(key_d)){person.move("NE");}
  else if ((!key_w)&&(key_a)&&(key_s)&&(!key_d)){person.move("SW");}
  else if ((!key_w)&&(!key_a)&&(key_s)&&(key_d)){person.move("SE");}
  // 3 keys

  else if ((key_w)&&(key_a)&&(!key_s)&&(key_d)){person.move("N");}
  else if ((key_w)&&(key_a)&&(key_s)&&(!key_d)){person.move("W");}
  else if ((!key_w)&&(key_a)&&(key_s)&&(key_d)){person.move("S");}
  else if ((key_w)&&(!key_a)&&(key_s)&&(key_d)){person.move("E");}
  else {person.stand();}

  if (key_sp){
    person.sword();
  }
}

var Action = function(a){
  var i = 0;
  var a = a;
  var c = 0;
  var n = a[i][1];
  this.tick = function(){
    //console.log("i:" + i + " c:" + c + " n:" + n);
    if(c < n){
      c = c + 1;
    }
    if(i < a.length - 1){
      if(c == n){
        i = i + 1;
        n = n + a[i][1];
      }
    }

  }
  this.complete = function(){
    if(c == n){
      return true;
    }
  }
  this.reset = function(){
    i = 0;
    c = -1;
    n = a[i][1];
  }
  this.img = function(){
    return a[i][0];
  }
}


var Person = function(){
  var x = 50;
  var y = 50;
  var speed = 1;
  var s = "SS";
  var c = 0;
  var a = {
    "MN": new Action([["moveN",15],["standN",15]]),
    "MS": new Action([["moveS",15],["standS",15]]),
    "ME": new Action([["moveE",15],["standE",15]]),
    "MW": new Action([["moveW",15],["standW",15]]),
    "SN": new Action([["standN",15]]),
    "SS": new Action([["standS",15]]),
    "SE": new Action([["standE",15]]),
    "SW": new Action([["standW",15]]),
    "BN": new Action([["swordE",6], ["swordNE",6], ["swordN",6]]),
    "BS": new Action([["swordW",6], ["swordSW",6], ["swordS",6]]),
    "BE": new Action([["swordN",6], ["swordNE",6], ["swordE",6]]),
    "BW": new Action([["swordN",6], ["swordNW",6], ["swordW",6]]),
    "BNH": new Action([["swordN",3]]),
    "BSH": new Action([["swordS",3]]),
    "BEH": new Action([["swordE",3]]),
    "BWH": new Action([["swordW",3]])

  };
  this.tick = function(){
    if(s.charAt(0)=="B" && a[s].complete() && s.charAt(2)!="H"){
      s = "S" + s.charAt(1);

    }

    if(s.charAt(0)=="M" && a[s].complete()){
       a[s].reset();
    }
    a[s].tick();
  }

  this.draw = function(){
    var img = a[s].img() + " sprite2";
    scr.draw(x,y,img);
  }

  this.sword = function(){
    if(s == "SN" || s == "MN"){
      s = "BN";
      a["BN"].reset();
    }
    if(s == "SS" || s == "MS"){
      s = "BS";
      a["BS"].reset();
    }
    if(s == "SE" || s == "ME"){
      s = "BE";
      a["BE"].reset();
    }
    if(s == "SW" || s == "MW"){
      s = "BW";
      a["BW"].reset();
    }
    if(s.charAt(0)=="B" && s.charAt(2) != "H" && a[s].complete()){
      //s = s + "H";
    }
  }
  this.move = function(direction){
    if(s.charAt(0)!="B"){
      s = "M" + direction.charAt(0);
    }

    if (direction == "N"){
      y= y-(1*speed);
    }
    if (direction == "NE"){
      y= y-(.707*speed);
      x= x+(.707*speed);
    }
    if (direction == "E"){
      x= x+(1*speed);
    }
    if (direction == "SE"){
      y= y+(.707*speed);
      x= x+(.707*speed);
    }
    if (direction == "S"){
      y= y+(1*speed);
    }
    if (direction == "SW"){
      y= y+(.707*speed);
      x= x-(.707*speed);
    }
    if (direction == "W"){
      x= x-(1*speed);
    }
    if (direction == "NW"){
      y= y-(.707*speed);
      x= x-(.707*speed);
    }
  }
  this.stand = function(){
    if(s.charAt(0)!="B"){
      s = "S" + s.charAt(1);
    }
  }
}

var Screen = function(div){
  var div = div;
  var data = "";
  this.draw = function(x, y, img){
    data = data + '<div class="' + img + '" style="position:absolute;left:'+Math.round(x)+'px;top:'+Math.round(y)+'px;"></div>';
  }
  this.render = function(){
    document.getElementById(div).innerHTML = data;
  }
  this.clear = function(){
    data = "";
  }
}

var Map = function(){
  var dd = [];
  var map_url = "";

  var parse_map = function(data){
    var zdat = data.replace(/(\r\n|\n|\r)/gm,"").split("|");
    for(z = 0;z < zdat.length;z++){
      dd[z] = [];
      var ydat = zdat[z].split(":");
      for(y = 0;y < ydat.length;y++){
        dd[z][y] = []
        var xdat = ydat[y].split("+");
        for(x = 0;x < xdat.length;x++){
          dd[z][y][x] = xdat[x];
        }
      }
    }
    console.log(dd);
  };

  this.lload = function(url){
    map_url = url;
    get(map_url, parse_map);
  }

  this.draw = function(){
    var data = "";
    scrbg.clear();
    for(z = 0;z < dd.length; z++){
      for(y = 0; y < dd[z].length; y++){
        for(x = 0; x < dd[z][y].length; x++){
          var l = x*20-1;
          var t = y*20-1;
          var xxx = "x" + dd[z][y][x].charAt(0) + dd[z][y][x].charAt(1);
          var yyy = "y" + dd[z][y][x].charAt(2) + dd[z][y][x].charAt(3);
          if(dd[z][y][x] != "----"){
            var img = 'terrain '+ xxx + ' ' + yyy + ' img grid';
            scrbg.draw(l,t,img);
          }
        }
      }
    }
    scrbg.render();
  }
}

  var tick = function(){
    input();
    person.tick();
    scr.clear();
    person.draw();
    scr.render();
  }

var scr = new Screen("game");
var scrbg = new Screen("gamebg");
var person = new Person();
var mp = new Map();
mp.lload("../map/8080.TERRAIN");
mp.draw();

setInterval(tick,1000/60);
