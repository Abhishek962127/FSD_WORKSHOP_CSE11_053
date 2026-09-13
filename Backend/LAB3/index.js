import http from 'http';

const port = 7000;

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (url === "/msg" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Welcome to lund backend");
    }
});

server.listen(port, () => {
    console.log(`Port running successfully on ${port}`);
});