import http from "http";
import os from "os";
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
const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    const method = req.method;    
    if (reqUrl === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end("Welcome to backend");

    }
    else if (reqUrl =="/user" && method =="GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(arr));

    }
    else if (reqUrl == "/create" && method == "POST") {

        let body = "";

        req.on("data", (content) => {
            body += content;
        });

        req.on("end", () => {

            const data = JSON.parse(body);

            const newUser = {
                id: data.id,
                name: data.name,
                dept: data.dept,
                classs: data.classs
            };

            arr.push(newUser);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify({
                message: "User created successfully",
                user: newUser
            }));
        });
    }
    else if (reqUrl === "/sys" && method === "GET") {

        const data = {
            platform: os.platform(),
            IP: os.networkInterfaces()
        };

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(data));

    }
    else if (reqUrl.startsWith("/users/") && method === "GET") {

        const id = reqUrl.split("/")[2];

        console.log("Requested ID:", id);

        const match = arr.find((u) => {
            return u.id === Number(id);
        });

        if (!match) {
            res.statusCode = 404;
            return res.end("User not found");
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(match));
    }
    else if(reqUrl.startsWith("/users/") && method=="DELETE"){
        const id=reqUrl.split("/")[2];
        const index=arr.findIndex((u)=>u.id==id);
        if(index==-1){
            return res.end("elemet not present");
        }
        arr.splice(index,1);
        res.end("Deleted sucessfully");
    } 
    else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});
server.listen(4000, () => {
    console.log("Server is running on port 4000");
});