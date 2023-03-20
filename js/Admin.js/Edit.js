console.log('Admins edit connected')

// get query parameters from url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString)
let email = urlParams.get('email')

// get search form
// const searchForm = document.querySelector('#searchForm')
// console.log(searchForm)


const startupName = document.querySelector('#startupName')
const startupForm = document.querySelector('.startupForm')
const mentorform = document.querySelector('.Mentorform')
console.log(email)
const loadMentorOrStartup = (email) => {
    console.log(email)
    fetch(`http://localhost:5000/user?email=${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].data.startupName)
            if (data[0].data.role === 'startUp') {
                // mentorform.remove()
                startupForm.style.display = 'block'

                startupName.value = data[0].data.startupName


            } else if (data[0].data.role === 'mentor') {
                // startupForm.remove()
                mentorform.style.display = 'block'
            }



        })
        .catch(error => console.log(error))
}
loadMentorOrStartup(email)

// Get a reference to the radio buttons
var redRadio = document.querySelector('input[value="red"]');
var greenRadio = document.querySelector('input[value="green"]');

// Check the red radio button dynamically
