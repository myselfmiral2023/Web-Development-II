const sequelize = require('../config/seqConfig');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const VehicleTypes = require('../models/VehicleTypes')(sequelize, DataTypes);
const validator = require('validator');