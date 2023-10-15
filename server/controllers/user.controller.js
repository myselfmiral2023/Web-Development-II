import dotenv from 'dotenv';
dotenv.config({ path: '../.env'})
console.log("USERCONTROLLER env variable test:" + process.env.JWT_KEY)
// controllers/userController.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from 'validator';

export const register = (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;



  // Validate Email
  // var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(String(req.body.email).toLowerCase())) {
  //   return res.status(400).json({
  //     error: "Invalid email address",
  //   });
  // }

  // Validate password length
  // if (req.body.password.length < 6 || req.body.password.length > 50) {
  //   return res.status(409).json({
  //     message: "Password must be 6-50 characters",
  //   });
  // }

  // Check existing user
  User.findByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).json(err);
    if (user) return res.status(409).json("User already exists!");

    // Create a auction
    var user = new User({
      email: req.body.email,
      fullname:req.body.fullname,
      password: req.body.password,
      role: req.body.role
  });

    // Create a new user
    User.createUser(user, (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // Check user
  User.findByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json("User not found!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
    //const token = "";
    const { password, ...other } = user;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  }).status(200).json("User has been logged out.");
};

export const getAll = (req, res) => {
  
}
