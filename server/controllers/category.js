const { Category } = require("../models");
const { serverErrs } = require("../helpers/customError");
const { validateCategory } = require("../validation");

const addCategory = async (req, res) => {
  const { name, description } = req.body;

  await validateCategory.validateAsync({ name, description });

  const existing = await Category.findOne({ where: { name } });
  if (existing) {
    throw serverErrs.BAD_REQUEST("Category already exists");
  }

  const category = await Category.create({ name, description });

  res.send({
    status: 201,
    data: category,
    msg: "Category added successfully",
  });
};

const getAllCategories = async (req, res) => {
  const categories = await Category.findAll({
    order: [["id", "DESC"]],
  });

  res.send({
    status: 200,
    data: categories,
    msg: "Fetched all categories",
  });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  await validateCategory.validateAsync({ name, description });

  const category = await Category.findByPk(id);
  if (!category) throw serverErrs.BAD_REQUEST("Category not found");

  await category.update({
    name: name || category.name,
    description: description || category.description,
  });

  res.send({
    status: 200,
    data: category,
    msg: "Category updated successfully",
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  if (!category) throw serverErrs.BAD_REQUEST("Category not found");

  await category.destroy();

  res.send({
    status: 200,
    msg: "Category deleted successfully",
  });
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
