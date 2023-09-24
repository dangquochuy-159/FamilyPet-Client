const adminRouter = require("./admins");

// import routerImages from "./upload";

function route(app) {
    app.use("/api/admins", adminRouter);
}

module.exports = route;
