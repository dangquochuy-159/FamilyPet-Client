const adminRouter = require("./admins");
const userRouter = require("./users");
const productRouter = require("./products");

// import routerImages from "./upload";

function route(app) {
    app.use("/api/admins", adminRouter);
    app.use("/api/users", userRouter);
    app.use("/api/products", productRouter);
}

module.exports = route;
