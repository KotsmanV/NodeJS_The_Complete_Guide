import { Product } from "./product";
import * as fs from 'fs';
import * as path from 'path';
import { rootDir } from "../utils/path";

const p = path.join(
    rootDir,
    'data',
    'cart.json'
)

class Cart {
    constructor() {
    }

    products: CartProduct[] = [];
    totalPrice: number = 0;

    static addProduct(productId: number, price:number) {
        fs.readFile(p, (err, fileContent) => {
            let cart = new Cart();
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === productId);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct:CartProduct;
            
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {
                    id:productId,
                    quantity:1
                }
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice += +price;
            // fs.writeFile(p, JSON.stringify(cart), err=>{
            //     console.log(`cart error: `, err);
            // });

            fs.writeFileSync(p, JSON.stringify(cart));
        })
    }

    static deleteProduct(id:number, price:number){
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                return;
            }

            const cart:Cart = JSON.parse(fileContent.toString());

            const index = cart.products.findIndex(p=>p.id === id);
            const quantity = cart.products[index].quantity;

            cart.products.splice(index, 1);

            cart.products = cart.products.filter(p=>p.id !== id);
            cart.totalPrice -= quantity * price;

            fs.writeFileSync(p, JSON.stringify(cart));
        });
    }
}

interface CartProduct{
    id:number;
    quantity:number;
}

export {
    Cart,
    CartProduct
}