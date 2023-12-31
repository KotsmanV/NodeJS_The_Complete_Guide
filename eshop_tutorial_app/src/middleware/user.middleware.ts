import { Request, Response, NextFunction } from "express-serve-static-core";
import { User } from "../data.access/model.definitions";

export function addUserToRequest(req: Request, res: Response, next: NextFunction){
    User.findByPk(1).then(user=>{
        // @ts-ignore
        req.user = user;
        next();
    }).catch(error=>console.log(error));
}