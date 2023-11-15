import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(`<h1>This is express</h1>`)
});

export {
    router as shopRouter
}