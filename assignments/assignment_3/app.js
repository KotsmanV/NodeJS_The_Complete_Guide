//app.js

"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRouter = require('./routes/user.js');
const mainRouter = require('./routes/main');

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(userRouter);
app.use(mainRouter);


app.listen(3030);