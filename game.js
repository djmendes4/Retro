// Game
// 2014
// Will McCurdy - Dillon Mendes - Ben McCurdy

var x = 50;
var y = 50;
var c = 0;
var d = "f"
var s = "stand";

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var key_w=false;
var key_a=false;
var key_s=false;
var key_d=false;

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
  }
}

var input = function(){
  if (key_w||key_s||key_a||key_d){
    s="walk";    
  }
  else{
    s="stand";
  }
  if(key_w){
    y = y - 1;
    d="b";
  }
  if(key_s){
    y = y + 1;
    d="f";
  }
  if(key_a){
    x = x - 1;
    d="l";
  }
  if(key_d){
    x = x + 1;
    d="r";
  }
}

var Screen = function(){
  var data = "";
  this.draw = function(x, y, img){
    data = data + '<div class="' + img + '" style="position:absolute;left:'+x+'px;top:'+y+'px;"></div>';
  }
  this.render = function(){
    document.getElementById("game").innerHTML = data;
  }
  this.clear = function(){
    data = "";
  }
} 


var screen = new Screen();

var tick = function(){
  input();
  screen.clear();
  if(c<15){
    var img = "stand" + d + " sprite";
    screen.draw(x,y,img);
  }
  else{
    var img = s + d + " sprite";
    screen.draw(x,y,img);
  }
  screen.render();
  c = c + 1;
  if(c>30){
    c = 0;
  }
}

setInterval(tick,1000/60);
