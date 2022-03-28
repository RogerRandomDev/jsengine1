

let screen=document.getElementById("screen")
let ctx=screen.getContext("2d")
ctx.font="5px base"
window.onresize=update_size;
update_size()
let current_hover=null;
function update_size(){
    var max_size=Math.min(window.innerWidth,window.innerHeight)
    screen.style.minWidth=max_size
    screen.style.minHeight=max_size
    screen.style.maxWidth=max_size
    screen.style.maxHeight=max_size
    screen.style.marginLeft=(window.innerWidth)/2-(max_size/2)
}

let mousepos=new v2(0,0)


let root =new object()
let tab0=new tab(vector2(16,8),"code")
root.add(tab0)
let lbl=new label("test",0,10)
tab0.add(lbl)
var background="#ff0000"
screen.addEventListener('mousemove',function(ev){
    var max_size=Math.min(window.innerWidth,window.innerHeight)
    let mx=(ev.pageX-(screen.style.marginLeft.split("px")[0]))/max_size*128;
    let my=(ev.pageY)/max_size*128;
    mousepos.x=mx;
    mousepos.y=my;

})
screen.addEventListener('mousedown',function(){
    if(current_hover==null||current_hover.hovered!=true){return}
    if(current_hover.active!=null){current_hover}

})



let timer = setInterval(function(){
    ctx.fillStyle=background
    ctx.fillRect(0,0,128,128)
    root.update()
}, 50);