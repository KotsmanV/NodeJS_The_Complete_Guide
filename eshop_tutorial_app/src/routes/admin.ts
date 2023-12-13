import express from 'express';
import { getAddProduct, getProducts, postAddProduct } from '../controllers/adminController';
// import path from 'path';

// import { rootDir } from '../utils/path';

const router = express.Router();

//express has methods for each REST verb

// admin
// add-product GET
router.get('/add-product', getAddProduct);
router.get('/products', getProducts);

// add-product POST
router.post('/add-product', postAddProduct);

export {
    router as adminRouter
}