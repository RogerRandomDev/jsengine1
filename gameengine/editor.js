class tab extends box{
    constructor(size=new v2(8,8),text){
        super(0,0,size)
        this.text=text;
        this.fcolor=color(0,0,0)
        this.x=96;
        this.y=64;
        this.active=false;
    }
    update(){
        let col ={'r':this.color.r,'g':this.color.g,'b':this.color.b}
        if(this.hovered||!this.active){
            this.color.r=128
            this.color.g=128
            this.color.b=128
        }
        super.update()
        this.color.r=col.r;this.color.g=col.g;this.color.b=col.b
        ctx.fillStyle=this.fcolor.asHex();
        let px=this.x+this.size.x/2-ctx.measureText(this.text).width/2
        let py=this.y+this.size.y/2+2
        ctx.fillText(this.text,px,py,32);
    }
}