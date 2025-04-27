const { cloudinary } = require("../storage");
const { serverErrs } = require("../helpers/customError");

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return next(serverErrs.BAD_REQUEST("No image file provided"));
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "uploads",
    timeout: 120000,
  });

  res.send({
    status: 200,
    msg: "Image uploaded successfully",
    data: {
      imageUrl: result.secure_url,
    },
  });
};

module.exports = uploadImage;
