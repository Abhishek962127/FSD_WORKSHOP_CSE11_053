app.delete()
app.get("/user/:userId",(req,res)=>{
    try{
    const userId=req.params.id;
    const search=arr.find((u)=>u.id==userId);
    if(!search){
        return res.status(400).json({message:"Not found in array"});
    }
    // arr.splice(userId,1);
    return res.status(100).json({message:"Executed",userId})
}
catch(error){
    console.Console.log(`Message : ${error}`)
}
})