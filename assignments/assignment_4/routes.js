"use strict"
const express = require('express');

const users = require('./users');

const router = express.Router();

router.get('/users', (req, res)=>{
    res.render('users',{
        pageTitle: 'users',
        users: users
    })
})

router.get('/',(req, res)=>{
    res.render('home',{
        pageTitle:'home'
    });
});

router.post('/add-user',(req,res)=>{
    users.push({
        name: req.body.username
    });
    res.redirect('/users');
})

module.exports = router;