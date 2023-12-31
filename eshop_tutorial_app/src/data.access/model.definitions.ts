import { ProductAttributes } from "../models/database/product.attributes";
import { UserAttributes } from "../models/database/user.attributes";
import { dbContext } from "./database";

const Product = dbContext.define('product', ProductAttributes);
const User = dbContext.define('user', UserAttributes);

function defineTableRelations(){
    Product.belongsTo(User, {
        constraints:true,
        onDelete:'CASCADE'
    });
    User.hasMany(Product);
}

export {
    Product,
    User,
    defineTableRelations
}