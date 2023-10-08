import mysql from "mysql"

export const db = mysql.createConnection({
  host:"fsd08carbooking.mysql.database.azure.com",
  user:"carbookingadmin",
  password: "Admin#2222",
  database:"carrental"
});

// Open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the carrental database");
});
