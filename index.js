const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const { PORT, DB_CONNECTION_STRING } = require('./constants');
const furnitureController = require('./controllers/furnitureController');
const usersController = require('./controllers/usersController');
const auth = require('./middlewares/auth');

start();

async function start() {
    await new Promise((resolve, reject) => {
        mongoose.connect(DB_CONNECTION_STRING);

        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Database connected!');
            resolve();
        });
        db.on('error', (err) => reject(err));
    })

    const app = express();

    app.use(cors());
    app.use(auth());
    app.use(express.json());

    app.use('/data/catalog', furnitureController);
    app.use('/users', usersController);

    app.get('/', (req, res) => {
        res.send('It works!');
    });

    app.listen(PORT, () => console.log(`REST Service is running on port ${PORT}...`));
}