

let screen=document.getElementById("screen")
let ctx=screen.getContext("2d")
ctx.shadowBlur=0;
ctx.shadowOffsetX=0
ctx.shadowOffsetY=0
ctx.font="1rem base"
window.onresize=update_size;
update_size()
ctx.imageSmoothingEnabled=false
let current_hover=null;
let currentactive=null;
function update_size(){
    var max_size=Math.min(window.innerWidth,window.innerHeight)
    screen.style.minWidth=max_size
    screen.style.minHeight=max_size
    screen.style.maxWidth=max_size
    screen.style.maxHeight=max_size
    screen.style.marginLeft=(window.innerWidth)/2-(max_size/2)
    document.getElementById("objects").style=screen.style
    document.getElementById("objects").style.transform="scale("+max_size/128+","+max_size/128+") translate(112px,56px)"

}
document.getElementById("objects").style.backgroundColor=color(5)
let mousepos=new v2(0,0)

/*editor setup*/
let root =new object()
let tabcont=new object();
let tab0=new Tab(vector2(16,8),"code")
let tab1=new Tab(vector2(16,8),"art")
root.add(tabcont)
tabcont.add(tab0)
tabcont.add(tab1)


var background=color(6)



/*input events*/
screen.addEventListener('mousemove',function(ev){
    if(currentactive!=null){currentactive.active=false};
    if(current_hover!=null){current_hover.active=false}
    var max_size=Math.min(window.innerWidth,window.innerHeight)
    let mx=(ev.pageX-(screen.style.marginLeft.split("px")[0]))/max_size*128;
    let my=(ev.pageY)/max_size*128;
    mousepos.x=mx;
    mousepos.y=my;})
document.getElementById("scriptinput").addEventListener("input",checkinput)
screen.addEventListener('mousedown',function(){
    if(current_hover==null||current_hover.hovered!=true){return}
    if(currentactive!=null){currentactive.active=false}
    current_hover.press()
    currentactive=current_hover
    
})
function checkinput(){
    let n=this;
    if(this==window){n=document.getElementById("scriptinput")}
    let returned=n.value
    let sbod =document.getElementById('scriptbody')
    sbod.innerHTML=returned;hljs.highlightElement(sbod)
}
checkinput()
/*the process function for every frame*/
let timer = setInterval(function(){
    ctx.clearRect(0,0,128,128)
    ctx.fillStyle=background
    ctx.fillRect(0,0,128,128)
    root.update()
}, 50);


/*putting rest of scene here*/
let codetitle=new label("code",-56,-104,color(7))
tab0.add(codetitle)
currentactive=tab0
let artback=new box(-106,8,vector2(96,96),color(3))
tab1.add(artback)
let draw=new drawing(0,0,vector2(64,64));
artback.add(draw)
codetitle.visible=true
