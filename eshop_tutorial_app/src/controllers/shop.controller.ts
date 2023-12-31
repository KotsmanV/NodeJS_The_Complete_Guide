import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../models/database/product";
import { title } from "process";
import { createAdminPaths, createShopPaths } from "../utils/routes.helper";
import { ViewDTO } from "../models/viewDto";
import { Cart } from "../models/cart";
// import { User } from "../models/database/user";

const routePrefix = 'shop';


function getIndex(req: Request, res: Response, next: NextFunction) {
    Product.findAndCountAll()
        .then((result) => {
            res.render(`${routePrefix}/index`, {
                prods: result.rows.map(p => p.dataValues),
                hasProducts: result.count > 0,
                pageTitle: 'Shop',
                path: `/shop`,
                activeShop: true,
                productCSS: true
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function getProducts(req: Request, res: Response, next: NextFunction) {
    Product.findAndCountAll()
        .then((result) => {
            res.render(`${routePrefix}/product-list`, {
                prods: result.rows.map(p => p.dataValues),
                hasProducts: result.count > 0,
                pageTitle: 'All Products',
                path: `/products`,
                activeProducts: true,
                productCSS: true
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function getProduct(req: Request, res: Response, next: NextFunction) {
    const productId = parseFloat(req.params.productId);
    Product.findByPk(productId).then((product) => {
        res.render(`${routePrefix}/product-details`, {
            product: product?.dataValues,
            pageTitle: `Details: ${product?.dataValues.title}`,
            activeProducts: true,
            productCSS: true,
            path: `/products`
        })
    }).catch()
}

function getCart(req: Request, res: Response, next: NextFunction) {
    Cart.getCart((cart: Cart) => {
        Product.findAndCountAll().then(result => {
            const cartProducts: {}[] = [];

            result.rows.forEach(p => {
                let cartProductData = cart.products.find(cp => cp.id === p.dataValues.id);
                if (cartProductData) {
                    cartProducts.push({
                        product: p.dataValues,
                        quantity: cartProductData.quantity
                    })
                }
            });

            res.render(`${routePrefix}/cart`, {
                pageTitle: 'Cart',
                path: `${routePrefix}/cart`,
                products: cartProducts,
                cartIsEmpty: cartProducts.length == 0,
                activeCart: true,
                productCSS: true
            });
        })
    })
}

function postCart(req: Request, res: Response, next: NextFunction) {
    const productId: number = parseFloat(req.body.productId);

    Product.findByPk(productId).then(product => {
        Cart.addProduct(productId, product?.dataValues.price);
    });

    res.redirect('/cart');
}

function postCartRemoveItem(req: Request, res: Response, next: NextFunction) {
    const productId = parseInt(req.body.productId);

    Product.findByPk(productId).then(product => {
        Cart.deleteProduct(productId, product?.dataValues.price);
        res.redirect('/cart')
    });
}

function getOrders(req: Request, res: Response, next: NextFunction) {
    res.redirect(`/`);
}

function getCheckout(req: Request, res: Response, next: NextFunction) {
    res.redirect(`/`);
}

export {
    getIndex,
    getProducts,
    getProduct,
    getCart,
    postCart,
    postCartRemoveItem,
    getCheckout,
    getOrders
}