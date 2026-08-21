process.nextTick(()=>{
    console.log("Nexttrick loaded")
})
new Promise ((resolve,reject)=>{
    let success=false;
    if(success){
        console.log("Page is sucessful loaded");
    }
    else{
        console.log("Page not loaded");
    }
}).then((message)=>{
    console.log(message);
}).catch((message)=>{
    console.log(message);
})
// if we use cjs then nextTrick
