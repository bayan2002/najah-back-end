const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const { NODE_ENV, DATABASE_URL, DEV_DATABASE_URL } = process.env;

let url;
switch (NODE_ENV) {
    case 'development':
      url = DEV_DATABASE_URL;
      break;
    case 'production':
      url = DATABASE_URL;
      ssl = {
        rejectUnauthorized: false,
      };
      break;
    default:
      throw new Error('The database url is invalid!');
  }
const sequelize = new Sequelize(url, {
  logging: false,
  dialect: "postgres",
});

module.exports = sequelize;