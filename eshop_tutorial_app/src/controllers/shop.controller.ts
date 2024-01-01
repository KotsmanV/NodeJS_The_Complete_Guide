import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../data.access/model.definitions";
import { Model } from "sequelize";
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
    //@ts-ignore
    getUserCart(req).then(cart => {
        console.log(cart);
        //@ts-ignore
        return cart.getProducts().then(cartProducts => {
            const products = cartProducts.map(cp => {
                return {
                    product: cp.dataValues,
                    quantity: cp.cart_item.quantity
                }
            });


            res.render(`${routePrefix}/cart`, {
                pageTitle: 'Cart',
                path: `${routePrefix}/cart`,
                products: products,
                cartIsEmpty: products.length == 0,
                activeCart: true,
                productCSS: true,
                cartCSS: true
            });
        })
    }).catch(error => console.log(error));


    // Cart.getCart((cart: Cart) => {
    //     Product.findAndCountAll().then(result => {
    //         const cartProducts: {}[] = [];

    //         result.rows.forEach(p => {
    //             let cartProductData = cart.products.find(cp => cp.id === p.dataValues.id);
    //             if (cartProductData) {
    //                 cartProducts.push({
    //                     product: p.dataValues,
    //                     quantity: cartProductData.quantity
    //                 })
    //             }
    //         });

    //         res.render(`${routePrefix}/cart`, {
    //             pageTitle: 'Cart',
    //             path: `${routePrefix}/cart`,
    //             products: cartProducts,
    //             cartIsEmpty: cartProducts.length == 0,
    //             activeCart: true,
    //             productCSS: true
    //         });
    //     })
    // })
}

function postCart(req: Request, res: Response, next: NextFunction) {
    const productId: number = parseFloat(req.body.productId);

    let userCart;
    let quantity = 1;

    getUserCart(req).then(cart => {
        userCart = cart;
        //@ts-ignore
        return cart.getProducts({ where: { id: productId } })
    }).then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const existingQuantity = product.cart_item.quantity + 1;
            quantity = existingQuantity;
            return product;
        }
        return Product.findByPk(productId);
    }).then(product => {
        return userCart.addProduct(product, {
            through: {
                quantity: quantity
            }
        })
    }).then(result => {
        res.redirect('/cart');
    })


    // Product.findByPk(productId).then(product => {
    //     // Cart.addProduct(productId, product?.dataValues.price);
    // });

}

function postCartRemoveItem(req: Request, res: Response, next: NextFunction) {
    const productId = parseInt(req.body.productId);

    getUserCart(req).then(cart => {
        //@ts-ignore
        return cart.getProducts({ where: { id: productId } })
    }).then(products => {
        return products[0].cart_item.destroy();
    }).then(result => {
        res.redirect('/cart');
    }).catch(error => console.log(error));

    // Product.findByPk(productId).then(product => {
    //     //Cart.deleteProduct(productId, product?.dataValues.price);
    // });
}

function getOrders(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    req.user.getOrders({ include: ['products'] }).then(orders => {
        let userOrders = orders.map(o => {
            return {
                order: o.dataValues,
                products: o.products.map(p => {
                    return {
                        product: p.dataValues,
                        quantity: p.order_item.quantity
                    }
                })
            }
        });

        res.render('shop/orders', {
            pageTitle: 'Orders',
            path: '/orders',
            orders: userOrders,
            hasNoOrders: userOrders.length === 0,
            activeOrders: true,
            productCSS: true,
            cartCSS: true
        })
    })
}

function getCheckout(req: Request, res: Response, next: NextFunction) {
    let orderProducts;
    let userCart;
    getUserCart(req).then(cart => {
        userCart = cart;
        //@ts-ignore
        return cart.getProducts();
    }).then(products => {
        orderProducts = products;
        //@ts-ignore
        return req.user.createOrder();
    }).then(order => {
        return order.addProducts(orderProducts.map(p => {
            p.order_item = {
                quantity: p.cart_item.quantity
            };
            return p;
        }));
    }).then(result => {
        return userCart.setProducts(null);
    }).then(result => {
        res.redirect(`/orders`);
    }).catch(error => console.log(error));
}

function getUserCart(req: Request): Promise<Model<any, any>> {
    //@ts-ignore
    return req.user.getCart().then(cart => { return cart }).catch(error => console.log(error));
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