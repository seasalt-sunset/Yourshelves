module.exports = (sequelize, DataTypes) => {
    const giochi_inCorso = sequelize.define("giochi_inCorso", {
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
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

        
    })
    
    return giochi_inCorso;  
    }