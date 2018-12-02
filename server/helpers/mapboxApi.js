const config = require('../../config/config')
const axios = require('axios');

module.exports = {
    // get place data with coordinates
    placeData: async function (lng, lat) {
        try {
            const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=` + config.mapboxToken)
            return response.data.features[0];
        } catch (e) {
            console.log(e.response.data)
        }
    },
    // get place data with coordinates
    directionDistance: async function ([latStart, lngStart], [latEnd, lngEnd]) {
        try {
            const response = await axios(`https://api.mapbox.com/directions/v5/mapbox/walking/${lngStart},${latStart};${lngEnd},${latEnd}?access_token=` + config.mapboxToken)
            return response.data.routes[0].distance;
        } catch (e) {
            console.log(e.response)
        }
    }
}