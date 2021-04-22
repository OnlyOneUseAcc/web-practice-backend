const fetch = require('../requests/fetch');
const asyncHandler = require('express-async-handler');
const getFavoriteCityModel = require('../schema');
let express = require('express');
let router = express.Router();

let favoriteCity;

function init (mongoose) {
    favoriteCity = getFavoriteCityModel(mongoose);
}

router.get("/", asyncHandler (async (req, res) => {
    let cities = await favoriteCity.find().exec();

    let arr = [];

    cities.forEach(data => arr.push(data.name));

    res.send({cities: arr})
}));

router.post("/",asyncHandler (async (req, res) => {
    const name = req.query.q;

    let data = await fetch.fetchCityByName(name);

    if (data == null) {
        res.status(404).send();
        return;
    }

    let isConsist = await favoriteCity.findOne({name: data.name}).exec();

    if (isConsist !== null) {
        res.status(409).send();
        return;
    }

    new favoriteCity({name: data.name}).save();
    res.status(201).send(data);
}));

router.delete("/",asyncHandler (async (req, res) => {
    const name = req.query.q;

    const removeCity = await favoriteCity.findOneAndRemove({name: name});
    if (removeCity === null) {
        res.status(404).send();
        return;
    }

    res.status(204).send();
}));


module.exports = {
    router, init
}