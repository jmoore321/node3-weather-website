// core module
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// npm modules
const express = require('express')

const hbs = require('hbs')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs') // adjusts express web server settings
app.set('views', viewsPath)  // sets the folder for views
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bob'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jeff Moore'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Section',
        name: 'Andrew',
        message: 'This is where you would find technical help.'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// app.get('/help' , (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Us</h1><p>This will have information about the test site</p>')
// })

app.get('/weather', (req, res) => {
    // res.send('<h1>Get the Local Weather</h1>')

    if (!req.query.address) {
        return res.send({
            error:'You must provide a search city.'
        })
    }

    geocode( req.query.address, (error, {latitude, longitude, location} = {}) => { // set default of emptyt object to empty
        if (error) {
            return console.log(error)
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            
            res.send({
                location: location, 
                data: forecastData,
                latitude: latitude,
                longitude: longitude
            })

        })
    })

    // console.log(req.query)
    // res.send({
    //     location: 'Philadlephia',
    //     temperature: 72,
    //     wind_speed: 5,
    //     wind_dir: 'SSE',
    //     region: 'Pennsylvania',
    //     latitude: -75,
    //     longitude: 47,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// app.com 
// app.com/help
// app.com/about

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Help Not Found',
        err_msg: 'Help Article Not Found.'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404 Error Page',
        err_msg: 'Page Not Found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) // port number to respond to requests