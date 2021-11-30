const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Invalid mobile.");
        }
      },
    },
    otp: { type: Number },
    otp_status: { type: String },
  },
  { timestamps: true }
);

userSchema.statics.checkUserExt = async (mobile) => {
  const cnt = await User.findOne({ mobile });
  console.log(cnt);
};

userSchema.pre("save", async function (next) {
  const user = this;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
