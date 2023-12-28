import { Request, Response, NextFunction } from "express-serve-static-core";
import { createAdminPaths } from "../utils/routes.helper";
import { Product } from "../models/product";

const routePrefix = 'admin';

function getAddProduct(req: Request, res: Response, next: NextFunction) {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));    
    res.render(`${routePrefix}/edit-product`, {
        pageTitle: 'AddProduct',
        path: `${routePrefix}/add-product`,
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
    product.create();

    res.redirect('/');
}

function getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode: boolean = req.query.edit === 'true';

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = parseInt(req.params.productId);

    if (!productId) {
        return res.redirect('/');
    }

    Product.findById(productId, (product: Product) => {
        if (!product) {
            return res.redirect('/');
        }

        res.render(`${routePrefix}/edit-product`, {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product,
            activeAddProduct: true,
            formsCSS: true,
            productCSS: true
        });
    });
}

function postEditProduct(req: Request, res: Response, next: NextFunction) {
    const product: Product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price,
        req.body.id
    );
    product.update();
    res.redirect(`/${routePrefix}/products`);
}


function getProducts(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll((products: Product[]) => {
        res.render(`${routePrefix}/products`, {
            prods: products,
            hasProducts: products.length > 0,
            pageTitle: 'Admin Products',
            path: `${routePrefix}/products`,
            activeAdminProducts: true,
            productCSS: true
        });
    })
}

function postDeleteProduct(req: Request, res: Response, next: NextFunction){
    const id = parseInt(req.body.id);
    Product.delete(id);
    res.redirect(`/${routePrefix}/products`);
}

export {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}