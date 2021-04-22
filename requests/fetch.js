const fetch = require('node-fetch');

const configRequests = require('./configRequests');

async function fetchCity(params) {
    const url = new URL(configRequests.url);

    url.searchParams.append('appid', configRequests.apiKey);
    url.searchParams.append('units', 'metric');

    for (const param in params) {
        if (params.hasOwnProperty(param)) {
            url.searchParams.append(param, params[param]);
        }
    }

    let data = await fetch(url);
    if (data.status === 200) {
        return await data.json();
    }
}

async function fetchCityByCoords(lat, lon) {
    return fetchCity({lat:lat, lon:lon})
}

async function fetchCityByName(name) {
    return fetchCity({q: name});
}

module.exports = {
    fetchCityByCoords, fetchCityByName
};