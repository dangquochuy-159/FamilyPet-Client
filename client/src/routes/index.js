import config from "~/config";

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
    { path: config.routes.dashboard, page: pages.Dashboard, layout: null },

]

export {
    publicRoutes,
    privateRoutes,
    LoginRoutes
}