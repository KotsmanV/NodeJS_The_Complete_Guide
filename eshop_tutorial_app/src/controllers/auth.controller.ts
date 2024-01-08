import { Request, Response, NextFunction } from "express-serve-static-core";
import { transformCookieStringToObject } from "../utils/string.helpers";

function getLogin(req: Request, res: Response, next: NextFunction) {
    // const cookies = transformCookieStringToObject(req.get('Cookie'));

    console.log('Cookies: ', req.cookies);

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
    res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.redirect('/');


    // res.render('auth/login',{
    //     path:'/login',6
    //     pageTitle:'Login',
    //     activeLogin:true,
    //     authCSS:true,
    //     formsCSS:true
    // })
}

export {
    getLogin,
    postLogin
}