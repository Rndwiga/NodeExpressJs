const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:'mariadb', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialectOptions: {
        timezone: 'Etc/GMT-3',
      },
      pool: {
        max: 5, //maximum number of connection in pool
        min: 0, //minimum number of connection in pool
        acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
      }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require("./user.model")(sequelize, Sequelize);
db.roleModel = require("./role.model")(sequelize, Sequelize);

db.roleModel.belongsToMany(db.userModel, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.userModel.belongsToMany(db.roleModel, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["retailer", "supplier", "manufacturer","admin","root"];

db.initializeRoles = function(){
  db.ROLES.forEach((item, index)=>{
      db.roleModel.create({
        name: item
      });
  })
}


module.exports = db;