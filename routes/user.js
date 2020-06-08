require("express");
require("../passport");
const passport = require("passport");
const router = require("express-promise-router")();
const UserController = require("../controllers/user");
const { validateBody, schemas } = require("../helpers/routeHelpers");

router
  .route("/signin")
  .post(
    passport.authenticate("local", { session: false }),
    UserController.signin
  );
router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signup);

router
  .route("/auth/google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    UserController.googleSignIn
  );

router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), UserController.secret);
module.exports = router;
