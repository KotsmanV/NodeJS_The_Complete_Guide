import { Request, Response, NextFunction } from "express-serve-static-core";
import { createAdminPaths } from "../utils/routes.helper";
import { Product } from "../models/product";

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
    const product = new Product(
        req.body.title, 
        req.body.imageUrl, 
        req.body.description, 
        req.body.price
    );
    product.save();

    res.redirect('/');
}

function getProducts(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products:Product[]) => {
        res.render(createAdminPaths("products"), {
            prods: products,
            hasProducts: products.length > 0,
            pageTitle: 'Admin Products',
            path: createAdminPaths("products"),
            activeAdminProducts: true,
            productCSS: true
        });
    })
}

export {
    getProducts,
    getAddProduct,
    postAddProduct
}