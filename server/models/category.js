const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Category;