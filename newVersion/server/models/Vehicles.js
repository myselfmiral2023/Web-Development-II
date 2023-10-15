module.exports = (sequelize, DataTypes) => {
    const Vehicles = sequelize.define("vehicle", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        company: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        perDayRent: {
            type: DataTypes.DECIMAL(10,0),
            defaultValue: null
        },
    });
        Vehicles.associate = (models) => {
          Vehicles.hasMany(models.vehicle_booking); 
          
          
          Vehicles.hasMany(models.vehicle_booking_detail); 

          Vehicles.belongsTo(models.vehicle_type); 
        
        };
    return Vehicles;
};