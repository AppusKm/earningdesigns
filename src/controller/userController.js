const Users = require("../model/User");
const UserFiles = require("../model/UserFiles");
const sharp = require("sharp");
var fs = require("fs");
const mongoose = require("../db/mongoose");
const formidable = require("formidable");
const saveUser = async (res, data) => {
  let { mobile, name, otp } = data;
  let otp_status = "Failed";

  if (otp != 1234) {
    const user = new Users({ mobile, name, otp, otp_status });
    await user.save();
    throw new Error("INVALID OTP");
  }
  try {
    otp_status = "Success";
    const user = new Users({ mobile, name, otp, otp_status });
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
//
const saveUserData = async (req, res) => {
  let formData = new formidable.IncomingForm();
  formData.parse(req, (error, fields, files) => {
    const imageTitle = fields.imageTitle ? fields.imageTitle : "";
    const imageDescription = fields.imageDescription
      ? fields.imageDescription
      : "";
    const category = fields.category ? fields.category : "";
    const itemforsale = fields.itemforsale ? fields.itemforsale : "";
    const terms = fields.terms ? fields.terms : "";
    //

    //
    let imagePath = files.media.path;
    let imageName = fileNme;
    let newImageName =
      userId + new Date().getTime() + fileNme.split(" ").join("-");
    let newImagePath =
      "public/" + new Date().getTime() + "-" + fileNme.split(" ").join("-");
    mv(imagePath, newImagePath, function (error) {
      if (error == null) {
        const filename = newImagePath;

        try {
          const imgs = thumbImage(filename, newImageName);
          let { thump, preview } = imgs;
          const userData = {
            imageTitle,
            imageDescription,
            category,
            itemforsale,
            terms,
            userData,
            thumbimage: thump,
            previewimage: preview,
          };
          try {
            const user = new UserFiles({ mobile, name, otp, otp_status });
            await user.save();
          } catch (error) {
            throw new Error(error.message);
          }
        } catch (error) {
          res.status(400).send(error.message);
        }
      } else {
        throw new Error("Failed to upload file.");
      }
    });
  });
};

//
const thumbImage = async function (file, imageName, userData, hashTags) {
  try {
    const buffer_one = await sharp(file)
      .resize({ width: 3000, height: 250, quality: 100 })
      .toFile("./public/thumpImage/" + imageName);

    const buffer_two = await sharp(file)
      .png({ quality: 20 })
      .toFile("./public/mediaImage/thumbImage/" + imageName);
    fs.unlinkSync(file);
    var newObject = {
      thump: "mediaImage/" + imageName,
      preview: "mediaImage/thumbImage/" + imageName,
    };
    object = { ...newObject };
    return object;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { saveUser, saveUserData };
