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
  camera.x=0
  camera.y=0
  ctx.setTransform(1, 0, 0, 1, 0, 0);
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

function addInterp(obj,val,end,duration){
  interp.addinterp(obj,val,end,duration);
}
function move_and_collide(obj,x,y){
  let move=root.checkcollide(x+obj.x,y+obj.y,obj)
  if(!move[0]){
    obj.x+=x;obj.y+=y;
    snap_pos(obj,[move[1],move[1]],new v2(x,y))
  }
}
function move_and_slide(obj,x,y){
  
  let movement=[null,null]
  let basedir=new v2(Math.sign(x),Math.sign(y))
  let val =root.checkcollide(x+obj.x,obj.y,obj)
  x*=!val[0]
  
  movement[0]=val[1]
  val=root.checkcollide(obj.x,y+obj.y,obj)
  y*=!val[0]
  movement[1]=val[1]
  obj.x+=x;obj.y+=y;
  snap_pos(obj,movement,basedir)
}

function snap_pos(obj,movement,basedir){
  if(movement[0]!=null&&basedir.x!=0&&movement[0].snap){
    if(basedir.x==1){
      obj.x=movement[0].x-obj.size.x
      
    }else{
      obj.x=movement[0].x+movement[0].size.x
    }
  }
  if(movement[1]!=null&&basedir.y!=0&&movement[1].snap){
    if(basedir.y==1){
      obj.y=movement[1].y-obj.size.y
    }else{
      obj.y=movement[1].y+movement[1].size.y
      
    }
  }
}