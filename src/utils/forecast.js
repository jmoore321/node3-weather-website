const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f38386b2782b4faebabd534883361c0f&query=' + longitude + ',' + latitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
            callback(undefined, body.location.name + ', ' + body.location.region + ' ' + body.current.temperature + '°F. Winds are blowing ' + body.current.wind_speed + ' from the ' + body.current.wind_dir)
        }
    })
}

module.exports = forecast