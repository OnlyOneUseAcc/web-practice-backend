const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const cities = require('./routes/cities');
const weather = require("./routes/weather");

const app = express();
app.use(cors());
app.options('*', cors());

mongoose.set('useCreateIndex', true);
//const user = process.env.MONGO_USER;
//const password = process.env.MONGO_PASSWORD;
const user = "kozlov";
const password = "1234567890";

const mongooseURL =
    `mongodb+srv://${user}:${password}@mycluster.4fb6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

async function start() {
    let dataBase = await mongoose.connect(mongooseURL, {useUnifiedTopology: true, useNewUrlParser: true,
        useFindAndModify: false});

    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use("/weather", weather);

    cities.init(dataBase);
    app.use('/favorites', cities.router);

    app.listen(PORT, () => {
        console.log('Сервер работает...');
    });
}

start();