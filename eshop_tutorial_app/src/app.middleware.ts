import express from 'express';

const app = express();

app.use((req, res, next)=>{

    //use the next() to allow the request 
    //to proceed to the next middleware
    next();
});

app.use((req, res, next)=>{
    console.log(`this is the second middleware`);

    //Headers are set automatically
    //Can be overwritten if needed
    res.send(`<h1>This is express</h1>`)
});

app.listen(3000);