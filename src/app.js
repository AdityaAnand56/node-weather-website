const path = require('path')//used to process the path 
const express = require('express')
const hbs = require('hbs')//getting handlebar 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)//current directory
//console.log(__filename)//current file name
//console.log(path.join(__dirname, '../public'))
const app = express()
//In order to run this app on heroku we have to give different port than 3000 i.e for heroku it will be process.env.PORT which means getting port from env = environment variable
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partilasPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
//set dynamic handlebar
app.set('view engine', 'hbs')//get the dynamic content using hbs
app.set('views', viewspath)//setting views renamed value templates as views
hbs.registerPartials(partilasPath)//register partials by path
//Setup static directory to serve
//way to customize the server
app.use(express.static(publicDirectoryPath))//show root page in public folder

//use hbs rendering views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Anand'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Aditya Anand'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'This is my help text.',
        title: 'Help',
        name: 'Aditya Anand'
    })
})

//Renamed the views to templates


//send response when user access root
/*
app.get('', (req, res) => {
    //sending back html
    res.send('<h1>Weather</h1>')
})*/
/*
app.get('/help', (req, res) => {
    //sending back json or array
res.send([{
    name: 'Aditya',
    age: 27
}, {
name: 'Pallavi',
age: 25
}])
})*/
/*
app.get('/about', (req, res) => {
    //res.send('/About page')
    res.send(path.join(__dirname, '../public/about.html'))
})*/

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({ error })//used shorthand error: error as error has same name
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


/*
    res.send({
        forecast: 'It is snowing',
        location: 'New York',
        address: req.query.address
    })*/
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
    prooducts:[]
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya Anand',
        errorMessage: 'Help article not found.'
    })
})

//This is used to route when no match / is found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya Anand',
        errorMessage: '404 Page not found.'
    })
})
//app.com 
//app.com/help
//app.com/about
//how to setupto which page user will go using app.get('')

//start the server up

app.listen(port, () => {//In order to run this app on heroku we have to give different port than 3000 i.e for heroku it will be process.env.PORT which means getting port from env = environment variable
    console.log('Server is up on port ' + port)
})