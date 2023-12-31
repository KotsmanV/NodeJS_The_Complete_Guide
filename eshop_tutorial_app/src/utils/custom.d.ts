/**
 * Extended Request with the following guidelines
 * https://stackoverflow.com/questions/74471003/typescript-how-can-i-add-a-custom-property-to-express-request-with-two-or-mor/74508136
 * https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
 */
declare namespace Express {
    export interface Request {
        [key: string]: any;
        user: Model<any, any> | null
    }
}