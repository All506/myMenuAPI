const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
        const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: 'users',
        timestamps: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
    
    );

     User.associate = (models) => {
    User.hasOne(models.Role, {
      foreignKey: 'user_id',
      as: 'role'
    });
  };

  return User;
    
}