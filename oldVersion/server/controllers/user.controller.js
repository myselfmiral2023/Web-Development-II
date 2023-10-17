import dotenv from 'dotenv';
dotenv.config({ path: '../.env'})
console.log("USERCONTROLLER env variable test:" + process.env.JWT_KEY)
// controllers/userController.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from 'validator';

export const register = (req, res) => {
  // console.log("registration request reached server")

  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  if(!validator.isEmail(email)){
    return res.status(400).json({
          error: "Invalid email address",
        });
  }




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
    // console.log("request reached find by email")
    if (err) return res.status(500).json(err);
    if (user) return res.status(409).json("User already exists!");

    // Create a User
    var user = new User({
      email: req.body.email,
      fullname:req.body.fullname,
      password: req.body.password,
      role: 'user'
  });

    // Create a new user
    User.createUser(user, (err) => {
      // console.log("request reacheds createUser")
      
      if (err) return res.status(500).json(err);
      return res.status(201).json({message: "User has been created."});
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

    other.token = token; //need to access token on the front-end

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

export const findAll = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");

  // jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
  //     if (err) return res.status(403).json("Token is not valid!");

      
      User.getAll((err, data) => {
          if (err) {
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving Users."
              });
          } else {
              res.json(data);
          }
      });
  }
//   );
// };
