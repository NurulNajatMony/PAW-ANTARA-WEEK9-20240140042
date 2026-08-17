const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/auth.middleware");
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.use(requireAuth);

router.get("/", getCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
