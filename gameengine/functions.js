function vector2(x,y){return new v2(x,y)}
function color(id=0){return colors[id]}
function componentToHex(c){
        
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
function to_image(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}
function add(obj){
  root.add(obj)
}
function loadcode(){
  root.visible=false
  let a=new Tab(new v2(0,0),"aa")
  a.press()
  let obj = document.getElementById("insertion_point")
  for(let child of obj.children){obj.removeChild(child)}
  let nchild = document.createElement("script")
  let ncont =document.getElementById("scriptinput").value
  
  console.log(ncont)
  nchild.innerHTML=ncont
  nchild.defer=true
  nchild.type="text/javascript"
  obj.appendChild(nchild)
  
  hasloop=ncont.includes("function loop()")
  if(ncont.includes("function ready()")){ready()}
  editor=false
}
function undoimage(){
  draw.texture=new texture();
}
function saveimage(){
  let nameof=prompt("Image Name:")
  let n=document.createElement("canvas")
  n.width=8;n.height=8;
  n.getContext("2d").putImageData(draw.texture.d,0,0)
  imagelist[nameof]=n
}