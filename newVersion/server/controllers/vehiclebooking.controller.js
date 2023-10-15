const sequelize = require('../config/seqConfig');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const VehicleBookings = require('../models/VehicleBookings')(sequelize, DataTypes);
const validator = require('validator');