const router = require('express').Router();
const { Student } = require('../db').models;

router.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
});


router.post('/:id', (req, res, next) => {
    if (req.body.imageURL === '') req.body.imageURL ='../vendor/images/emptyImage.png'
    Student.create(req.body)
        .then(student => res.send(student))
        .catch(next);
});


router.put('/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => {
            Object.assign(student, req.body)
            return student.save();
        })
        .then(student => res.send(student))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
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

module.exports = router;