"use strict"
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('hbs', handlebars.engine({
    extname:'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(router);
app.listen(3002);