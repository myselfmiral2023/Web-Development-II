import express from "express";
import userRoutes from "./routes/user.js";
import vehicleRoutes from "./routes/vehicle.js";
// import reviewRoutes from "./routes/review.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoutes);
app.use("/api/vehicle", vehicleRoutes);
// app.use("/api/review", reviewRoutes);

// app.use("/api/vehicle", vehicleRoutes);
// app.use("/api/vehicle", vehicleRoutes);


app.listen(8080, () => {
  console.log("Connected!");
});
