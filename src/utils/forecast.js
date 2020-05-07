const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f38386b2782b4faebabd534883361c0f&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body)
            callback(undefined, body.location.name + ', ' + body.location.region + ' ' + body.location.country + ': It is currently ' + body.current.temperature + ' degress out. There is a ' + (body.current.precip * 10) + '% chance of rain.')
        }
    })
}

module.exports = forecast