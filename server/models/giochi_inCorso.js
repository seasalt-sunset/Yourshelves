module.exports = (sequelize, DataTypes) => {
    const giochi_inCorso = sequelize.define("giochi_inCorso", {
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'videogames',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        },
        ownership: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        physical_digital: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            unique: false
        }
    });
    
    giochi_inCorso.associate = (models) => {
        giochi_inCorso.belongsTo(models.users, { foreignKey: "userId" });
        giochi_inCorso.belongsTo(models.videogames, { foreignKey: "gameId" });
    };
    
    return giochi_inCorso;  
}