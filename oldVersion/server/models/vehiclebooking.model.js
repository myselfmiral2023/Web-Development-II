import { sql } from "../config/db.js";

// Constructor
const VehicleBooking = function (booking) {
  this.userid = booking.userid;
  this.vehicleid = booking.vehicleid;
  this.startdate = booking.startdate;
  this.enddate = booking.enddate;
  this.bookingdate = booking.bookingdate;
  this.cost = booking.cost;
  this.uuid = booking.uuid;
  this.createdAt = booking.createdAt;
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
 

  sql.query(`SELECT vehiclebooking.id AS bookingid, vehiclebooking.userid, vehicle.name, vehiclebooking.startdate, vehiclebooking.enddate, vehiclebooking.bookingdate, vehiclebooking.cost, vehiclebooking.uuid
  FROM vehiclebooking
  INNER JOIN vehicle ON vehiclebooking.vehicleid=vehicle.id
  WHERE vehiclebooking.id = ? AND vehiclebooking.deletedAt is NULL`, [id], (err, res) => {
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
  let query = `SELECT vehiclebooking.id, vehiclebooking.userid, users.fullname, vehicle.id AS vehicleid, vehicle.name, vehiclebooking.startdate, vehiclebooking.enddate, vehiclebooking.bookingdate, vehiclebooking.cost, vehiclebooking.uuid
  FROM vehiclebooking
  INNER JOIN vehicle ON vehiclebooking.vehicleid=vehicle.id
  INNER JOIN users ON vehiclebooking.userid=users.id`;

   // FIXME: prevent SQL injection
  if (userid) {
    query += ` WHERE userid = '${userid}' AND vehiclebooking.deletedAt is NULL`;
  } else if (vehicleid) {
    query += ` WHERE vehicleid = '${vehicleid}' AND vehiclebooking.deletedAt is NULL`;
  }

  query += ` ORDER BY bookingdate DESC`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("vehicle bookings: ", res);
    result(null, res);
  });
};

// Update a vehicle booking
VehicleBooking.updateById = (id, booking, result) => {
  var updatedAt = new Date();
  sql.query(
    "UPDATE vehiclebooking SET userid = ?, vehicleid = ?, startdate = ?, enddate = ?, bookingdate = ?, cost = ?, updatedAt = ? WHERE id = ?",
    [booking.userid, booking.vehicleid, booking.startdate, booking.enddate, booking.bookingdate, booking.cost, updatedAt, id],
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
  var query =    `UPDATE vehiclebooking
  SET deletedAt = ?
  WHERE id = ?`;
  var deletedAt = new Date();
  sql.query(query, [deletedAt, id], (err, res) => {
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
