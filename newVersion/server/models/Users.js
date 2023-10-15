const bcrypt = require('bcrypt');
const sequelize = require('../config/seqConfig')


module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
             set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
        },
        isLoyalty: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        reward: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        },
    });
    Users.associate = (models) => {
        Users.hasMany(models.review);
      
        Users.hasMany(models.vehicle_booking);
      };
  return Users;

    
};