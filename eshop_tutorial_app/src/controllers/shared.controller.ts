import {Request, Response, NextFunction } from "express-serve-static-core";

function get404(req:Request, res:Response, next:NextFunction) {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page not found' })
}

export{
    get404
}