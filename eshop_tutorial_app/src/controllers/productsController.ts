import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../models/product";
import { title } from "process";

function getAddProduct(req: Request, res: Response, next: NextFunction) {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));    
    res.render('add-product', {
        pageTitle: 'AddProduct',
        path: '/admin/add-product',
        activeAddProduct: true,
        formsCSS: true,
        productCSS: true
    });
}

function postAddProduct(req: Request, res: Response, next: NextFunction) {
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
}

function getProducts(req: Request, res: Response, next: NextFunction) {
    // __dirname:   GLOBAL VARIABLE which holds the absolute path for the folder
    //              this file exists in
    //              on the OS for the current project
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.fetchAll((products:Product[]) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    })
}

export {
    getAddProduct,
    postAddProduct,
    getProducts
}