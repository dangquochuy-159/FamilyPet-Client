const routes_public = {
    // user
    default: '/',
    home: '/home',
    introduce: '/introduce',
    product: '/product',
    priceLList: '/price-list',
    contact: '/contact',
    cart: '/cart',
    search: '/search',
    policy: '/policy',
    account: '/account',
    register: '/register',
    login: '/login',
    notFound: '/*'
}

const routes_private = {
    // admin
    loginAdmin: '/login-admin',
    admin: '/admin',
    dashboard: '/admin/dashboard',
    info: '/admin/info',
    category: '/admin/category',
    order: '/admin/order',
    evaluate: '/admin/evaluate',
    promote: '/admin/promote',
    user: '/admin/user',
    product: '/admin/product',
}
export {
    routes_public,
    routes_private
}