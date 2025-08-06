const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/Database'); 

const User = require('./user')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);
const Restaurant = require('./Restaurant')(sequelize, DataTypes);

// Asociations for each table


User.associate = (models) => {
        User.hasMany(models.Restaurant, {
            foreignKey: 'user_id',
            as: 'restaurant'
        });
    };

Restaurant.associate = (models) => {
        Restaurant.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

/*User.associate = (models) => {
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
    };*/

// !! All models must be integrated in order to associate them
const db = {
  sequelize,
  Sequelize,
  User,
  Role,
  Restaurant
};


//if (User.associate) User.associate(db);
//if (Restaurant.associate) Restaurant.associate(db);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;