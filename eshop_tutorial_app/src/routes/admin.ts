import express from 'express';
// import path from 'path';

// import { rootDir } from '../utils/path';
import { getAddProduct, postAddProduct } from '../controllers/productsController';

const router = express.Router();



//express has methods for each REST verb

// admin
// add-product GET
router.get('/add-product', getAddProduct);

// add-product POST
router.post('/add-product', postAddProduct);

export {
    router as adminRouter
}