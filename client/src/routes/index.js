import config from "~/config";
import { AdminLayout, MainLayout } from "~/layouts";


import pages from "~/pages";

const publicRoutes = [
    { path: config.routes_public.default, page: pages.Home, layout: MainLayout },
    { path: config.routes_public.home, page: pages.Home, layout: MainLayout },
    { path: config.routes_public.introduce, page: pages.Introduce, layout: MainLayout },
    { path: config.routes_public.priceLList, page: pages.PriceList, layout: MainLayout },
    { path: config.routes_public.contact, page: pages.Contact, layout: MainLayout },
    { path: config.routes_public.product, page: pages.Product, layout: MainLayout },
    { path: config.routes_public.cart, page: pages.Cart, layout: MainLayout },
    { path: config.routes_public.infoPayment, page: pages.PaymentInfo, layout: MainLayout },
    { path: config.routes_public.payment, page: pages.Payment, layout: MainLayout },
    { path: config.routes_public.search, page: pages.Search, layout: MainLayout },
    { path: config.routes_public.policy, page: pages.Policy, layout: MainLayout },
    { path: config.routes_public.account, page: pages.Account, layout: MainLayout },
    { path: config.routes_public.register, page: pages.Register, layout: MainLayout },
    { path: config.routes_public.notFound, page: pages.NotFound, layout: null },
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
    { path: config.routes_private.product, page: pages.ProductAdmin, layout: AdminLayout },

]

export {
    publicRoutes,
    privateRoutes,
    LoginRoutes
}