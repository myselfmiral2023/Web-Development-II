import { sql } from "../config/db.js";

// Constructor
const VehicleBooking = function (booking) {
  this.userid = booking.userid;
  this.vehicleid = booking.vehicleid;
  this.startdate = booking.startdate;
  this.enddate = booking.enddate;
  this.bookingdate = booking.bookingdate;
  this.cost = booking.cost;
};

// Create a vehicle booking
VehicleBooking.create = (newBooking, result) => {
  sql.query("INSERT INTO vehiclebooking SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vehicle booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
  });
};

// Return one vehicle booking by id
VehicleBooking.findById = (id, result) => {
  // FIXME: prevent SQL injection
  sql.query(`SELECT * FROM vehiclebooking WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vehicle booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found VehicleBooking with the id
    result({ kind: "not_found" }, null);
  });
};

// Return all vehicle bookings
VehicleBooking.getAll = (userid, vehicleid, result) => {
  let query = "SELECT * FROM vehiclebooking ";

  if (userid) {
    query += ` WHERE userid = '${userid}'`;
  } else if (vehicleid) {
    query += `WHERE vehicleid = '${vehicleid}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicle bookings: ", res);
    result(null, res);
  });
};

// Update a vehicle booking
VehicleBooking.updateById = (id, booking, result) => {
  sql.query(
    "UPDATE vehiclebooking SET userid = ?, vehicleid = ?, startdate = ?, enddate = ?, bookingdate = ?, cost = ? WHERE id = ?",
    [booking.userid, booking.vehicleid, booking.startdate, booking.enddate, booking.bookingdate, booking.cost, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found vehicle booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vehicle booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
    }
  );
};

// Delete a vehicle booking
VehicleBooking.remove = (id, result) => {
  sql.query("DELETE FROM vehiclebooking WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found vehicle booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vehicle booking with id: ", id);
    result(null, res);
  });
};

export { VehicleBooking };
