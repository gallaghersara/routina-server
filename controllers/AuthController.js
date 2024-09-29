const passport = require("passport");
const User = require("../models/User");
const { validateSignup } = require("../utils/validators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_EXPIRES_IN = "1h";

exports.signup = [
  validateSignup,
  async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      req.flash("success_msg", "You are registered and can now log in");
      res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
];

exports.signin = (req, res, next) => {
  next();
};

exports.authenticate = (req, res, next) => {
  console.log("Authenticating...");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Error:", err);
      return next(err);
    }
    if (!user) {
      console.log("User not found: ", info.message);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log("Login error:", err);
        return next(err);
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      console.log("Logged in successfully");
      return res.status(200).json({ message: "Logged in successfully", token });
    });
  })(req, res, next);
};
exports.authenticateSignUp = (req, res, next) => {
  console.log("Signing up...");
  passport.authenticate(
    "local",
    // {
    //   successRedirect: "/",
    //   failureRedirect: "/signin",
    //   failureFlash: true,
    // },
    (err, user, info) => {
      if (err) {
        console.log("Error:", err);
        return next(err);
      }
      if (!user) {
        console.log("User not found: ", info.message);
        return res.status(400).json({ error: "Invalid email or password" });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.log("Login error:", err);
          return next(err);
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );
        console.log("Logged in successfully");
        return res
          .status(200)
          .json({ message: "Logged in successfully", token });
      });
    }
  )(req, res, next);
};

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/signin",
});

exports.signout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    res.clearCookie("token");

    res.clearCookie("connect.sid"); // Replace 'connect.sid' with the name of your session cookie

    req.flash("success_msg", "You are logged out");
    res.status(200).json({ message: "Logged out successfully" });
  });
};
