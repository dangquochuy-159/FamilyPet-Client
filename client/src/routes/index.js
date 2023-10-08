import config from "~/config";
import { AdminLayout } from "~/layouts";


import pages from "~/pages";

const publicRoutes = [
    { path: config.routes_public.home, page: pages.Home, layout: null },
    { path: config.routes_public.introduce, page: pages.Introduce, layout: null, required_login: true },
]

const LoginRoutes = [
    { path: config.routes_private.loginAdmin, page: pages.LoginAdmin, layout: null },
    { path: config.routes_public.login, page: pages.LoginCustomer, layout: null },

]

const privateRoutes = [
    { path: config.routes_private.admin, page: pages.Dashboard, layout: null },
    { path: config.routes_private.dashboard, page: pages.Dashboard, layout: AdminLayout },
    { path: config.routes_private.info, page: pages.Info, layout: AdminLayout },
    { path: config.routes_private.category, page: pages.Category, layout: AdminLayout },
    { path: config.routes_private.order, page: pages.Order, layout: AdminLayout },
    { path: config.routes_private.evaluate, page: pages.Evaluate, layout: AdminLayout },
    { path: config.routes_private.promote, page: pages.Promote, layout: AdminLayout },
    { path: config.routes_private.user, page: pages.User, layout: AdminLayout },
    { path: config.routes_private.product, page: pages.Product, layout: AdminLayout },

]

export {
    publicRoutes,
    privateRoutes,
    LoginRoutes
}