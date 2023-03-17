const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define(
"users",
{
    name: {type: Sequelize.STRING},
    is_admin: {type: Sequelize.STRING},

}, 
{
    freezeTableName:true
}
);

module.exports = User;