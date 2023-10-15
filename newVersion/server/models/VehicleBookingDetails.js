module.exports = (sequelize, DataTypes) => {
    const VehicleBookingDetails = sequelize.define("vehicle_booking_detail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reservedDate: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    });
        VehicleBookingDetails.associate = (models) => {
          VehicleBookingDetails.belongsTo(models.vehicle); 
        
        
           
        };
    return VehicleBookingDetails;
};