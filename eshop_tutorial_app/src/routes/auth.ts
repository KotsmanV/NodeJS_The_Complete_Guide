import express from 'express';
import { getLogin, postLogin } from '../controllers/auth.controller';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);

export{
    router as authRouter
}