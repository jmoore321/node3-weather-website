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
    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})