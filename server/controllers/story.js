const { Story, Category } = require("../models");
const { serverErrs } = require("../helpers/customError");
const { validateStory } = require("../validation");
const { Op } = require("sequelize");

// GET all stories
const getAllStories = async (req, res) => {
  const stories = await Story.findAll({
    include: [{ model: Category }],
    order: [["id", "DESC"]],
  });

  res.send({
    status: 200,
    data: stories,
    msg: "Fetched all stories successfully",
  });
};

// GET single story by ID
const getSingleStory = async (req, res) => {
  const { storyId } = req.params;
  const story = await Story.findByPk(storyId, {
    include: [{ model: Category }],
  });

  if (!story) throw serverErrs.BAD_REQUEST("Story not found");

  res.send({
    status: 200,
    data: story,
    msg: "Fetched single story successfully",
  });
};

// Admin DELETE story
const deleteStory = async (req, res) => {
  const { storyId } = req.params;
  const story = await Story.findByPk(storyId);

  if (!story) throw serverErrs.BAD_REQUEST("Story not found");

  await story.destroy();

  res.send({
    status: 200,
    msg: "Story deleted successfully",
  });
};

// Search stories by category name
const searchByCategory = async (req, res) => {
  const { category } = req.query;

  const stories = await Story.findAll({
    include: {
      model: Category,
      where: {
        name: {
          [Op.iLike]: `%${category}%`,
        },
      },
    },
    order: [["id", "DESC"]],
  });

  res.send({
    status: 200,
    data: stories,
    msg: "Stories filtered by category",
  });
};

// POST /stories
const addStory = async (req, res) => {
  const {
    title,
    content,
    authorName,
    showAuthorName,
    videoUrl,
    CategoryId,
    imageUrl,
  } = req.body;

  await validateStory.validateAsync({
    title,
    content,
    authorName,
    showAuthorName,
    CategoryId,
  });

  if (!imageUrl) {
    throw serverErrs.BAD_REQUEST("Image URL is required to add a story");
  }

  const story = await Story.create({
    title,
    content,
    authorName,
    showAuthorName: showAuthorName !== "false",
    imageUrl,
    videoUrl,
    CategoryId,
  });

  res.status(201).send({
    status: 201,
    data: story,
    accessKey: story.accessKey, // Send accessKey to the user
    msg: "Story added successfully",
  });
};

const editStory = async (req, res) => {
  const { storyId } = req.params;
  const {
    title,
    content,
    authorName,
    showAuthorName,
    videoUrl,
    CategoryId,
    accessKey,
    imageUrl
  } = req.body;

  await validateStory.validateAsync({
    title,
    content,
    authorName,
    showAuthorName,
    CategoryId,
  });

  const story = await Story.findByPk(storyId);

  if (!story) throw serverErrs.BAD_REQUEST("Story not found");

  if (story.accessKey !== accessKey)
    throw serverErrs.FORBIDDEN("Invalid access key");

  await story.update({
    title: title || story.title,
    content: content || story.content,
    authorName: authorName || story.authorName,
    showAuthorName:
      typeof showAuthorName !== "undefined"
        ? showAuthorName
        : story.showAuthorName,
    videoUrl: videoUrl,
    CategoryId: CategoryId || story.CategoryId,
    imageUrl: imageUrl || story.imageUrl,
  });

  res.send({
    status: 200,
    msg: "Story updated successfully",
    data: story,
  });
};

const userDeleteStory = async (req, res) => {
  const { storyId } = req.params;
  const { accessKey } = req.body;

  const story = await Story.findByPk(storyId);
  if (!story) throw serverErrs.BAD_REQUEST("Story not found");

  if (story.accessKey !== accessKey)
    throw serverErrs.FORBIDDEN("Invalid access key");

  await story.destroy();

  res.send({
    status: 200,
    msg: "Story deleted successfully",
  });
};

module.exports = {
  getAllStories,
  getSingleStory,
  deleteStory,
  searchByCategory,
  addStory,
  editStory,
  userDeleteStory,
};
