function vector2(x,y){return new v2(x,y)}
function color(r=1,g=1,b=1){return new clr(r,g,b)}
function componentToHex(c){
        
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }