import config from "~/config";
import { AdminLayout } from "~/layouts";


import pages from "~/pages";

const publicRoutes = [
    { path: config.routes.home, page: pages.Home, layout: null },
    { path: config.routes.introduce, page: pages.Introduce, layout: null, required_login: true },
]

const LoginRoutes = [
    { path: config.routes.loginAdmin, page: pages.LoginAdmin, layout: null },
    { path: config.routes.login, page: pages.LoginCustomer, layout: null },

]

const privateRoutes = [
    { path: config.routes.admin, page: pages.Dashboard, layout: null },
    { path: config.routes.dashboard, page: pages.Dashboard, layout: AdminLayout },
    { path: config.routes.info, page: pages.Info, layout: AdminLayout },
    { path: config.routes.category, page: pages.Category, layout: AdminLayout },
    { path: config.routes.order, page: pages.Order, layout: AdminLayout },
    { path: config.routes.evaluate, page: pages.Evaluate, layout: AdminLayout },
    { path: config.routes.promote, page: pages.Promote, layout: AdminLayout },
    { path: config.routes.user, page: pages.User, layout: AdminLayout },
    { path: config.routes.product, page: pages.Product, layout: AdminLayout },

]

export {
    publicRoutes,
    privateRoutes,
    LoginRoutes
}