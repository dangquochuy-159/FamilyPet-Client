const adminRouter = require("./admins");
const userRouter = require("./users");

// import routerImages from "./upload";

function route(app) {
    app.use("/api/admins", adminRouter);
    app.use("/api/users", userRouter);
}

module.exports = route;
