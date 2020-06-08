const JWT = require("jsonwebtoken");
const User = require("../models/user");
module.exports = {
  signin: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  signup: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.value.body;
    // check user if already create in database
    const user = await User.findOne({ "local.email": email });
    if (user) {
      return res.status(403).json({ message: "email is already in user!" });
    }

    const newUser = new User({
      method: "local",
      local: { firstName, lastName, email, password },
    });
    await newUser.save();
    const token = signToken(newUser);
    res.status(200).json(token);
  },
  secret: async (req, res, next) => {
    console.log("Hello secret");
    res.status(200).json({ message: "I manage the secret" });
  },

  googleSignIn: async (req, res, next) => {
    console.log(req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};

function signToken(newUser) {
  return JWT.sign(
    {
      iss: "aspnetcore",
      sub: newUser._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_KEY
  );
}
