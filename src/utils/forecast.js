const request = require('postman-request')
//goal: use destructuring and property shorthand
const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=24127a4bca1fe970811eab9fc6a1aa13&query=' + latitude + ',' + longitude + '&units=f'
//descruturing response as this is object
request({url, json:true}, (error, { body }) => {
    if(error){
        callback('Unable to get the weather details!', undefined)
    }else if(body.error){
        callback('Unable to find location', undefined)
    }else{
        callback(undefined, 'It is currently '+body.current.temperature + " degress out. It feels like " + body.current.feelslike + "."+ " Humidity is "+body.current.humidity+ "%.")
    }
})
}


module.exports = forecast