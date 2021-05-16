console.log('Client side javascript file is loaded!')
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {/* fetch api is javascript api not from node its a io operation and return promise hence then is used
    response.json().then((data) => {
console.log(data)
    })
})*/


/*
fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {//here then is used means that once json run then we will get the data object
        if(data.error){
            console.log(data.error)
        } else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
*/
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()


    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {//here then is used means that once json run then we will get the data object
        if(data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})