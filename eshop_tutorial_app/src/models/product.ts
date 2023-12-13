import fs from 'fs';
import path from 'path';
import { rootDir } from '../utils/path';

const dataFilePath = path.join(rootDir, 'data', 'products.json');

class Product{
    constructor(title:string, imageUrl:string, description:string, price:number){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    title:string;
    imageUrl:string;
    description:string;
    price:number;

    save(){
        getProductsFromFile((products:Product[])=>{
            products.push(this);
            fs.writeFile(dataFilePath, JSON.stringify(products) ,(err)=>{
                console.log(err);
            });
        });
    }

    static fetchAll(clb:Function){
        getProductsFromFile(clb);
    }
}

function getProductsFromFile(clb:Function){
    fs.readFile(dataFilePath, (err, fileContent)=>{
        if(err){
            return clb([]);
        }
        return clb(JSON.parse(fileContent.toString()));
    })
}


export{
    Product
}