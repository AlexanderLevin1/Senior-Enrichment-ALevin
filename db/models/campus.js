const Sequelize = require('sequelize');
const conn = require('../conn');

const Campus = conn.define('campus', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
          }
    },
    imageURL: {
        type: Sequelize.STRING,
        isUrl: true,
        defaultValue: 'vendor/upennasdefault.jpg'
    },
    description: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
        defaultValue: ''
    }
}
);

module.exports = Campus;