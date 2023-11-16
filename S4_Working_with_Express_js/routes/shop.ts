import express from 'express';
import path from 'path';

import { rootDir } from '../utils/path';

const router = express.Router();

router.get('/', (req, res, next) => {
    // __dirname:   GLOBAL VARIABLE which holds the absolute path for the folder
    //              this file exists in
    //              on the OS for the current project
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

export {
    router as shopRouter
}