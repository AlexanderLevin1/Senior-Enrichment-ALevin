// BACKEND (in server.js)

//1. Require
const express = require('express');
const path = require('path');
const app = express();

app.use(require('body-parser').json());

//2. dist
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//3. sendFile
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

//4. getStudents, create student, update student, delete student
app.get('/api/students', (req, res, next)=> {
  Student.findAll()
    .then( students => res.send(students))
    .catch(next);
});

app.get('/api/campuses', (req, res, next)=> {
    Campus.findAll()
      .then( campuses => res.send(campuses))
      .catch(next);
  });

app.post('/api/students', (req, res, next)=> {
    Student.create(req.body)
      .then( student => res.send(student))
      .catch(next);
  });

app.put('/api/students/:id', (req, res, next)=> {
  Student.findById(req.params.id)
    .then( student => {
      Object.assign(student, req.body)
      return student.save();
    })
    .then( student => res.send(student))
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next)=> {
  Student.findById(req.params.id)
    .then( student => {
      return student.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

//5. Port, sequelize, model & sync and seed
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/crud_db');

const Student = conn.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

conn.sync({ force: true })
  .then( ()=> Promise.all([
    User.create({ name: 'Monet Painter' }),
    User.create({ name: 'Larry Elison' }),
  ]));