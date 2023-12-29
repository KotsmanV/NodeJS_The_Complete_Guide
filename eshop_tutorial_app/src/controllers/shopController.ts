import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../models/product";
import { title } from "process";
import { createAdminPaths, createShopPaths } from "../utils/routes.helper";
import { ViewDTO } from "../models/viewDto";
import { Cart } from "../models/cart";

const routePrefix = 'shop';


function getIndex(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products: Product[]) => {
        res.render(`${routePrefix}/index`, {
            prods: products,
            pageTitle: 'Shop',
            path: '/shop',
            hasProducts: products.length > 0,
            activeShop: true,
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
    Product.fetchAll((products: Product[]) => {
        res.render(`${routePrefix}/product-list`, {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeProducts: true,
            productCSS: true
        });
    })
}

function getProduct(req: Request, res: Response, next: NextFunction) {
    const productId = parseFloat(req.params.productId);
    Product.findById(productId, (product: Product) => {
        res.render(`${routePrefix}/product-details`, {
            product: product,
            pageTitle: `Details: ${product.title}`,
            activeProducts: true,
            productCSS: true,
            path: `/products`
        })
    });
}

function getCart(req: Request, res: Response, next: NextFunction) {
    Cart.getCart((cart: Cart) => {
        Product.fetchAll((products: Product[]) => {
            const cartProducts: { product: Product, quantity: number }[] = [];

            products.forEach(p => {
                let cartProductData = cart.products.find(cp => cp.id === p.id);
                if (cartProductData) {
                    cartProducts.push({
                        product: p,
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
    });
}

function postCart(req: Request, res: Response, next: NextFunction) {
    const productId: number = parseFloat(req.body.productId);

    Product.findById(productId, (product: Product) => {
        Cart.addProduct(productId, product.price);
    })

    res.redirect('/cart');
}

function postCartRemoveItem(req: Request, res: Response, next: NextFunction){
    const productId = parseInt(req.body.productId);

    Product.findById(productId, (product:Product)=>{
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart')
    })

}

function getOrders(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products: Product[]) => {
        res.render(`${routePrefix}/orders`, {
            pageTitle: 'Your Orders',
            path: createShopPaths("orders"),
            activeOrders: true,
            productCSS: true
        });
    })
}

function getCheckout(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products: Product[]) => {
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
    getProduct,
    getCart,
    postCart,
    postCartRemoveItem,
    getCheckout,
    getOrders
}