import express from 'express';
import { 
    postDeleteProduct, 
    getAddProduct, 
    getEditProduct, 
    getProducts, 
    postAddProduct, 
    postEditProduct 
} from '../controllers/admin.controller.';
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

router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct)

export {
    router as adminRouter
}