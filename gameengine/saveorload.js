
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
function loadFile(fileToLoad){
    var fr = new FileReader();
    fr.onload = function(e) {
    content = e.target.result; // here is the loaded content;
    finishload(content)
    }
    fr.readAsText(fileToLoad);
}
function finishload(data){
    console.log(data)
}
function loadfile(){
    let inp=document.getElementById("filein")
    if(inp.files.length==0){return}
    
    let output=document.createElement("output")
    output.src=URL.createObjectURL(inp.files[0])
    output.onload=function(){
        loadfile(this.src)
        URL.revokeObjectURL(output.src)
        console.log("a")
    }
}