const { Story } = require("../models");

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
module.exports= {deleteStory}