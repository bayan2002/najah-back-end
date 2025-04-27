const express = require("express");
const authRouter = require("./auth");
const storyRouter = require("./story");
const categoryRouter = require("./category");
const uploadRouter = require("./upload");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/story", storyRouter);
router.use("/category", categoryRouter);
router.use("/upload", uploadRouter);


module.exports = router;
