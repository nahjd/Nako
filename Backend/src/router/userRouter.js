const router = require("express").Router();

const userControllers = require("./../controllers/userControllers");

router.get("/products", userControllers.getAllData);
router.delete("/products/:id", userControllers.getAllDelete);
router.post("/products", userControllers.getAllPost);

module.exports = router;
