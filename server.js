// BACKEND (in server.js)

//1. Require
const express = require('express');
const path = require('path');
const app = express();

const { Campus, Student } = require('./db/models');

app.use(require('body-parser').json());

//2. dist
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//3. sendFile
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

//4. getStudents, create student, update student, delete student
app.get('/api/students', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
});

app.get('/api/campuses', (req, res, next) => {
    Campus.findAll()
        .then(campuses => res.send(campuses))
        .catch(next);
});

app.post('/api/campuses/:id/students', (req, res, next) => {
    Student.create({ campusId: req.params.id })
        .then(student => res.send(student))
        .catch(next);
});

app.post('/api/campuses', (req, res, next) => {
    Campus.create({})
        .then(campus => res.send(campus))
        .catch(next);
});

app.put('/api/students/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => {
            Object.assign(student, req.body)
            return student.save();
        })
        .then(student => res.send(student))
        .catch(next);
});

app.delete('/api/campuses/:id', (req, res, next) => {
    Campus.findById(req.params.id)
        .then(campus => {
            return Promis.all([
                campus.destroy(),
                Student.destroy({
                    where:
                        { campusId: campus.id }
                })
            ])
        })
        .then(() => res.sendStatus(204))
        .catch(next);
});

app.delete('/api/campuses/:campusId/students/:id', (req, res, next) => {
    Student.findOne({
        where: {
            campusId: req.params.campusId,
            id: req.params.id
        }
    })
        .then(student => {
            return student.destroy();
        })
        .then(() => res.sendStatus(204))
        .catch(next);
});

app.use((err, req, res, next) => {
    res.status(500).send(err);
});

//5. Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

