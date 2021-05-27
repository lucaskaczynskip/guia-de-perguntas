const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "1212113", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;