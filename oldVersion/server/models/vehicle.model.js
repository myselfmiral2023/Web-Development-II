import { sql } from "../config/db.js";

// Constructor
const Vehicle = function (vehicle) {
  this.name = vehicle.name,
    this.company = vehicle.company,
    this.perdayrent = vehicle.perdayrent,
    this.vehicletypeid = vehicle.vehicletypeid
};

// Create a vehicle
Vehicle.create = (newVehicle, result) => {
  sql.query("INSERT INTO vehicle SET ?", newVehicle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vehicle: ", { id: res.insertId, ...newVehicle });
    result(null, { id: res.insertId, ...newVehicle });
  });
};

// Return one vehicle by id
Vehicle.findById = (id, result) => {
  // FIXME: prevent SQL injection
  sql.query(`SELECT * FROM vehicle WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vehicle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Vehicle with the id
    result({ kind: "not_found" }, null);
  });
};

// Return all vehicles
Vehicle.getAll = (vehicletype, result) => {
  let query = "SELECT * FROM vehicle";

  // Check if vehicletype is provided in the request body
  if (vehicletype) {
    query += ` WHERE vehicletypeid = '${vehicletype}'`; // Assuming 'vehicletype' is the column name in your database
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};


// Return all vehicles
Vehicle.getAllAvailable = (startDate, endDate, result) => {
  // Check if startDate and endDate are provided and are in the correct format
  if (!startDate || !endDate || !isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).json({ error: 'Invalid date parameters' });
  }

  // Check if endDate is after startDate
  if (new Date(endDate) <= new Date(startDate)) {
    return res.status(400).json({ error: 'End date must be after start date' });
  }
  let query = `SELECT *
  FROM Vehicle
  WHERE id NOT IN (
      SELECT DISTINCT V.id
      FROM Vehicle V
      LEFT JOIN VehicleBooking VB ON V.id = VB.vehicleid
      WHERE (VB.startdate BETWEEN ? AND ?)
     OR (VB.enddate BETWEEN ? AND ?))`;

  sql.query(query, [startDate, endDate, startDate, endDate], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

function isValidDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

// Update a vehicle
Vehicle.updateById = (id, vehicle, result) => {
  sql.query(
    "UPDATE vehicle SET name = ?, company = ?, perdayrent = ?, vehicletypeid = ? WHERE id = ?",
    [vehicle.name, vehicle.company, vehicle.perdayrent, vehicle.vehicletypeid, id],
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

      console.log("updated vehicle: ", { id: id, ...vehicle });
      result(null, { id: id, ...vehicle });
    }
  );
};

// Delete a vehicle
Vehicle.remove = (id, result) => {
  sql.query("DELETE FROM vehicle WHERE id = ?", id, (err, res) => {
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

    console.log("deleted vehicle with id: ", id);
    result(null, res);
  });
};

//module.exports = Vehicle;
//module.exports = Vehicle;
export { Vehicle };
