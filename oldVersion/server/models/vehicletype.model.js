import { sql } from "../config/db.js";

// Constructor
const VehicleType = function (vehicletype) {
  this.id = vehicletype.id;
  this.typename = vehicletype.typename;
  this.year = vehicletype.year;
  this.img = vehicletype.img;
  this.createdAt = vehicletype.createdAt;
};

// Create a vehicle type
VehicleType.create = (newVehicleType, result) => {
  sql.query("INSERT INTO vehicletype SET ?", newVehicleType, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vehicle type: ", { id: res.insertId, ...newVehicleType });
    result(null, { id: res.insertId, ...newVehicleType });
  });
};

// Return one vehicle type by id
VehicleType.findById = (id, result) => {
  // FIXME: prevent SQL injection
  sql.query(`SELECT * FROM vehicletype WHERE deletedAt IS NULL and id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vehicle type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found VehicleType with the id
    result({ kind: "not_found" }, null);
  });
};

// Return all vehicle types
VehicleType.getAll = (typename, year, result) => {
    let query = "SELECT * FROM vehicletype WHERE deletedAt IS NULL";

  if (typename) {
    query += ` and typename = '${typename}'`;
  } else if (year) {
    query += `and year = '${year}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("vehicle types: ", res);
    result(null, res);
  });
};

// Update a vehicle type
VehicleType.updateById = (id, vehicletype, result) => {
  vehicletype.updatedAt = new Date();
  sql.query(
    "UPDATE vehicletype SET typename = ?, year = ?, img = ?, updatedAt = ? WHERE id = ?",
    [vehicletype.typename, vehicletype.year, vehicletype.img, vehicletype.updatedAt, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found vehicle type with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vehicle type: ", { id: id, ...vehicletype });
      result(null, { id: id, ...vehicletype });
    }
  );
};

// Delete a vehicle type
VehicleType.remove = (id, result) => {
  var query =  `UPDATE vehicletype
  SET deletedAt = ?
  WHERE id = ?`;
  sql.query(query, [new Date(), id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found vehicle type with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vehicle type with id: ", id);
    result(null, res);
  });
};

export { VehicleType };
