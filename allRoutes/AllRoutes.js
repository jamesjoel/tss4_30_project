const routes = require("express").Router();

routes.use("/api/v1/signup", require("../controllers/SignupController"));
routes.use("/api/v1/demo2", require("../controllers/Demo2Controller"));
routes.use("/api/v1/city", require("../controllers/CityController"));
routes.use("/api/v1/auth", require("../controllers/AuthController"));
routes.use("/api/v1/users", require("../controllers/UsersController"));
routes.use("/api/v1/user", require("../controllers/UserController"));
routes.use("/api/v1/category", require("../controllers/CategoryController"));
routes.use("/api/v1/subcategory", require("../controllers/SubCategoryController"));
routes.use("/api/v1/adminauth", require("../controllers/AdminAuthController"));
routes.use("/api/v1/product", require("../controllers/ProductController"));
routes.use("/api/v1/demo", require("../controllers/DemoController"));
routes.use("/api/v1/order", require("../controllers/OrderController"));
routes.use("/api/v1/invoice", require("../controllers/InvoiceController"));

routes.get("*", (req, res)=>{
    res.status(400).json({ message : "This URL not Found"})
})

module.exports = routes;