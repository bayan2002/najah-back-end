const multer = require("multer");

const storage = multer.memoryStorage(); // store the file in memory as a buffer

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Unsupported file format. Please upload JPEG or PNG."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

module.exports = upload;
