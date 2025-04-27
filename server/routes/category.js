const express = require("express");
const categoryRouter = express.Router();

const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const verifyToken = require("../middlewares/verifyToken");
const errorCatcher = require("../middlewares/errorCatcher");

// Public
categoryRouter.get("/", errorCatcher(getAllCategories));

// Admin
categoryRouter.post("/", verifyToken, errorCatcher(addCategory));
categoryRouter.put("/:id", verifyToken, errorCatcher(updateCategory));
categoryRouter.delete("/:id", verifyToken, errorCatcher(deleteCategory));

module.exports = categoryRouter;
