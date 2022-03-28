class v2{
    constructor(x,y){
        this.x=x;this.y=y
    }
}
class clr{
    constructor(r=0.,g=0.,b=0.){
        this.r=r;this.g=g;this.b=b;
    }
    asHex(){return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);}
    
}

class object{
    constructor(){
        this.children=[]
        this.x=0;this.y=0;
        this.hovered=false;
        this.size=new v2(0,0)
    }

    add(child){
        this.children.push(child)
    }


    update(ax=0,ay=0){
        let x=ax+this.x;let y=ay+this.y
        this.checkhover(x,y)
        for(let child of this.children){child.update(x,y)}}
    checkhover(x,y){
        this.hovered=mousepos.x>=x&&mousepos.x<=x+this.size.x&&mousepos.y>=y&&mousepos.y<=this.size.y+y
        if(this.hovered){current_hover=this}}

}


class box extends object{
    constructor(x,y,size=new v2(1,1),color=new clr(255,255,255)){
        super()
        this.x=x;
        this.y=y;
        this.size=size;
        this.color=color;
    }
    update(ax=0,ay=0){
        super.update()
        ctx.fillStyle=this.color.asHex();
        let nx=ax+this.x;
        let ny=ay+this.y;
        ctx.fillRect(nx,ny,this.size.x,this.size.y)

    }
}
    

class label extends object{
    constructor(text="",x=0,y=0,color=new clr(255,255,255)){
        super()
        this.text=text;
        this.x=x;this.y=y;
        this.color=color
    }
    update(ax=0,ay=0){
        super.update();
        ctx.fillStyle=this.color.asHex();
        let nx=ax+this.x;let ny=ax+this.y;
        ctx.fillText(this.text,nx,ny)
    }
}
