// Game
// 2014
// Will McCurdy - Dillon Mendes - Ben McCurdy

var c = 0;


window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var key_w=false;
var key_a=false;
var key_s=false;
var key_d=false;
var key_sp=false;

function get(url, callback){
  var x;
  if (window.XMLHttpRequest){x=new XMLHttpRequest();}
  else{x=new ActiveXObject("Microsoft.XMLHTTP");}
  x.onreadystatechange = function(){
    if (x.readyState == 4 && x.status == 200) {
      callback(JSON.parse(x.responseText));
    }
  };			  	
  x.open("GET", url, true);
  x.setRequestHeader("Authorization", auth);
  x.send();
};

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
}
var Person = function(){
  var x = 50;
  var y = 50;
  var speed = 1; 
  var d = "S";
  var s = "stand";
  var c = 0;
  this.draw = function(){  
    
  var img = s + d + " sprite";
  scr.draw(x,y,img);

  }
  this.move = function(direction){
    d = direction.charAt(0);
    s = "move";
    if (c<15){
      s = "move"
    }
    else {
      s = "stand"
    }
    c = c + 1;
    if(c>30){
      c = 0;
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
    s = "stand";
    c = 0;
  }
}



var Screen = function(){
  var data = "";
  this.draw = function(x, y, img){
    data = data + '<div class="' + img + '" style="position:absolute;left:'+Math.round(x)+'px;top:'+Math.round(y)+'px;"></div>';
  }
  this.render = function(){
    document.getElementById("game").innerHTML = data;
  }
  this.clear = function(){
    data = "";
  }
} 




var tick = function(){
  input();
  scr.clear();
  person.draw();
  scr.render();
}

var scr = new Screen();
var person = new Person();

setInterval(tick,1000/60);
