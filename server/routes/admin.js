const express = require("express");
const { deleteStory } = require("../controllers/admin");
const verifyToken = require("../middlewares/verifyToken");
const errorCatcher = require("../middlewares/errorCatcher");

const adminRouter= express.Router()


adminRouter.delete("/:storyId", verifyToken, errorCatcher(deleteStory)); // Admin Only

module.exports = adminRouter;