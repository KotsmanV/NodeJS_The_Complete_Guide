import express from 'express';

const router = express.Router();

//express has methods for each REST verb

router.get('/add-product', (req, res, next) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add product</button>
        </form>
    `)
});

router.post('/product', (req, res, post) => {
    console.log(req.body);

    res.redirect('/');
});

export{
    router as adminRouter
}