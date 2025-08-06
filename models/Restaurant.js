const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Restaurant = sequelize.define('Restaurant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [5,10],
                    msg: "Phone number min lenght is 5 and max lenght is 10 digits"
                }
            }
        },
        open_hour: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [5,10],
                    msg: "Phone number min lenght is 5 and max lenght is 10 digits"
                },
                 is: {
                    args: /^([01]\d|2[0-3]):([0-5]\d)$/, // 24 hour format
                    msg: "Invalid open hour format. Use HH:mm instead (e.g, 08:30 o 23:45)."
                }
            }
        },
        close_hour: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [5,10],
                    msg: "Phone number min lenght is 5 and max lenght is 10 digits"
                },
                 is: {
                    args: /^([01]\d|2[0-3]):([0-5]\d)$/, // 24 hour format
                    msg: "Invalid open hour format. Use HH:mm instead (e.g, 08:30 o 23:45)."
                }
            }
        },
        language_code: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [3,3],
                    msg: "Invalid language code lenght"
                },
                isIn: {
                    args: [["ESP", "ENG"]],
                    msg: "Invalid language code."
                }
            }
        } 
    } , {
        tableName: 'restaurants',
        timestamps: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // paranoid will handle soft delete (if entity does not have a deleted_at will be considered active for most calls)
        deletedAt: 'deleted_at',
        paranoid: true,
    });

    /*Restaurant.associate = (models) => {
        Restaurant.hasOne(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });
    
    };*/

    return Restaurant;
}