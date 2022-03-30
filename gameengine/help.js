document.addEventListener("wheel",function(ev){
    console.log(ev)
    document.getElementById("body").scrollBy(0,ev.deltaY*0.1)
})