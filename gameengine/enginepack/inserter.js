const inserted=["nomath.js","saveorload.js","functions.js","objects.js","editor.js","script.js"]

for(let i=0;i<inserted.length;i++){
    setTimeout(() => {
    let n_insert=document.createElement("script")
    n_insert.src='./enginepack/'+inserted[i]
    n_insert.defer=true
    n_insert.type='text/javascript'
    document.body.appendChild(n_insert)
    }, 50*i);
    
}