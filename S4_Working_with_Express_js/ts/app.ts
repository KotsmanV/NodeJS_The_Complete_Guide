import express from 'express';
import bodyParser from 'body-parser';

import { adminRouter } from './routes/admin';
import { shopRouter } from './routes/shop';

const app = express();

//body parser should be before all handlers
//registers a middleware that parses the request
//urlencoded() parses form requests
//return an key value pair object
app.use(bodyParser.urlencoded({ extended: false }));

//filter the request through middlewares
//calling next() to proceed
//until the response is sent
// app.use('/add-product',(req, res, next)=>{
//     console.log(`this always runs`);    
//     next();
// });

//express has methods for each REST verb

app.use(adminRouter);
app.use(shopRouter);

app.listen(3000);