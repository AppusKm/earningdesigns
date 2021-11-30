const mongoose = require("mongoose");
const validator = require("validator");

const userFileSchema = new mongoose.Schema(
  {
    imageTitle: { type: String, required: true },
    imageDescription: { type: String, required: true },
    image: { type: String },
    thumbimage: { type: String },
    previewimage: { type: String },
    category: { type: String },
    itemforsale: { type: String },
    terms: { type: String },
  },
  { timestamps: true }
);

userFileSchema.pre("save", async function (next) {
  const user = this;

  next();
});

const UserFiles = mongoose.model("UserFiles", userFileSchema);
module.exports = UserFiles;
