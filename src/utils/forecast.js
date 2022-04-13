const request = require('request')

const forecast = (latitude, longitude,address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fa9769c8a467857dbe7a21b3638b8b7e&query=${latitude},${longitude}` //&units=f    f=faranheit, m=celcius, s=kelvin
    request({ 'url':url, json: true }, (error, res) => { 
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, res.body.current.weather_descriptions[0]+'. Its currently '+res.body.current.temperature+' degree out and '+res.body.current.precip+'% chance of rain in '+address)
        }
    })
}

module.exports = forecast