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


let scriptscroll=setInterval(function(){
    let sx=document.getElementById("scriptinput").scrollLeft
    let sy=document.getElementById("scriptinput").scrollTop
    document.getElementById("scriptbody").scrollTo(sx-1,sy)
}, 50);
let do_caret=true
let scriptcaret=setInterval(function(){
    do_caret=!do_caret
},675);