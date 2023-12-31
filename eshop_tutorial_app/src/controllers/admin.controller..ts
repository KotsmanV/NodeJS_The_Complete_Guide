import { Request, Response, NextFunction } from "express-serve-static-core";
import { Product } from "../data.access/model.definitions";

const routePrefix = 'admin';

function getAddProduct(req: Request, res: Response, next: NextFunction) {
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

    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //     // @ts-ignore
    //     userId: req.user.id
    // })


    //Sequelize automatically creates functions for associated models
    //which are called Magic Functions
    //https://sequelize.org/docs/v6/core-concepts/assocs/
    // @ts-ignore
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        // @ts-ignore
        userId: req.user.id
    })
    .then(result => {
        console.log(`Product create: `, result);
        res.redirect('/');
    }).catch(error => {
        console.log(`Product create: `, error);
    });

}

function getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode: boolean = req.query.edit === 'true';

    if (!editMode) {
        return res.redirect(`/${routePrefix}/products`);
    }

    const productId = parseInt(req.params.productId);

    if (!productId) {
        return res.redirect(`/${routePrefix}/products`);
    }

    Product.findByPk(productId).then(product => {
        if (!product) {
            return res.redirect(`/${routePrefix}/products`);
        }

        res.render(`${routePrefix}/edit-product`, {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product.dataValues,
            activeAddProduct: true,
            formsCSS: true,
            productCSS: true
        });
    });
}

function postEditProduct(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.body.id);

    Product.findByPk(id).then(product => {
        return product?.update({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            price: parseFloat(req.body.price)
        })
    })
        .then(result => {
            console.log(`updated product`, result);
            res.redirect(`/${routePrefix}/products`);
        })
        .catch(error => console.log(error));
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
    const id = parseInt(req.body.id);
    Product.destroy({
        where: {
            id: id
        }
    }).then(result => {
        console.log(result);
        res.redirect(`/${routePrefix}/products`);
    })
        .catch(error => console.log(`delete product: `, error))
}

export {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}