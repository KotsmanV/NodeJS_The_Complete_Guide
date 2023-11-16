import express from 'express';
import path from 'path';

import { rootDir } from '../utils/path';

const router = express.Router();

//express has methods for each REST verb

// admin
// add-product GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// add-product POST
router.post('/add-product', (req, res, post) => {
    console.log(req.body);
    res.redirect('/');
});

export{
    router as adminRouter
}