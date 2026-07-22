const express = require("express");
const authRoutes = express.Router();
const authSchema = require("../model/authModel");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

authRoutes.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login",
    isLoggedIn: req.session?.isLoggedIn || false,
    errors: [],
    oldInput: {},
  });
});

authRoutes.post(
  "/login",

  [
    check("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Enter valid email"),

    check("password").notEmpty().withMessage("Password is required"),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("login", {
          pageTitle: "Login",
          errors: errors.array(),
          oldInput: req.body,
          isLoggedIn: req.session?.isLoggedIn || false,
        });
      }

      const { email, password } = req.body;

      const user = await authSchema.findOne({
        email: email.trim(),
      });

      if (!user) {
        return res.render("login", {
          pageTitle: "Login",
          errors: [
            {
              msg: "User not found",
            },
          ],
          oldInput: req.body,
          isLoggedIn: false,
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.render("login", {
          pageTitle: "Login",
          errors: [
            {
              msg: "Wrong password",
            },
          ],
          oldInput: req.body,
          isLoggedIn: false,
        });
      }

      req.session.user = {
        userId: user._id,
        email: user.email,
      };

      req.session.isLoggedIn = true;
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).send("Login Failed");
    }
  },
);

authRoutes.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

authRoutes.get("/signup", (req, res) => {
  res.render("SignUp", {
    pageTitle: "SignUp",
    isLoggedIn: req.session?.isLoggedIn || false,
    errors: [],
    oldInput: {},
  });
});

authRoutes.post(
  "/signup",

  [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 2 })
      .withMessage("Name must contain atleast 2 characters")
      .bail()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Name should contain only alphabets"),

    check("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),

    check("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Username must contain atleast 3 characters"),

    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password must be 8 characters")
      .bail()
      .matches(/[A-Z]/)
      .withMessage("Need one uppercase letter")
      .bail()
      .matches(/[a-z]/)
      .withMessage("Need one lowercase letter")
      .bail()
      .matches(/[0-9]/)
      .withMessage("Need one number")
      .bail()
      .matches(/[@#$%^&*()]/)
      .withMessage("Need one special symbol"),

    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match");
      }

      return true;
    }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("SignUp", {
          pageTitle: "SignUp",

          errors: errors.array(),

          oldInput: req.body,

          isLoggedIn: false,
        });
      }

      const { name, email, username, password } = req.body;

      const existingUser = await authSchema.findOne({
        $or: [
          {
            email,
          },

          {
            username,
          },
        ],
      });

      if (existingUser) {
        return res.render("SignUp", {
          pageTitle: "SignUp",

          errors: [
            {
              msg: "User already exists",
            },
          ],

          oldInput: req.body,

          isLoggedIn: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await authSchema.create({
        name,
        email,
        username,
        password: hashedPassword,
      });

      res.redirect("/login");
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal Server Error");
    }
  },
);

module.exports = authRoutes;
