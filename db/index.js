const conn = require('./conn');
const Campus = require('./models/campus');
const Student = require('./models/student');

const faker = require('faker');
const avatar = require('cartoon-avatar');

Student.belongsTo(Campus);

const campusPhotos = ['../vendor/Cam.jpg', '../vendor/Ox.jpg', '../vendor/apple-campus.jpg', '../vendor/1trade.jpg', ]

const sync = () => {
    return conn.sync({ force: true })
}

const generateStudent = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        gpa: Math.round((Math.random() * 3) * 100) / 100 + 1,
        imageURL: avatar.generate_avatar()
    }
}

const generateCampus = () => {
    return {
        name: faker.address.city(),
        description: faker.lorem.paragraph(),
        imageURL: campusPhotos[(Math.floor(Math.random() * 4))]
    }
}

const seed = () => {
    return Promise.all([
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Student.create(generateStudent()),
      Campus.create(generateCampus()),
      Campus.create(generateCampus()),
      Campus.create(generateCampus()),
      Campus.create(generateCampus())
    ])
    .then(([s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, c1, c2, c3, c4]) => {
      s1.setCampus(c1)
      s2.setCampus(c1)
      s3.setCampus(c2)
      s4.setCampus(c2)
      s5.setCampus(c3)
      s6.setCampus(c3)
      s7.setCampus(c4)
      s8.setCampus(c4)
      s9.setCampus(c4)
      s10.setCampus(c4)
    })
  };

module.exports = {
    conn,
    sync,
    seed,
    models: {
        Campus,
        Student
    }
};

// Campus.hasMany(Student, {
//     onDelete: 'cascade',
//     hooks: true
// });

// const precisionRound = (number, precision) => {
//     var factor = Math.pow(10, precision);
//     return (Math.round(number * factor) / factor )
// }