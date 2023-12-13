import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../models/product";
import { title } from "process";
import { createAdminPaths, createShopPaths } from "../utils/routes.helper";
import { ViewDTO } from "../models/viewDto";


function getIndex(req: Request, res: Response, next: NextFunction){
    Product.fetchAll((products:Product[]) => {
        res.render(createShopPaths("index"), {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeIndex: true,
            productCSS: true
        });
    })
}

function getProducts(req: Request, res: Response, next: NextFunction) {
    // __dirname:   GLOBAL VARIABLE which holds the absolute path for the folder
    //              this file exists in
    //              on the OS for the current project
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.fetchAll((products:Product[]) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    })
}

function getCart(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products:Product[]) => {
        res.render(createShopPaths("cart"), {
            pageTitle: 'Cart',
            path: createShopPaths("cart"),
            activeCart: true,
            productCSS: true
        });
    })
}

function getOrders(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products:Product[]) => {
        res.render(createShopPaths("orders"), {
            pageTitle: 'Your Orders',
            path: createShopPaths("orders"),
            activeOrders: true,
            productCSS: true
        });
    })
}

function getCheckout(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products:Product[]) => {
        res.render(createShopPaths("checkout"), {
            pageTitle: 'Checkout',
            path: createShopPaths("checkout"),
            productCSS: true
        });
    })
}



export {
    getIndex,
    getProducts,
    getCart,
    getCheckout,
    getOrders
}