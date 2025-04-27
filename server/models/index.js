const Admin = require("./admin");
const Category = require("./category");
const Story = require("./story");

Category.hasMany(Story);
Story.belongsTo(Category);

module.exports = {
  Admin,
  Category,
  Story,
};
