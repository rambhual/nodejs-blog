require("express");
const router = require("express-promise-router")();
const ProductController = require("../controllers/product");
router.route("").post(ProductController.create);
router.route("").get(ProductController.all);
router.route("/:id").get(ProductController.get);
router.route("/:id").put(ProductController.update);
router.route("/:id").delete(ProductController.delete);
module.exports = router;
