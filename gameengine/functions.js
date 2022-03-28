function vector2(x,y){return new v2(x,y)}
function color(id=0){return colors[id]}
function componentToHex(c){
        
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }