const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
         name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'roles',
        timestamps: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })

    Role.associate = (models) => {
    Role.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

    
  return Role; 
}