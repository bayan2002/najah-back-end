const sequelize = require("./connection");
const { categories, stories } = require("./fakeData");

const { Category, Story } = require("../../models");

const insertDB = async () => {
  await sequelize.sync({ force: true });
  await Category.bulkCreate(categories).then(() =>
    console.log("category data have been saved")
  );
  await Story.bulkCreate(stories).then(() =>
    console.log("story data have been saved")
  );
};

if (process.env.SEED) {
  insertDB();
}
module.exports = insertDB;
