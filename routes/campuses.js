const router = require('express').Router();
const { Campus } = require('../db').models;

router.get('/', (req, res, next) => {
    Campus.findAll()
        .then(campuses => res.send(campuses))
        .catch(next);
});

router.post('/', (req, res, next) => {
    if (req.body.imageURL === '') req.body.imageURL = '../vendor/images/upennasdefault.jpg'
    Campus.create(req.body)
        .then(campus => res.send(campus))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Campus.findById(req.params.id)
        .then(campus => {
            Object.assign(campus, req.body)
            return campus.save()
        })
        .then( campus => res.send(campus))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Campus.findById(req.params.id)
        .then(campus => campus.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});

module.exports = router;