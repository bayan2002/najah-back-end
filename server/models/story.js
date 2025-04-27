const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Story = sequelize.define("Story", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, // path to uploaded image
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  showAuthorName: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  accessKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  }
});

module.exports = Story;
