let current_tab="code"
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
    update(){
        if(this.hovered||this.active||current_tab==this.text){
            this.color=color(2)
        }
        
        this.y =this.parent.children.indexOf(this)*8+this.parent.y
        super.update()
        
        ctx.fillStyle=this.fcolor;
        let px=this.x+this.size.x/2-ctx.measureText(this.text).width/2
        let py=this.y+this.size.y/2+2
        
        ctx.fillText(this.text,px,py);
        this.color=color(4)
        
    }
    press(){
        current_tab=this.text;
        if(this.text=="code"){
            document.getElementById("objects").style.visiblility="visible";
            document.getElementById("objects").style.display="block";
        }else{
            document.getElementById("objects").style.visiblility="hidden";
            document.getElementById("objects").style.display="none";
        }
        if(currentactive!=null&&currentactive.children.length!=0){currentactive.children[0].visible=false;}
        if(this.children.length!=0){this.children[0].visible=true;}
    }
    add(child){super.add(child);child.visible=false}
}

class drawing extends object{
    constructor(px=0,py=0,size=new v2(64,64)){
        super()
        this.x=px
        this.y=py
        this.size=size
        this.texture=new Image(8,8)
        this.texture=new texture()
        this.texture.setpixel(0,0,2)
    }
    update(px,py){
        super.update(128+px,0)
        ctx.drawImage(this.texture.img,23,16,64,64)
        if(this.hovered){
            ctx.strokeRect(Math.round(mousepos.x/8)*8,Math.round(mousepos.y/8)*8+1,6,6)
        }
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