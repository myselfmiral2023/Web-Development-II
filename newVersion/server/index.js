const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8079;
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require('./config/seqConfig');
const userRoutes = require('./routes/user.router');


app.use(express.json());

app.use(cors({  // important for front end, as you enter new api call methods, add them to the methods 
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST",], // add here
    credentials: true
  }));

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);






const db = require('./models');

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is now listening on ${PORT}`);
  });
});