const Joi = require("joi");

const validateStory = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  authorName: Joi.string().required(),
  showAuthorName: Joi.boolean().required(),
  CategoryId: Joi.number().integer().required(),
  // image and video handled via multer, not here
});

module.exports = validateStory ;
