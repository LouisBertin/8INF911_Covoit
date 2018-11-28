const config = require('../../config/config')
const axios = require('axios');

module.exports = {
    // get place data with coordinates
    placeData: async function (lng, lat) {
        const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=` + config.mapboxToken)
        return response.data.features[0];
    },
    // get place data with coordinates
    directionDistance: async function ([latStart, lngStart], [latEnd, lngEnd]) {
        const response = await axios(`https://api.mapbox.com/directions/v5/mapbox/walking/${lngStart},${latStart};${lngEnd},${latEnd}?access_token=` + config.mapboxToken)
        return response.data.routes[0].distance;
    }
}