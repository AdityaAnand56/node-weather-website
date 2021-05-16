const request = require('postman-request')

const geocode = (address, callback) => {//encodeURIComponent is used because sometime user can search with some special charater that is parse not as a string 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRpdHlhYW5hbmQiLCJhIjoiY2tiNHp2azR1MGttbTJ5cGIwOHNscWhsYiJ9.dRAS7fNFw2OeqUE03KINCQ&limit=1'
    //goal: use destructuring and property shorthand
    //descruturing response as this is object
    request({ url, json: true}, (error, { body }) => {
        if(error){
            //instead of logging the error here we will pass it to geocode
            callback('Unable to connect to locaiton services!', undefined)
        } else if (body.features.length === 0) {
             callback('Unable to find location. Try another search.', undefined)   
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode