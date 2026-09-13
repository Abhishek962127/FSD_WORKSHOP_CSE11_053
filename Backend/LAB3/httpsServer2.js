
import http from "http";
import fs from "node:fs/promises";

const filePath = "./userData.txt";

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url == "/msg" && method == "GET") {

        async function readFile() {
            try {
                const data = await fs.readFile(filePath, "UTF-8");
                res.end(data);
            } catch (error) {
                res.end("Error reading file");
            }
        }

        readFile();

    } else if (url == "/appen" && method == "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const data = JSON.parse(body);

                await fs.appendFile(filePath, data.content, "UTF-8");

                res.end("Data appended successfully");
            } catch (error) {
                res.end("Error: " + error.message);
            }
        });

    } else {
        res.end("Invalid route");
    }
});

server.listen(3000, () => {
    console.log("Port created");
});

