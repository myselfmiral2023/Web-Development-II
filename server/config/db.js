import mysql from "mysql2"

export const sql = mysql.createConnection({
  host:"fsd08carbooking.mysql.database.azure.com",
  user:"carbookingadmin",
  password: "Admin#2222",
  database:"carrental"
});

// Open the MySQL connection
sql.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the carrental database");
});

