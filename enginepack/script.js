
let screen=document.getElementById("screen")
let ctx=screen.getContext("2d")
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.shadowBlur=0;
ctx.shadowOffsetX=0
ctx.shadowOffsetY=0

ctx.miterLimit=1
ctx.width=128
ctx.imageSmoothingQuality='low'
ctx.height=128
ctx.font="1rem base"
let hasloop=false;
window.onresize=update_size;
update_size()
let camera=new cam()
let imagelist={}
let collisionobjects=[]
ctx.filter="none";
let mpressed=false;
let mjust=false;
ctx.imageSmoothingEnabled=false
let current_hover=null;
let currentactive=null;
let curtab=null;
function update_size(){
    var max_size=Math.min(window.innerWidth,window.innerHeight)
    screen.style.minWidth=max_size
    screen.style.minHeight=max_size
    screen.style.maxWidth=max_size
    screen.style.maxHeight=max_size
    screen.style.marginLeft=(window.innerWidth)/2-(max_size/2)
    document.getElementById("objects").style=screen.style
    document.getElementById("objects").style.marginLeft="50%"
    document.getElementById("objects").style.transform="scale("+max_size/128+","+max_size/128+") translate(-25%,56px)"
    document.getElementById("objects").style.backgroundColor='#23232a'
    if(current_tab!="code"){document.getElementById("objects").style.display="none"}else{
            document.getElementById("objects").style.visiblility="visible";
            document.getElementById("objects").style.userSelect="all";
            document.getElementById("objects").style.zIndex="10000";
            document.getElementById("objects").style.display="block";
    }
}
document.getElementById("objects").style.backgroundColor='#23232a'
let mousepos=new v2(0,0)

/*editor setup*/
let root =new object();
let eroot=new object();
let tabcont=new object();
let tab0=new Tab(vector2(16,8),"code")
let tab1=new Tab(vector2(16,8),"art")
let taba=new Tab(vector2(16,8),"help")
eroot.add(tabcont)
tabcont.add(tab0)
tabcont.add(tab1)
tabcont.add(taba)
//setting up the settings tabs





let keysdown=[]

var background=color(15)
background = '#13131a'


/*input events*/
document.addEventListener("keydown",function(ev){
    if(!keysdown.includes(ev.key)){
        keysdown.push(ev.key)
    }
})
document.addEventListener("keyup",function(ev){
    let index = keysdown.indexOf(ev.key)
    if(index!=-1){
        keysdown.splice(index,1)
    }
})
let inputhelp=document.getElementById("inputtop")
document.addEventListener('mousemove',function(ev){
    if(currentactive!=null){currentactive.active=false};
    if(current_hover!=null){current_hover.active=false}
    var max_size=Math.min(window.innerWidth,window.innerHeight)
    let mx=(ev.pageX-(screen.style.marginLeft.split("px")[0]))/max_size*128;
    let my=(ev.pageY)/max_size*128;
    mousepos.x=mx;
    mousepos.y=my;})
document.getElementById("scriptinput").addEventListener("input",checkinput)
document.addEventListener('mousedown',function(){
    mpressed=true
    if(mjust==false){
        mjust=true
    }
    setTimeout(() => {
        mjust=false
    }, 50);
    if(current_hover==null||current_hover.hovered!=true){return}
    if(currentactive!=null){currentactive.active=false}
    current_hover.press()
    currentactive=current_hover
})
inputhelp.addEventListener('mouseup',function(){mpressed=false})
function checkinput(){
    let n=this;
    mjust=false
    if(this==window){n=document.getElementById("scriptinput")}
    let returned=n.value.replaceAll("<","&lt").replaceAll(">","&gt")
    let sbod =document.getElementById('scriptbody')
    sbod.innerHTML=returned;hljs.highlightElement(sbod)
}
checkinput()
let editor=true
/*the process function for every frame*/
let timer = setInterval(function(){
    
    ctx.clearRect(0,0,128,128)
    ctx.fillStyle=background
    ctx.fillRect(0,0,128,128)
    if(editor){eroot.update(0,0)}
    if(!editor){
        interp.update()
        if(hasloop){try{loop()}catch(error){endgame();alert("Code has errored\nReason:\n"+error)}}
        let c=root.children[0]
        c.x=-camera.x
        c.y=-camera.y
        root.update(camera.x,camera.y)
        
    }
}, 50);

root.visible=true
/*putting rest of scene here*/
let codetitle=new label("code",-56,-104,color(7))
tab0.add(codetitle)
currentactive=tab0
let artback=new box(-92,20,vector2(72,72),color(3))
tab1.add(artback)
let draw=new drawing(0,0,vector2(64,64));
artback.add(draw)
artback.color="#4a4445"
let colorlist=new box(-88,6,vector2(64,14),"#2f2f2f")
for(let i=0;i<colors.length;i++){
    let nitem=new colorpicker(i%11*6,Math.round(i/11-0.5)*6,new v2(4,4),i)
    colorlist.add(nitem)
    
}
document.getElementById('filein').addEventListener("change",loadfile)
let nitem=new colorpicker(21%11*6,Math.round(16/11-0.5)*6,new v2(4,4),-1)
colorlist.add(nitem)
let btne = new btn("run",-112,0,2,3,4)
let newdraw = new btn("new",-112,-8,2,3,4)
let savedraw = new btn("save",-112,-1,2,3,4)
let saveall=new btn("download",-112,8,2,3,4)
let confirmload=new btn("load selected",-112,122,2,3,4)
saveall.onclick="saveAll()"
tab0.add(saveall)
tab0.add(confirmload)
savedraw.onclick="saveimage();undoimage();savedraw.done=true"
newdraw.onclick="undoimage()";
btne.onclick="loadcode()"
confirmload.onclick="document.getElementById('filein').click();mjust=false"

tab0.add(btne)
tab1.add(colorlist)
tab1.add(newdraw)
tab1.add(savedraw)
mousepos.x=-30
mousepos.y=-30
tab0.hovered=true
tab0.press()
