import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../models/product";
import { Model } from "sequelize";

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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log(`Product create: `, result);
    })
        .catch(error => {
            console.log(`Product create: `, error);
        });

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

    // Product.findById(productId, (product: Product) => {
    //     if (!product) {
    //         return res.redirect('/');
    //     }

    //     res.render(`${routePrefix}/edit-product`, {
    //         pageTitle: 'Edit Product',
    //         editing: editMode,
    //         product: product,
    //         activeAddProduct: true,
    //         formsCSS: true,
    //         productCSS: true
    //     });
    // });
}

function postEditProduct(req: Request, res: Response, next: NextFunction) {
    // const product: Product = new Product(
    //     req.body.title,
    //     req.body.imageUrl,
    //     req.body.description,
    //     req.body.price,
    //     req.body.id
    // );
    // product.update();
    res.redirect(`/${routePrefix}/products`);
}


function getProducts(req: Request, res: Response, next: NextFunction) {
    Product.findAndCountAll()
        .then((result) => {
            res.render(`${routePrefix}/products`, {
                prods: result.rows.map(p => p.dataValues),
                hasProducts: result.count > 0,
                pageTitle: 'Admin Products',
                path: `${routePrefix}/products`,
                activeAdminProducts: true,
                productCSS: true
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function postDeleteProduct(req: Request, res: Response, next: NextFunction) {
    // const id = parseInt(req.body.id);
    // Product.delete(id);
    // res.redirect(`/${routePrefix}/products`);
}

export {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}