
function saveStaticDataToFile(data) {
    var blob = new Blob([data],
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "static.txt");
}

function saveAll(){
    let data={"code":"","Images":{}}
    data.code=document.getElementById("scriptinput").value
    data.Images=imagelist
    for(id in imagelist){
    let a=Object.values(imagelist[id].getContext("2d").getImageData(0,0,8,8).data)
    data.Images[id]=a
    }
    saveStaticDataToFile(JSON.stringify(data))
    
}
function loadFiile(fileToLoad){
    var fr = new FileReader();
    fr.onload = function(e) {
    content = e.target.result; // here is the loaded content;
    finishload(content)
    }
    fr.readAsText(fileToLoad);
}
function finishload(data){
    data=JSON.parse(data)
    let code = data.code;
    let images=data.Images;
    imagelist={}
    for(let [key,value] of Object.entries(images)){
       createtexture(key,value)
    }
    document.getElementById("scriptinput").value=code
    checkinput()
}
function loadfile(){
    let inp=document.getElementById("filein")
    if(inp.files.length==0){return}
    loadFiile(inp.files[0])
}

function createtexture(name,data){
    let a=document.createElement("canvas")
    let ctx=a.getContext("2d")
    a.width=8;a.height=8;
    let d=ctx.createImageData(8,8)
    for(let x=0;x<8;x++){for(let y=0;y<8;y++){
        d.data[(x+y*8)*4]=data[(x+y*8)*4]
        d.data[(x+y*8)*4+1]=data[(x+y*8)*4+1]
        d.data[(x+y*8)*4+2]=data[(x+y*8)*4+2]
        d.data[(x+y*8)*4+3]=data[(x+y*8)*4+3]
    }}
    ctx.putImageData(d,0,0)
    imagelist[name]=a
}