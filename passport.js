const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const GooglePlusToken = require("passport-google-plus-token");
const localStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("./models/user");
// passport-js jwt strategy
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_KEY,
    },
    async (payload, done) => {
      try {
        const user = User.findById({ _id: payload.sub });
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(null, false);
      }
    }
  )
);

// Google plus oauth strategy
passport.use(
  new GooglePlusToken(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {}
  )
);

// passport local strategy
passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const foundUser = await User.findOne({ email });
        // check if not found
        if (!foundUser) {
          return done(null, false);
        }
        const isMatch = await foundUser.isValidPassword(password);
        if (!isMatch) {
          return done(null, false);
        }
        done(null, foundUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
