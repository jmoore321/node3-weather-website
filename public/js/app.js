console.log('client side js file loaded')
// form for client-side js

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// run code when submit form using an event listener

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    // console.log(location)
    const url = 'http://api.weatherstack.com/current?access_key=f38386b2782b4faebabd534883361c0f&query=' + location + '&units=f'
    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                return messageTwo.textContent = 'The weather in ' + data.location.name + ', ' + data.location.region +' is ' + data.current.temperature + '°F (feels like ' + data.current.feelslike + '°F)' 
            }
            messageOne.textContent = 'An Error was detected. Error # ' + data.error.code + '.' + data.error.info
        })
    })
})
