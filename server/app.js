const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const multer = require('multer');
const router = require("./routes");
const { clientError, serverError } = require("./middlewares/errors");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(cors());

app.use([
  express.json(),
  compression(),
  express.urlencoded({ extended: false }),
]);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1", router);

app.use(clientError);
app.use(serverError);

module.exports = app;
