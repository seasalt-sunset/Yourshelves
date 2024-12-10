module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    })
    users.associate = (models) => {
        users.hasMany(models.giochi_inCorso, {foreignKey: "userId"});
        models.giochi_inCorso.belongsTo(users, {foreignKey: "userId"});
    }
    return users;  
    }