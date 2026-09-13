import express from "express";

const app=express()
const port=7000
app.use(express.json())
const arr = [
    {
        id: 111,
        name: "ABhi",
        dept: "Cse",
        classs: "Cse11",
    },
    {
        id: 102,
        name: "Abhitansu",
        dept: "Cse",
        classs: "Cse11",
    },
    {
        id: 101,
        name: "sonkar",
        dept: "Cse",
        classs: "Cse13",
    },
];
const registeredData=[];
app.get("/",(req,res)=>{
    // res.json({
    //     message:"welcome to server",
    // })
    res.status(200).json({
        message:"Welcome to Server",
        arr
    })
})
app.get("/user",(req,res)=>{
    try{
        res.status(200).json({
        message:"Welcome to Server",
        arr
    })
    }
    catch(error){
        console.log(`error found: ${error}`)
    }
})
app.post("/create",(req,res)=>{
    try{
        const{id,name,dept,classs}=req.body;
        const newUser={
            id,
            name,
            dept,
            classs,
        };
        arr.push(newUser);
        res.status(200).json({message:"user created sucessfully",newUser});
    }catch(error){
        console.log(`Error message ${error}`)
    }
})
app.get("/registered",(req,res)=>{
    res.status(200).json({
        users:registeredData,
    });
    // res.end(JSON.stringify(arr))
});
// app.get("/registered",(res,req)={

// // })
// app.delete()
app.get("/user/:id",(req,res)=>{
    try{
    const id=req.params.id;
    const search=arr.find((u)=>u.id==id);
    if(!search){
        return res.status(404).json({message:"Not found in array"});
    }
    // arr.splice(userId,1);
    arr.slice(id,1)
    return res.status(200).json({message:"Executed",id})
}
catch(error){
    console.log(`Message : ${error}`)
}
})
app.put("/edit/:id",(req,res)=>{
    try{
    const id=parseInt(req.params.id);
    const {name,dept,classs}=req.body;
    const search=arr.findIndex((u)=>u.id==id);
    if(search==-1){
        return res.status(404).json({message:"Not found in array"});
    }
    arr[search]={
        id:arr.length+1,
        name,
        dept,
        classs
    }
}
catch(error){
    console.log(`Message : ${error}`)
}
})
app.listen(port,()=>{
    console.log(`running on server ${port}`)
})