const colors=['#caa982','#aa8085','#856440','#4a473a','#b96f2c','#774024','#4e2823','#8b9a3b','#397a41','#2c403c','#629cc5','#67628a','#36445a','#707068','#33333a','#182029']
function color(id=0){return colors[id]}

class v2{
    constructor(x,y){
        this.x=x;this.y=y
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
    }

    add(child){
        this.children.push(child)
        child.parent=this
    }


    update(ax=0,ay=0){
        if(!this.visible){return}
        let x=ax+this.x;let y=ay+this.y
        this.checkhover(x,y)
        for(let child of this.children){child.update(x,y)}}
    checkhover(x,y){
        this.hovered=mousepos.x>=x&&mousepos.x<=x+this.size.x&&mousepos.y>=y&&mousepos.y<=this.size.y+y
        if(this.hovered){current_hover=this}
        
    }

}


class box extends object{
    constructor(x,y,size=new v2(1,1),colors=color(0)){
        super()
        this.x=x;
        this.y=y;
        this.size=size;
        this.color=colors;
    }
    update(ax=0,ay=0){
        super.update()
        if(!this.visible){return}
        ctx.fillStyle=this.color;
        let nx=ax+this.x;
        let ny=ay+this.y;
        ctx.fillRect(nx,ny,this.size.x,this.size.y)

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
        super.update();
        if(!this.visible){return}
        ctx.fillStyle=this.color;
        let nx=ax+this.x;let ny=ax+this.y;
        ctx.fillText(this.text,nx,ny)
    }
}
