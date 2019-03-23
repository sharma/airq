'use strict'
const axios = require('axios')

function main() {
  if (process.argv.length < 3) {
    console.log('No location provided.')
  }

  var locate = 'https://www.mapquestapi.com/geocoding/v1/address?key=KlV3D6Vwk5vzqwAmGp2ZKjdCeYK4BNGe&location='

  // Appends args with spaces into the URL
  for (let j = 2; j < process.argv.length; j++) {
    locate += process.argv[j]
    if(process.argv[j + 1])
      locate += ' '
  }
  geocode(locate)
}

function geocode(locate) {
  axios.get(locate)
    .then(function (response) {
      var lat = response.data.results[0].locations[0].latLng.lat
      var long = response.data.results[0].locations[0].latLng.lng
      console.log('Lat: ' + lat + ' Long: ' + long)
      aqius(lat, long)
  })
}

function aqius(lat, long) {
  var geocode = 'https://api.airvisual.com/v2/nearest_city?lat=' + lat + '&lon=' + long + '&key=iEjc5mYrzP4qLpdws'
  axios.get(geocode)
    .then(function(response) {
      console.log('Air quality index (AQIUS): ' + response.data.data.current.pollution.aqius)
    })
}

main()