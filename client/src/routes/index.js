import config from "~/config";

import pages from "~/pages";

const publicRoutes = [
    { path: config.routes.home, page: pages.Home, layout: null },
    { path: config.routes.introduce, page: pages.Introduce, layout: null },
]

const privateRoutes = []

export {
    publicRoutes,
    privateRoutes
}