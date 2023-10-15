const sequelize = require('../config/seqConfig');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const Vehicles = require('../models/Vehicles')(sequelize, DataTypes);
const validator = require('validator');