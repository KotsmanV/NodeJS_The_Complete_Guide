import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import { adminRouter } from './routes/admin';
import { shopRouter } from './routes/shop';
import { get404 } from './controllers/shared.controller';

import { dbContext, initializeDatabase } from './data.access/database';
import { addUserToRequest } from './middleware/user.middleware';
import { authRouter } from './routes/auth';

const app = express();

//------------------------------------------------------------------------------
//register the templating engine
//for handlebars, the registered name can be used as the file extension
// ex. handlebars, hbs

app.engine('hbs', handlebars.engine({
    //the extension name has to be set explicitly if it's not 'handlebars'
    //this applies only for the main layout file
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: "src/views/layouts/",
    partialsDir: 'src/views/partials/',
    helpers: {
        'ifGreaterThan': (val1: number, val2: number) => {
            return val1 > val2;
        },
        'ifEquals': (val1: number, val2: number) => {
            return val1 === val2;
        }
    },
}));
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//set gives access to node variables
//see documentation
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//if the templating engine is not built in
//register it above and use the name entered
app.set('view engine', 'hbs');
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//use this approach if the templating engine is built in express
//app.set('view engine', 'ejs');
// app.set('view engine','pug');
app.set('views', 'src/views');

app.use(cookieParser());
//------------------------------------------------------------------------------
//body parser should be before all handlers
//registers a middleware that parses the request
//urlencoded() parses form requests
//return an key value pair object
app.use(bodyParser.urlencoded({ extended: false }));
//Use this function to serve static files
//Should be pointed towards a relevant folder
//Can be used multiple times and point to different folders
app.use(express.static(path.join(__dirname, 'public')));
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//filter the request through middlewares
//calling next() to proceed
//until the response is sent
// app.use('/add-product',(req, res, next)=>{
//     console.log(`this always runs`);    
//     next();
// });

//express has methods for each REST verb

app.use(addUserToRequest);



//path variable works as a prefix
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter);
app.use(get404);


initializeDatabase().then((result) => {
    console.log(`dbContext init: `, 'success' /*result*/);
    app.listen(3001);
}).catch(error => {
    console.log(`error: `, error);
});

