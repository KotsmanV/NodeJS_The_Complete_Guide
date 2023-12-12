type ShopRoutes = 'shop' | 'products' | 'cart';
type AdminRoutes = 'add-product';

const shopPrefix = 'shop';
const adminPrefix = 'admin'

function createShopPaths(path:ShopRoutes){
    switch (path) {
        case 'cart': return `${shopPrefix}/cart`;
        case 'products': return '/';//shop/product-list;
        case 'shop': return `${shopPrefix}/shop`;
        default: return '/';
    }
}

function createAdminPaths(path:AdminRoutes){
    switch (path) {
        case 'add-product': return `${adminPrefix}/add-product`;
        default: return adminPrefix;
    }
}


export{
    ShopRoutes,
    AdminRoutes,
    createShopPaths,
    createAdminPaths    
}