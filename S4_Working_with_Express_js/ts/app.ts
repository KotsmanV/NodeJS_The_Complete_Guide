import express from 'express';

const app = express();

//filter the request through middlewares
//calling next() to proceed
//until the response is sent
app.use('/add-product',(req, res, next)=>{
    console.log(`this always runs`);
    next();
});

app.use('/add-product',(req, res, next)=>{
    console.log(`this is the second middleware`);
    res.send(`<h1>Add product</h1>`)
});

app.use('/',(req, res, next)=>{
    console.log(`this is the second middleware`);
    res.send(`<h1>This is express</h1>`)
});

app.listen(3000);