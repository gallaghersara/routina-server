const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
  "/signup",
  AuthController.signup,
  AuthController.authenticateSignUp
);
router.post("/signin", AuthController.signin, AuthController.authenticate);
router.post("/signout", AuthController.signout);
router.get("/google", AuthController.googleAuth);
router.get("/google/callback", AuthController.googleAuthCallback);

module.exports = router;
