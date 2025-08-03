const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/Database'); 

const User = require('./user')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);

// Asociations for each table
User.associate = (models) => {
        User.hasOne(models.Role, {
            foreignKey: 'user_id',
            as: 'role'
        });
    };

Role.associate = (models) => {
        Role.hasOne(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

const db = {
  sequelize,
  Sequelize,
  User,
  Role
};

if (User.associate) User.associate(db);
if (Role.associate) Role.associate(db);

module.exports = db;