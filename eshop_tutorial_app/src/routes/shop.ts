import express from 'express';
// import path from 'path';

// import { rootDir } from '../utils/path';
import { getCart, getCheckout, getIndex, getOrders, getProduct, getProducts } from '../controllers/shopController';


const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
//the part after the colon declares a dynamic route path
//if there is a similar route, it must be declared BEFORE the route with the dynamic part
//otherwise, it will never fire up if needed
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

export {
    router as shopRouter
}