import { sql } from "../config/db.js";

// Constructor
const Review = function (review) {
  this.userid = review.userid;
  this.bookingid = review.bookingid;
  this.comments = review.comments;
  this.stars = review.stars;
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
  sql.query(`SELECT * FROM reviews WHERE id = ${id}`, (err, res) => {
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
    let query = "SELECT * FROM reviews";

    if (userid) {
        query += ` WHERE userid = '${userid}'`;
    } else if (bookingid) {
        query += ` WHERE bookingid = '${bookingid}'`;
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

// Update a review
Review.updateById = (id, review, result) => {
  sql.query(
    "UPDATE reviews SET userid = ?, bookingid = ?, comments = ?, stars = ? WHERE id = ?",
    [review.userid, review.bookingid, review.comments, review.stars, id],
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
  sql.query("DELETE FROM reviews WHERE id = ?", id, (err, res) => {
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
