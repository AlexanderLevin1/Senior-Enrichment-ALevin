const Sequelize = require('sequelize');

const conn = require('../conn');

const Student = conn.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue: '/images/default-photo.jpg'
    },
    gpa: {
        type: Sequelize.FLOAT,
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