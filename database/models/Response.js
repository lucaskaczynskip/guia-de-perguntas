const Sequelize = require("sequelize");
const connection = require("../database");

const Response = connection.define("responses", 
  {
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    questionId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
);

Response.sync({ force: false });

module.exports = Response;