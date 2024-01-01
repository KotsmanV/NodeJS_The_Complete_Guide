import express from 'express';
import {
    getCart,
    getCheckout,
    getIndex,
    getOrders,
    getProduct,
    getProducts,
    postCart,
    postCartRemoveItem
} from '../controllers/shop.controller';
// import path from 'path';

// import { rootDir } from '../utils/path';


const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
//the part after the colon declares a dynamic route path
//if there is a similar route, it must be declared BEFORE the route with the dynamic part
//otherwise, it will never fire up if needed
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart)
router.post('/cart-remove-item', postCartRemoveItem)
router.get('/orders', getOrders);
router.post('/checkout', getCheckout);

export {
    router as shopRouter
}