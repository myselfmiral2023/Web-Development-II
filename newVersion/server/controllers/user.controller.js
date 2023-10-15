const sequelize = require('../config/seqConfig');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const Users = require('../models/Users')(sequelize, DataTypes);
const validator = require('validator');


module.exports = {

        createUser: async (req, res) => {
            try {
                const user = req.body;
                const newUser = await Users.create(user);
                res.status(201).json(newUser);
            } catch (error) {
                console.log(error);
                res.status(500).json({error: error.errors[0].message})
            }
        },

        findUser: async (req, res) => {
            try {
                const email = req.body.email;
                const response = await Users.findAll({where: {email: email}});
                res.json(response);
              } catch (error) {
                console.log(error);
              }
        },



}