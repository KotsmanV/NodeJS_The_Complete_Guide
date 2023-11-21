import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as handlebars from 'express-handlebars';

import { adminRouter } from './routes/admin';
import { shopRouter } from './routes/shop';

const app = express();


//register the templating engine
//for handlebars, the registered name can be used as the file extension
// ex. handlebars, hbs
app.engine('hbs', handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
    // helpers:{
    //     'ifGreaterThan' : (val1:number, val2:number)=>{
    //         return .fn(this);
    //         return val1 > val2;
    //     },
    //     'ifEquals' : (val1:number, val2:number)=>{
    //         return val1 === val2;
    //     }
    // }
}));

//set gives access to node variables
//see documentation

//use this approach if the templating engine is built in express
app.set('view engine', 'hbs');
// app.set('view engine','pug');
app.set('views', 'views');



//body parser should be before all handlers
//registers a middleware that parses the request
//urlencoded() parses form requests
//return an key value pair object
app.use(bodyParser.urlencoded({ extended: false }));
//Use this function to serve static files
//Should be pointed towards a relevant folder
//Can be used multiple times and point to different folders
app.use(express.static(path.join(__dirname, 'public')));

//filter the request through middlewares
//calling next() to proceed
//until the response is sent
// app.use('/add-product',(req, res, next)=>{
//     console.log(`this always runs`);    
//     next();
// });

//express has methods for each REST verb

//path variable works as a prefix
app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', 'page_not_found.html'));
    res.status(404).render('page_not_found', { pageTitle: 'Page not found' })
});

app.listen(3001);