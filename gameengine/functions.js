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
let removedvars=[]
function loadcode(){
  let a=new Tab("aa")
  a.press()
    let returnbtn= new btn("End",0,0,2,3,4)
    root.add(returnbtn)
    returnbtn.onclick="endgame()"
    mjust=false
    try{
    let obj = document.getElementById("insertion_point")
    for(let child of obj.children){obj.removeChild(child)}
    let nchild = document.createElement("script")
    let ncont =document.getElementById("scriptinput").value
    ncont=ncont.replaceAll("let ","var ")
    ncont=ncont.replaceAll("const ","var ")
    
    nchild.innerHTML=ncont
    nchild.defer=true
    nchild.type="text/javascript"
    obj.appendChild(nchild)
    removedvars=[]
    for(let i of ncont.split("var ")){
      if(i==''){continue}
      removedvars.push(i.split("=")[0].replace(" ",""))
    }
    hasloop=ncont.includes("function loop()")
    if(ncont.includes("function ready()")){ready()}
    }catch(exception){
      throw exception
    }
    editor=false
    eroot.visible=false
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
function loadtex(id=""){
  if(id!=""){return imagelist[id]}
  return imagelist;
}
function endgame(){
  editor=true
  mjust=false
  let obj = document.getElementById("insertion_point")
  for(let child of obj.children){obj.removeChild(child)}
  eroot.visible=true
  for(let i=1;i<removedvars.length;i++){
    let to=removedvars[i]
    eval('delete window.'+to.replace(";",""))
    
  }
  root.children=[]
  tab0.press()
  collisionobjects=[]
  removedvars=[]
}
function isKeyPressed(key){return keysdown.includes(key)}
function getInput(){
  let out=new v2(0,0);
  out.x=isKeyPressed("d")-isKeyPressed("a")
  out.y=isKeyPressed("s")-isKeyPressed("w")
  return out
}

