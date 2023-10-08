import express from "express";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("Connected!");
});
