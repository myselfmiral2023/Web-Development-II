import { sql } from "../config/db.js";

// Constructor
const Review = function (review) {
  this.userid = review.userid;
  this.bookingid = review.bookingid;
  this.comments = review.comments;
  this.stars = review.stars;
  this.createdAt = review.createdAt;
  this.updatedAt = review.updatedAt;
};

// Create a review
Review.create = (newReview, result) => {
  sql.query("INSERT INTO reviews SET ?", newReview, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created review: ", { id: res.insertId, ...newReview });
    result(null, { id: res.insertId, ...newReview });
  });
};

// Return one review by id
Review.findById = (id, result) => {
  // FIXME: prevent SQL injection
  sql.query(`SELECT * FROM reviews WHERE deletedAt IS NULL AND id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Review with the id
    result({ kind: "not_found" }, null);
  });
};

// Return all reviews
Review.getAll = (userid, bookingid, result) => {
  let query = "SELECT * FROM reviews WHERE deletedAt IS NULL";

  if (userid) {
    query = `SELECT * FROM reviews WHERE deletedAt IS NULL AND userid = '${userid}'`;
  } else if (bookingid) {
    query = `SELECT * FROM reviews WHERE deletedAt IS NULL AND bookingid = '${bookingid}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("reviews: ", res);
    result(null, res);
  });
};
Review.getAllExpanded = (userid, bookingid, vehicleid, result) => {
  let query = `SELECT reviews.id, reviews.createdAt, reviews.comments, reviews.stars, users.id AS userid,  users.fullname, vehicle.id AS vehicleid,  vehicle.name, vehiclebooking.id AS bookingid, vehiclebooking.startdate AS bookingstart, vehiclebooking.enddate AS bookingend, vehiclebooking.uuid
  FROM reviews
  INNER JOIN users ON reviews.userid=users.id
  INNER JOIN vehiclebooking ON reviews.bookingid=vehiclebooking.id
  INNER JOIN vehicle ON vehiclebooking.vehicleid=vehicle.id`;

  if (userid) {
    query += ` WHERE users.id = '${userid}'`;
  } else if (bookingid) {
    query += ` WHERE vehiclebooking.id = '${bookingid}'`;
  }
   else if (vehicleid) {
    query += ` WHERE vehicle.id = '${vehicleid}'`;
  }

  if (!userid && !bookingid && !vehicleid){
    query += ` WHERE reviews.deletedAt IS NULL`;
  }else {
    query += ` AND reviews.deletedAt IS NULL`;
  }

  query += ` ORDER BY reviews.createdAt DESC`

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("reviews: ", res);
    result(null, res);
  });
};

//reviews find with username
Review.findAllWithName = (result) => {
  let query = `SELECT reviews.comments, reviews.stars, users.fullname
  FROM reviews 
  INNER JOIN users ON reviews.userid=users.id
   WHERE reviews.deletedAt IS NULL`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("reviews: ", res);
    result(null, res);
  });
};

// Update a review
Review.updateById = (id, review, result) => {
  review.updatedAt = new Date();
  sql.query(
    "UPDATE reviews SET userid = ?, bookingid = ?, comments = ?, stars = ?, updatedAt = ? WHERE id = ?",
    [review.userid, review.bookingid, review.comments, review.stars, review.updatedAt, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found review with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated review: ", { id: id, ...review });
      result(null, { id: id, ...review });
    }
  );
};

// Delete a review
Review.remove = (id, result) => {
  var query = `UPDATE reviews
  SET deletedAt = ?
  WHERE id = ?`
  
  sql.query(query, [new Date(), id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found review with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted review with id: ", id);
    result(null, res);
  });
};

export { Review };
