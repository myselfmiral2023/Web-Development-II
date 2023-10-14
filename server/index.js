// still may need to add express-session package ??

import dotenv from 'dotenv';
dotenv.config({ path: '../.env'})
console.log(process.env.PORT)
console.log("INDEX env variable test:" + process.env.JWT_KEY)
import bodyParser from 'body-parser'
import cors from 'cors'
import express from "express";
import userRoutes from "./routes/user.js";
import vehicleRoutes from "./routes/vehicle.js";
import reviewRoutes from "./routes/review.js";
import vbookingdetailRoutes from "./routes/vbookingdetail.js";
import vehiclebookingRoutes from "./routes/vehiclebooking.js";
import vehicletypeRoutes from "./routes/vehicletype.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8080;


const app = express();

app.use(express.json());

app.use(cors({  // important for front end, as you enter new api call methods, add them to the methods 
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST",], // ad here
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/user", userRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/vbookingdetail", vbookingdetailRoutes); //create files
app.use("/api/vehiclebooking", vehiclebookingRoutes);
app.use("/api/vehicletype", vehicletypeRoutes);


// app.use("/api/vehicle", vehicleRoutes);
// app.use("/api/vehicle", vehicleRoutes);


app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
