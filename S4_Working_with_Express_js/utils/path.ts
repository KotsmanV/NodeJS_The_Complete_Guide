import path from 'path';

const rootDir = path.dirname(require.main?.filename ?? path.join(__dirname, '..'));

export{
    rootDir
}