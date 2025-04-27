const express = require("express");
const uploadImage = require("../controllers/cloudinary");
const upload = require("../middlewares/upload"); // multer setup
const errorCatcher = require("../middlewares/errorCatcher");
const uploadRouter = express.Router();


uploadRouter.post("/image",upload.single("image"),errorCatcher(uploadImage))

module.exports = uploadRouter