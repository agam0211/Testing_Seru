const sequelize = require("sequelize");

const db = new sequelize("erd", "root",  "", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;