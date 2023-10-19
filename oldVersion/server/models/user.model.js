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
  User.findById = (id, result) => {

    const q = "SELECT * FROM users WHERE id = ?";
    sql.query(q, [id], (err, data) => {
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

//   User.getAll = (users, result) => {
//     try {
//       const query = "SELECT * FROM users";
//       sql.query(q, (err, data) => {
//         if(err) return result(err)
//       })
//     } catch (error) {
      
//     }
//   }

User.getAll = (result) => {
  let query = "SELECT * FROM users";

 
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  
  sql.query(
    "UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?",
    [user.fullname, user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found vehicle with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};



User.remove = (id, result) => {

  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found vehicle with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
}



export default User;
