import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../models/product";
import { title } from "process";
import { createAdminPaths, createShopPaths } from "../utils/routes.helper";
import { ViewDTO } from "../models/viewDto";

function getAddProduct(req: Request, res: Response, next: NextFunction) {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));    
    res.render(createAdminPaths("add-product"), {
        pageTitle: 'AddProduct',
        path: createAdminPaths("add-product"),
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
        res.render(createShopPaths("shop"), {
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