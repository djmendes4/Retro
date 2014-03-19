var img1 = "http://wdmccurdy.github.io/GAMEMAKING/zelda1.png"
  var img2 = "http://wdmccurdy.github.io/GAMEMAKING/zelda1.png";
  var x = 50;
  var y = 50;
  var c = 0;
  window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var key_w=false;
var key_a=false;
var key_s=false;
var key_d=false;
var d="f";
var s="stand"

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
if(key_w){y = y - 1;
            d="b"
            
                 }
if(key_s){y = y + 1;
            d="f"
                 }
if(key_a){x = x - 1;
             d="l"
                 }
if(key_d){x = x + 1;
             d="r"
                 }
}


function tick(){
input();
if(c<15){
          document.getElementById("pixel").innerHTML = '<div class="stand'+d+' sprite" style="position:absolute;left:' + x + 'px;top:' + y + 'px;"></div>';//width:56px;
}
else{
          document.getElementById("pixel").innerHTML = '<div class="'+s+d+' sprite" style="position:absolute;left:' + x + 'px;top:' + y + 'px;"></div>';//width:56px;
}

c = c + 1;
if(c>30){c = 0;}
}

setInterval(tick,1000/60);
