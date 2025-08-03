const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('myMenu', 'postgres', 'admin', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  //schema: 'seguridad',
});

module.exports = sequelize;
/*const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('../models/User')(sequelize, DataTypes);
module.exports = sequelize;*/