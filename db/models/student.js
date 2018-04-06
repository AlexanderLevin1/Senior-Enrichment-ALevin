const Sequelize = require('sequelize');

const conn = require('../conn');

const Student = conn.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
    },
    imageURL:{
        type: Sequelize.STRING,
        defaultValue: '/images/default-photo.jpg'
    },
    gpa: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, {
        getterMethods: {
            fullName() {
                return this.firstName + ' ' + this.lastName
            }
        }
    }
);

module.exports = Student;