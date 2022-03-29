const colors=['#caa982','#aa8085','#856440','#4a473a','#b96f2c','#774024','#4e2823','#8b9a3b','#397a41','#2c403c','#629cc5','#67628a','#36445a','#707068','#33333a','#182029']
function color(id=0){return colors[id]}

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


    update(ax=0,ay=0){
        if(!this.visible){return}
        let x=ax+this.x;let y=ay+this.y
        for(let child of this.children){child.update(x,y)}
        this.checkhover(x,y)
        if(!mpressed){this.done=false}
    }
        
    checkhover(x,y){
        this.hovered=mousepos.x>=x&&mousepos.x<=x+this.size.x&&mousepos.y>=y&&mousepos.y<=this.size.y+y
        if(this.hovered){current_hover=this}
        
    }

}


class box extends object{
    constructor(x,y,size=new v2(2,2),colorse=colors[0]){
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
        ctx.fillRect(nx,ny,this.size.x,this.size.y)
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
        
        if(!this.visible){return}
        ctx.fillStyle=this.color;
        let nx=ax+this.x;let ny=ax+this.y;
        super.update(ax,ay);
        ctx.fillText(this.text,nx,ny)
        
    }
}

class btn extends object{
    constructor(text="",x=0,y=0,fcolrs=0,colres=1,hovercol=3){
        super()
        fcolrs=colors[fcolrs]
        colres=colors[colres]
        let s=ctx.measureText(text);
        this.size.x=Math.round(s.width*2);
        this.size.y=7*text.split("\n").length-1;
        this.x=x
        this.y=y;
        this.color=colres
        this.fcolor=fcolrs;
        this.hcolor=colors[hovercol];
        this.text=text;
    }
    update(ax=0,ay=0){
        if(!this.visible){return}
        if(this.hovered&&!mpressed){ctx.fillStyle=this.hcolor}else{ctx.fillStyle=this.color}
        if(this.hovered&&mpressed&&!this.done){eval(this.onclick);this.done=true}
        
        ctx.fillRect(this.x+ax,this.y+ay,this.size.x,this.size.y)
        ctx.fillStyle=this.fcolor;
        ctx.fillText(this.text,ax+this.x,ay+this.y+this.size.y);
        super.update(ax,ay)
        
    }
}
class tilemap extends object{
    constructor(){
        super()
        this.x=0;
        this.y=0;
        this.tiles=[]
    }
    update(){
        super.update()

    }
}