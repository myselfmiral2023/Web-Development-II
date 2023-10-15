const sequelize = require('../config/seqConfig');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const Reviews = require('../models/Reviews')(sequelize, DataTypes);
const validator = require('validator');