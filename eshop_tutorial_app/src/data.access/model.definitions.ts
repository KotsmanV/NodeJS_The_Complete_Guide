import { CartItemAttributes } from "../models/database/cart-item.attributes";
import { CartAttributes } from "../models/database/cart.attributes";
import { OrderItemAttributes } from "../models/database/order-item.attributes";
import { OrderAttributes } from "../models/database/order.attributes";
import { ProductAttributes } from "../models/database/product.attributes";
import { UserAttributes } from "../models/database/user.attributes";
import { dbContext } from "./database";

const Product = dbContext.define('product', ProductAttributes);
const User = dbContext.define('user', UserAttributes);
const Cart = dbContext.define('cart', CartAttributes);
const CartItem = dbContext.define('cart_item', CartItemAttributes);
const Order = dbContext.define('order', OrderAttributes);
const OrderItem = dbContext.define('order_item', OrderItemAttributes);

function defineTableRelations() {
    Product.belongsTo(User, {
        constraints: true,
        onDelete: 'CASCADE'
    });
    User.hasMany(Product);

    User.hasOne(Cart);
    Cart.belongsTo(User);

    // "through" defines the CartItem table as the intermediate table
    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });

    Order.belongsTo(User);
    User.hasMany(Order);

    Order.belongsToMany(Product, { through: OrderItem });
}

export {
    Product,
    User,
    Cart,
    CartItem,
    defineTableRelations
}