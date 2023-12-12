import express from 'express';
// import path from 'path';

// import { rootDir } from '../utils/path';
import { getProducts } from '../controllers/productsController';


const router = express.Router();

router.get('/', getProducts);
router.get('/products', getProducts);
router.get('/cart', getProducts);

export {
    router as shopRouter
}