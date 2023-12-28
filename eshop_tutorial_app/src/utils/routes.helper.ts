type ShopRoutes = 'shop' | 'products' | 'cart' | 'index' | 'checkout' | 'orders' | 'productDetails';
type AdminRoutes = 'add-product' | 'products';

const shopPrefix = 'shop';
const adminPrefix = 'admin'

function createShopPaths(path:ShopRoutes){
    switch (path) {
        case 'index': return `${shopPrefix}/index`;
        case 'shop': return `${shopPrefix}/shop`;
        case 'products': return '/products';//shop/product-list;
        case 'productDetails': return `${shopPrefix}/product-details`;
        case 'orders': return `${shopPrefix}/orders`;
        case 'cart': return `${shopPrefix}/cart`;
        case 'checkout': return `${shopPrefix}/checkout`;
        default: return '/';
    }
}

function createAdminPaths(path:AdminRoutes){
    switch (path) {
        case 'add-product': return `${adminPrefix}/add-product`;
        case 'products': return `${adminPrefix}/products`;
        default: return adminPrefix;
    }
}


export{
    ShopRoutes,
    AdminRoutes,
    createShopPaths,
    createAdminPaths    
}