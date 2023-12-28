import fs from 'fs';
import path from 'path';
import { rootDir } from '../utils/path';
import { Cart } from './cart';

const dataFilePath = path.join(rootDir, 'data', 'products.json');

interface Product {
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    id?: number;

    create(): void;
    update(): void;
    //delete(id:number): void;
}

class Product implements Product {
    constructor(title: string, imageUrl: string, description: string, price: string, id?: string) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = parseFloat(price);

        if (id) {
            this.id = parseInt(id);
        }
    }

    title: string;
    imageUrl: string;
    description: string;
    price: number;
    id?: number;

    create(): void {
        this.id = Math.round((Math.random() * 100000));
        getProductsFromFile((products: Product[]) => {
            products.push(this);
            fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    update(): void {
        getProductsFromFile((products: Product[]) => {
            const index = products.findIndex(p => p.id === this.id);
            const updatedProducts = [...products];
            updatedProducts[index] = this;

            // fs.writeFile(dataFilePath, JSON.stringify(updatedProducts), (err) => {
            //     console.log(err);
            // });
            fs.writeFileSync(dataFilePath, JSON.stringify(updatedProducts));
        });
    }

    static delete(id: number): void {
        getProductsFromFile((products: Product[]) => {
            const index = products.findIndex(p => p.id === id);
            const price = products[index].price;
            products.splice(index, 1);

            // fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
            //     if (!err) {
            //         Cart.deleteProduct(id, price);
            //     }
            //     console.log(err);
            // });
            fs.writeFileSync(dataFilePath, JSON.stringify(products));
            Cart.deleteProduct(id, price);
        });
    }

    static fetchAll(clb: Function) {
        getProductsFromFile(clb);
    }

    static findById(id: number, cb: Function) {
        getProductsFromFile((products: Product[]) => {
            const product: Product | undefined = products.find(p => p.id === id);
            cb(product);
        })
    }
}

function getProductsFromFile(clb: Function) {
    fs.readFile(dataFilePath, (err, fileContent) => {
        if (err) {
            return clb([]);
        }
        return clb(JSON.parse(fileContent.toString()) as Product[]);
    })
}


export {
    Product
}