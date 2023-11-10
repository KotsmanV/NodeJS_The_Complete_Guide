"use strict"

function requestHandler(req,res){
    const url = req.url;

    switch (url) {
        case '/': return handleHomePage(res);
        case '/users': return handleUsersPage(res);
        case '/create-user': return handleCreateUser(req, res);
        default:
            break;
    }
}

function handleHomePage(res){
    console.log(`homepage`);

    res.setHeader('Content-Type', 'text/html');
    
    const title = 'Welcome';
    const body = `
        <h1>Welcome to the first assignment for NodeJS!</h1>
        
        <form action="/create-user" method="POST">    
            <input type="text" name="username">
            <button type="submit">Create User</button>
        </form>
        `;

    res.write(createHtmlTemplate(title, body));
    return res.end();
}

function handleUsersPage(res){
    console.log(`users`);
    res.setHeader('Content-Type', 'text/html');

    const title = 'Users';
    const body = `
        <h1>Users</h1>
        <ul>
            <li>Gandalf</li>
            <li>Aragorn</li>
            <li>Boromir</li>
            <li>Legolas</li>
            <li>Gimli</li>
            <li>Frodo</li>
            <li>Sam</li>
            <li>Merry</li>
            <li>Pippin</li>
        </ul>
    `;

    res.write(createHtmlTemplate(title, body));
    return res.end();
}

function handleCreateUser(req, res){
    res.setHeader('Content-Type', 'text/html');
    
    if(req.method !== 'POST'){
        const title = 'error';
        const body = '<p>Wrong request type</p>';
        
        res.statusCode = 400;
        res.setHeader('Location','/error-page');
        res.write(createHtmlTemplate(title,body));
        return res.end();
    }

    const formContent = [];
    req.on('data',(chunk)=>{
        formContent.push(chunk);
    });
    return req.on('end',()=>{
        const parsedRequest = Buffer.concat(formContent).toString();
        console.clear();

        const splitReq = parsedRequest.split('=');
        console.log(`${splitReq[0]}:`, splitReq[1]);

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    })

    

}


function createHtmlTemplate(title, body){
    return `
            <html>
            <head>
                <title>${title}</title>
            </head>
            <body>${body}</body>
        </html>
    `;
}

module.exports = {
    handler:requestHandler
}
