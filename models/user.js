const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["user", "admin", "root"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    // generate salt for password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.password, salt);
    //  generate hashed password of
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (verifyPassword) {
  try {
    return await bcrypt.compare(verifyPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
//Export the model
module.exports = mongoose.model("User", userSchema);
