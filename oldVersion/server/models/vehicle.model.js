import { sql } from "../config/db.js";

// Constructor
const Vehicle = function (vehicle) {
  this.name = vehicle.name,
    this.company = vehicle.company,
    this.perdayrent = vehicle.perdayrent,
    this.vehicletypeid = vehicle.vehicletypeid,
    this.createdAt = vehicle.createdAt
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
  sql.query(`SELECT * FROM vehicle WHERE deletedAt IS NULL AND id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found vehicle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Vehicle with the id
    result({ kind: "not_found" }, null);
  });
};

// Return all vehicles
Vehicle.getAll = (vehicletype, result) => {
  let query = `SELECT vehicle.id, vehicle.name, vehicle.company, vehicle.perdayrent, vehicletype.typename, vehicletype.year, vehicle.createdAt
  FROM vehicle
  INNER JOIN vehicletype ON vehicle.vehicletypeid=vehicletype.id`;

  // Check if vehicletype is provided in the request body
  if (vehicletype) {
    query += ` WHERE vehicletype.typename = '${vehicletype}' AND vehicle.deletedAt IS NULL`; // Assuming 'vehicletype' is the column name in your database
  } else {
    query += ` WHERE vehicle.deletedAt IS NULL`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("vehicles: ", res);
    result(null, res);
  });
};


// Return all vehicles
Vehicle.getAllAvailable = (startDate, endDate, result) => {
  // Check if startDate and endDate are provided and are in the correct format
  if (!startDate || !endDate || !isValidDate(startDate) || !isValidDate(endDate)) {
    return result({ error: 'Invalid date parameters' });
  }
  // Check if endDate is after startDate
  if (new Date(endDate) < new Date(startDate)) {
    return result({ error: 'End date must be after start date' });
  }
  let query = `SELECT *
  FROM Vehicle
  WHERE  deletedAt IS NULL AND id NOT IN (
      SELECT DISTINCT V.id
      FROM Vehicle V
      LEFT JOIN VehicleBooking VB ON V.id = VB.vehicleid
      WHERE (VB.startdate BETWEEN ? AND ?)
     OR (VB.enddate BETWEEN ? AND ?))`;


     console.log(query);

  sql.query(query, [startDate, endDate, startDate, endDate], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("vehicles: ", res);
    result(null, res);
  });
};

function isValidDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}


Vehicle.findOneAvailable = (startDate, endDate, id, result) => {
  if (!startDate || !endDate || !isValidDate(startDate) || !isValidDate(endDate)) {
    return result({ error: 'Invalid date parameters' });
  }
  if (!id) {
    return result ({ error: 'No id provided' })
  }
  // Check if endDate is after startDate
  if (new Date(endDate) < new Date(startDate)) {
    return result({ error: 'End date must be after start date' });
  }
  let query = `SELECT *
  FROM (
      SELECT *
      FROM Vehicle
      WHERE id NOT IN (
          SELECT DISTINCT V.id
          FROM Vehicle V
          LEFT JOIN VehicleBooking VB ON V.id = VB.vehicleid
          WHERE (VB.startdate BETWEEN ? AND ?)
          OR (VB.enddate BETWEEN ? AND ?)
      )
  ) AS AvailableVehicles
  WHERE id = ?
  AND deletedAt IS NULL;`;

  sql.query(query, [startDate, endDate, startDate, endDate, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicle searched for: ", res);
    result(null, res);
  });
};


// Update a vehicle
Vehicle.updateById = (id, vehicle, result) => {
  var updatedAt = new Date();
  sql.query(
    "UPDATE vehicle SET name = ?, company = ?, perdayrent = ?, vehicletypeid = ?, updatedAt = ? WHERE id = ?",
    [vehicle.name, vehicle.company, vehicle.perdayrent, vehicle.vehicletypeid, updatedAt, id],
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
  var query = `UPDATE vehicle
  SET deletedAt = ?
  WHERE id = ?`;
  sql.query(query, [new Date(),id], (err, res) => {
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
