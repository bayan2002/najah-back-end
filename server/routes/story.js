const express = require("express");
const {
  getAllStories,
  getSingleStory,
  deleteStory,
  searchByCategory,
  addStory,
  editStory,
  userDeleteStory
} = require("../controllers/story");
const verifyToken = require("../middlewares/verifyToken");
const errorCatcher = require("../middlewares/errorCatcher");
const upload = require("../middlewares/upload")

const storyRouter = express.Router();

storyRouter.get("/", errorCatcher(getAllStories)); // Public
storyRouter.get("/search", errorCatcher(searchByCategory)); // Public
storyRouter.get("/:storyId", errorCatcher(getSingleStory)); // Public
storyRouter.post("/", upload.single("image"), errorCatcher(addStory));
storyRouter.put("/:storyId", upload.single("image"), errorCatcher(editStory));
storyRouter.delete("/:storyId", errorCatcher(userDeleteStory)); // User delete a story

module.exports = storyRouter;
