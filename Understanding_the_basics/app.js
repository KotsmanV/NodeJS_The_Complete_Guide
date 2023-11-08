"use strict";
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);
    //process.exit();

    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write(`
        <html>
            <head>
                <title>Enter Message</title>
            </head>
            <body>
                <form action="/message" method="POST">    
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>
        `);
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        fs.writeFileSync('message.txt', '666');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write(`
    <html>
        <head>
            <title>First Page</title>
        </head>
        <body>
            <h1>Hello, Dave. This is HAL.</h2>
        </body>
    </html>
    `);
    res.end();
});

server.listen(3000); 
