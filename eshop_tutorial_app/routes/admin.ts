import express from 'express';
import path from 'path';

import { rootDir } from '../utils/path';

const router = express.Router();


const products: {}[] = [];
//express has methods for each REST verb

// admin
// add-product GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { pageTitle: 'AddProduct', path: 'add-product' });
});

// add-product POST
router.post('/add-product', (req, res, post) => {
    products.push({
        title: req.body.title
    });

    console.log(req.body);
    res.redirect('/');
});

export {
    router as adminRouter,
    products
}