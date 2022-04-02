const colors=['#caa982','#aa8085','#856440','#4a473a','#b96f2c','#774024','#4e2823','#8b9a3b','#397a41','#2c403c','#629cc5','#67628a','#36445a','#707068','#33333a','#182029']
function color(id=0){return colors[id]}
class cam{constructor(x=0,y=0){this.x=0;this.y=0}}
class v2{
    constructor(x,y){
        this.x=x;this.y=y
    }
}
class texture{
    constructor(data=null){
        this.d=ctx.createImageData(8,8)
        this.img = document.createElement('canvas')
        this.img.width=8;
        this.img.height=8;
    }
    setpixel(x,y,id){
        let col={"r":0,"g":0,"b":0,"a":0}
        if(id!=-1){
        col =hexToRgb(color(id))
        col["a"]=255
        }
        this.d.data[(x+y*8)*4]=col.r
        this.d.data[(x+y*8)*4+1]=col.g
        this.d.data[(x+y*8)*4+2]=col.b
        this.d.data[(x+y*8)*4+3]=col.a
        this.img.getContext("2d").putImageData(this.d,0,0)
    }
}
class object{
    constructor(){
        this.snap=true
        this.collide=true
        this.children=[]
        this.parent=null
        this.x=0;this.y=0;
        this.hovered=false;
        this.size=new v2(0,0)
        this.visible=true
        this.active=false
        this.toggle=false;
        this.done=false
        this.onclick="";
        this.onhover="";
    }
    press(){}
    add(child){
        this.children.push(child)
        child.parent=this
    }
    moveWithCollision(dist){

        let x=Math.round((this.x)/8)+dist.x
        let y=Math.round((this.y)/8)+dist.y
        x=Math.min(Math.max(x,0),15)
        y=Math.min(Math.max(y,0),15)
        for(let collision of collisionobjects){
            if(collision.checkcollision(x,y)){
                return false
            }
        }
        this.x=x*8;this.y=y*8;
        return true
    }
    update(ax=0,ay=0){
        if(!this.visible){return}
        let x=ax+this.x;let y=ay+this.y
        for(let child of this.children){
            child.update(x,y)}
        this.checkhover(x,y)
        if(!mpressed){this.done=false}
    }
        
    checkhover(x,y){
        this.hovered=mousepos.x>=x&&mousepos.x<=x+this.size.x&&mousepos.y>=y&&mousepos.y<=this.size.y+y
        if(this.hovered){current_hover=this}
        
    }
    checkcollide(x,y,obj){
        if(!this.collide){return [false,null]}
        if(obj!=this&&((this.x<x+obj.size.x&&this.x+this.size.x>x)&&(this.y<y+obj.size.y&&this.y+this.size.y>y))){return [true,this]}
        for(let child of this.children){if(child.checkcollide(x,y,obj)[0]){return [true,child]}}
        return [false,null]

    }
}


class box extends object{
    constructor(x=0,y=0,size=new v2(8,8),colorse=colors[0]){
        super()
        this.x=x;
        this.y=y;
        this.size=size;
        this.color=colorse;
    }
    update(ax=0,ay=0){
        
        if(!this.visible){return}
        ctx.fillStyle=this.color;
        let nx=ax+this.x;
        let ny=ay+this.y;
        ctx.fillRect(Math.round(nx),Math.round(ny),this.size.x,this.size.y)
        super.update(ax,ay)
    }
}
    

class label extends object{
    constructor(text="",x=0,y=0,colors=color(0)){
        super()
        this.text=text;
        this.x=x;this.y=y;
        this.color=colors
    }
    update(ax=0,ay=0){
        this.collide=false
        if(!this.visible){return}
        ctx.fillStyle=this.color;
        let nx=round(ax+this.x);let ny=round(ax+this.y);
        super.update(ax,ay);
        ctx.fillText(this.text,Math.round(nx),Math.round(ny))
        
    }
}

class btn extends object{
    constructor(text="",x=0,y=0,fcolrs=0,colres=1,hovercol=3){
        super()
        this.collide=false
        fcolrs=colors[fcolrs]
        colres=colors[colres]
        let s=ctx.measureText(text);
        this.size.x=Math.round(s.width*1.125);
        this.size.y=7*text.split("\n").length-1;
        this.x=x;
        this.y=y;
        this.color=colres
        this.fcolor=fcolrs;
        this.hcolor=colors[hovercol];
        this.text=text;
    }
    update(ax=0,ay=0){
        if(!this.visible){return}
        if(this.hovered&&!mjust){ctx.fillStyle=this.hcolor}else{ctx.fillStyle=this.color}
        if(this.hovered&&mjust){this.press()}
        
        ctx.fillRect(this.x+ax,this.y+ay,this.size.x,this.size.y)
        ctx.fillStyle=this.fcolor;
        ctx.fillText(this.text,Math.round(ax+this.x),Math.round(ay+this.y+this.size.y));
        super.update(ax,ay)
        
    }
    press(){
        if(!mpressed){return}
        eval(this.onclick);this.done=true
        mjust=false
    }
}

class sprite extends object{
    constructor(x=0,y=0,texture=""){
        super()
        this.flip_h=false
        this.flip_v=false
        this.texture=loadtex(texture)
        this.x=x
        this.y=y
        this.size=new v2(8,8)
    }
    update(ax,ay){
        if(!this.visible){return}
        super.update(ax,ay)
        let fh=1-(this.flip_h*2)
        let fv=1-(this.flip_v*2)
        if(this.flip_v||this.flip_h){
            ctx.scale(fh,fv)
        }
        ctx.drawImage(this.texture,Math.round(ax+this.x+(8*(fh==-1)))*fh,Math.round(ay+this.y+(8*(fv==-1)))*fv)
        if(this.flip_v||this.flip_h){
            ctx.scale(fh,fv)
        }

    }
}
class line extends object{
    constructor(x=0,y=0,start=new v2(0,0),end=new v2(0,0),width=1,col=colors[15]){
        super()
        this.x=x;this.y=y;
        this.start=start;this.end=end;
        this.width=width;
        this.color=col;
    }
    update(ax=0,ay=0){
        if(!this.visible){return}
        super.update(ax,ay)
        ctx.lineWidth=this.width;
        ctx.strokeStyle=this.color+"ff"
        ctx.beginPath()
        ctx.moveTo(this.start.x+this.x,this.start.y+this.y)
        ctx.lineTo(this.end.x+this.x,this.end.y+this.y)
        ctx.stroke()
    }
}





//interpolator
const interp={
    "parent":null,
    "interps":[],
    addinterp(obj,val,end,duration){
        let nint=[obj,val,obj[val],end,duration,0]
        this.interps.push(nint)
    },
    update(){
        for(let interp of this.interps){
            interp[0][interp[1]]=interp[2]+(interp[3]-interp[2])*(interp[5]/interp[4])
            interp[5]+=0.05;
            if(interp[5]>=interp[4]){
                interp[0][interp[1]]=interp[3]
                this.interps.splice(this.interps.indexOf(interp),1)
        }
        
    }
}
}