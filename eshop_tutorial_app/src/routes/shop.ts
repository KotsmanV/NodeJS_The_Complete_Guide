import express from 'express';
// import path from 'path';

// import { rootDir } from '../utils/path';
import { getCart, getCheckout, getIndex, getOrders, getProducts } from '../controllers/shopController';


const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

export {
    router as shopRouter
}