module.exports = (sequelize, DataTypes) => {
    const VehicleBookings = sequelize.define("vehicle_booking", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        bookingDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        
    });
    VehicleBookings.associate = (models) => {
        VehicleBookings.hasMany(models.review);
      
        VehicleBookings.belongsTo(models.user);

        VehicleBookings.belongsTo(models.vehicle);
      };
  return VehicleBookings;

    
};