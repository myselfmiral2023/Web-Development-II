// models/user.js
import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";

// constructor
const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.fullname = user.fullname;
    this.role = user.role;
};

  User.findByEmail = (email, result) => {
    const q = "SELECT * FROM users WHERE email = ?";
    sql.query(q, [email], (err, data) => {
      if (err) return result(err);
      result(null, data[0] || null);
    });
  }

 User.createUser = (user, result) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    //const q = "INSERT INTO users (`email`, `password`) VALUES (?)";
    const q = "INSERT INTO users SET ?";
    //const values = [user.email, hash];
    user.password = hash;

    sql.query(q, user, (err) => {
      if (err) return result(err);
      result(null);
    });
  }


export default User;
