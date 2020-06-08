const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
    local: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
      password: {
        type: String,
      },
    },
    google: {
      id: { type: String },
      email: { type: String, lowercase: true },
    },
    facebook: {
      id: { type: String },
      email: { type: String, lowercase: true },
    },

    role: { type: String, enum: ["user", "admin", "root"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.method !== "local") {
      next();
    }
    // generate salt for password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.local.password, salt);
    //  generate hashed password of
    this.local.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};
//Export the model
module.exports = mongoose.model("User", userSchema);
