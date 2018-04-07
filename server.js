// BACKEND (in server.js)

//1. Require
const express = require('express');
const app = express();
const path = require('path');

const db = require('./db');

app.use(require('body-parser').json());

//2. dist and vendor
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'images/campuses')));
//3. sendFile
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

//4. Routes
app.use('/api/campuses', require('./routes/campuses'));
app.use('/api/students', require('./routes/students'));

//5. Error
app.use((err, req, res, next) => {
    res.status(500).send(err);
});

//6. Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

//7. Sync and Seed
db.sync()
    .then( () => console.log (' *** db sync *** '))
    .then( () => db.seed())
    .then( () => console.log('### db.seeded ###'));

