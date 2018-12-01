const config = require('../../config/config')
const axios = require('axios');

module.exports = {
    // get place data with coordinates
    placeData: async function (lng, lat) {
        const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=` + config.mapboxToken)
        return response.data.features[0]
    }
}