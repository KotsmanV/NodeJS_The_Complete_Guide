import { Request, Response, NextFunction } from "express-serve-static-core";

function getCart(req: Request, res: Response, next: NextFunction){
    res.render('shop/cart',{
        
    })
}