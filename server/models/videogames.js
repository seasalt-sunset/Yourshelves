module.exports = (sequelize, DataTypes) => {
    const videogames = sequelize.define("videogames", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        released: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tba: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        },
        background_image: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        }
    })
    
    return videogames;  
    }


