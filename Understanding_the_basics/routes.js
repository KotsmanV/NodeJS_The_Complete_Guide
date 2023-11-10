"use strict";
// const exec = require('child_process').exec;
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
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

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(`ck`, chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (error) => {
                //exec(getCommandLine() + ' ' + 'message.txt');

                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });

    }

    res.setHeader('Content-Type', 'text/html');
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

}

// module.exports = requestHandler;
module.exports = {
    handler:requestHandler,
    text: 'Some text'
};

//module can be omitted - Only in Node!
// module.exports.handler = requestHandler;
// module.exports.text = 'Some texts';



// function getCommandLine() {
//     switch (process.platform) {
//         case 'darwin': return 'open';
//         case 'win32': return 'start';
//         case 'win64': return 'start';
//         default: return 'xdg-open';
//     }
// }