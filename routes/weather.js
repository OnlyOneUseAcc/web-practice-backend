const asyncHandler = require('express-async-handler');
const fetch = require('../requests/fetch');
let express = require('express');
let router = express.Router();

router.get("/coordinates", asyncHandler(async (req, res) => {
    const {lat, lon} = req.query;

    const response = await fetch.fetchCityByCoords(lat, lon);
    if (response == null) {
        res.status(404).send();
        return null;
    }
    res.send(response);
}));

router.get("/city", asyncHandler(async (req, res) => {
    const name = req.query.q;

    const response = await fetch.fetchCityByName(name);
    if (response == null) {
        res.status(404).send();
        return null;
    }
    res.send(response);
}));

module.exports = router;