module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("review", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comments: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        stars: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        }
    });
        Reviews.associate = (models) => {
          Reviews.belongsTo(models.user); 
        
        
          Reviews.belongsTo(models.vehicle_booking); 
        };
    return Reviews;
};