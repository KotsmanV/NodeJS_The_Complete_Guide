const express = require('express');

const app = express();

// app.use('/users', (req, res, next) => {
//     console.log(`this is the 2nd middleware`);
//     next();
// });

app.use('/users', (req, res, next) => {
    console.log(`this is the users page`);
    res.send(`
        <h1>This is the users page</h1>
    `);
});

// app.use('/', (req, res, next) => {
//     console.log(`this is the 1st middleware`);
//     next();
// });

app.use('/', (req, res, next) => {
    console.log(`this is the homepage`);
    res.send(`
        <h1>This is the homepage</h1>
    `);
    res.end();
});

app.listen(3030);