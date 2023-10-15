module.exports = (sequelize, DataTypes) => {
    const VehicleTypes = sequelize.define("vehicle_type", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typeName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
    });
    VehicleTypes.associate = (models) => {
        VehicleTypes.hasMany(models.vehicle); 
        
        
           
        };
    return VehicleTypes;
};