import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { adminRouter } from './routes/admin';
import { shopRouter } from './routes/shop';

const app = express();

//set gives access to node variables
//see documentation
app.set('view engine','pug');
app.set('views','views');

//body parser should be before all handlers
//registers a middleware that parses the request
//urlencoded() parses form requests
//return an key value pair object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

//filter the request through middlewares
//calling next() to proceed
//until the response is sent
// app.use('/add-product',(req, res, next)=>{
//     console.log(`this always runs`);    
//     next();
// });

//express has methods for each REST verb

//path variable works as a prefix
app.use('/admin',adminRouter);
app.use(shopRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', 'page_not_found.html'));
});

app.listen(3000);