import path from 'path';

const rootDir = path.dirname(require.main?.filename ?? path.join(__dirname, '..'));
const mainFolderPath = path.join(path.dirname(require.main!.filename), '..', '..');
// const dataFolderPath = path.dirname(path.join(__dirname, '..', 'data'));

export {
    rootDir,
    mainFolderPath
}