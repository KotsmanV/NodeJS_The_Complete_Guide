import { Request, Response, NextFunction } from "express-serve-static-core";
import { transformCookieStringToObject } from "../utils/string.helpers";
import { User } from "../data.access/model.definitions";

function getLogin(req: Request, res: Response, next: NextFunction) {
    // const cookies = transformCookieStringToObject(req.get('Cookie'));

    console.log('Cookies: ', req.cookies);
    //@ts-ignore
    console.log(`session: isLoggedIn =`, req.session.isLoggedIn);

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        activeLogin: true,
        authCSS: true,
        formsCSS: true,
        isAuthenticated:req.cookies.isLoggedIn
    })
}

function postLogin(req: Request, res: Response, next: NextFunction) {
    User.findByPk(1).then(user=>{
        //@ts-ignore
        req.session.isLoggedIn = true;
        //@ts-ignore
        req.session.user = user;
        res.redirect('/');
    });    
}

function postLogout(req: Request, res: Response, next: NextFunction){    
    req.session.destroy((error)=>{
        console.log(`logout error: `, error);
        res.redirect('/');
    });
}

export {
    getLogin,
    postLogin, 
    postLogout
};