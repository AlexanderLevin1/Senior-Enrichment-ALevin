const Sequelize = require('sequelize');
const databaseURI = process.env.DATABASE_URL || 'postgres://localhost/crud_db';

const conn = new Sequelize(databaseURI, {
    define: {
      timestamps: false,
      underscored: true
    },
    logging: false
  });
  
  module.exports = conn;
