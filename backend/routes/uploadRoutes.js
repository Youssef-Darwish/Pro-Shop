const path = require("path");
const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extensionNameMatch = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeTypeMatch = fileTypes.test(file.mimeType);

  if (extensionNameMatch && mimeTypeMatch) {
    return cb(null, true);
  } else {
    cb("Images only allowed");
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
