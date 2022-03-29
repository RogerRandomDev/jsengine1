let current_tab="code"
let currentcolor=0
class Tab extends box{
    constructor(size=new v2(8,8),text){
        super(0,0,size)
        this.text=text;
        this.color=color(2)
        this.fcolor=color(3)
        this.x=112;
        this.y=64;
        this.active=false;
        this.toggle=true;
        
    }
    update(ax,ay){
        if(!this.visible){return}
        if(this.hovered||this.active||current_tab==this.text){
            this.color=color(2)
        }
        
        this.y =this.parent.children.indexOf(this)*8+this.parent.y
        super.update(ax,ay)
        
        ctx.fillStyle=this.fcolor;
        let px=ax+this.x+this.size.x/2-ctx.measureText(this.text).width/2
        let py=ay+this.y+this.size.y/2+2
        
        ctx.fillText(this.text,px,py);
        this.color=color(4)
        
    }
    press(){
        current_tab=this.text;
        if(this.text=="code"){
            document.getElementById("objects").style.visiblility="visible";
            document.getElementById("objects").style.userSelect="all";
            document.getElementById("objects").style.zIndex="1000";
            document.getElementById("objects").style.display="block";
        }else{
            document.getElementById("objects").style.visiblility="hidden";
            document.getElementById("objects").style.userSelect="none";
            document.getElementById("objects").style.zIndex="-1";
            document.getElementById("objects").style.display="none";
        }
        if(currentactive!=null&&currentactive.children.length!=0){for(let child of currentactive.children){child.visible=false;}}
        for(let child of this.children){child.visible=true;}
    }
    add(child){super.add(child);child.visible=false}
}

class drawing extends object{
    constructor(px=0,py=0){
        super()
        this.x=px
        this.y=py
        this.size=new v2(64,64)
        this.texture=new Image(8,8)
        this.texture=new texture()
        
        this.x=16
        this.y=24
        this.inputpoint=new v2(0,0)
    }
    update(px,py){
        this.visible=true
        ctx.drawImage(this.texture.img,23,32,64,64)
        if(this.hovered){
            this.inputpoint.x=Math.min(Math.max(Math.round(mousepos.x/8+0.5),4),11)
            this.inputpoint.y=Math.round(Math.min(Math.max((mousepos.y/8+0.5),5),12))
            ctx.strokeRect(this.inputpoint.x*8-8,this.inputpoint.y*8-7,6,6)
            if(mpressed){this.press()}
            
        }
        super.update(px,py-8)
    }
    press(){
        this.texture.setpixel(this.inputpoint.x-4,this.inputpoint.y-5,currentcolor)
    }
}
class colorpicker extends box{
    constructor(px,py,size=new v2(4,4),colrs=0){
        super(px,py,size,colors[colrs])
        this.color=colors[colrs]
        this.id=colrs
    }
    press(){
        currentcolor=this.id
    }
    update(px,py){
        
        if(currentcolor==this.id){
            ctx.fillStyle="#ffffff"
            ctx.fillRect(this.x+px-1,this.y+py-1,6,6)
        }
        if(this.hovered&&mpressed){this.press()}
        ctx.fillStyle=this.color
        
        ctx.fillRect(this.x+px,this.y+py,4,4)
        
        super.update(px,py)
    }
}









let scriptscroll=setInterval(function(){
    let a=document.getElementById("scriptinput")
    a.style.minHeight=a.scrollHeight
    a.style.minWidth=a.scrollWidth
    document.getElementById("scriptbody").style.minHeight=a.scrollHeight
    document.getElementById("scriptbody").style.minWidth=a.scrollWidth
}, 50);
let do_caret=true
let scriptcaret=setInterval(function(){
    do_caret=!do_caret
},675);


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