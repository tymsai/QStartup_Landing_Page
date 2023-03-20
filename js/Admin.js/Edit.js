console.log('Admins edit connected')

let queryString = window.location.search;

let urlParams = new URLSearchParams(queryString)

let id = urlParams.get('id')

const startupName = document.querySelector('#startupName')

const startupForm = document.querySelector('.startupForm')
const mentorform = document.querySelector('.Mentorform')
console.log(id)
const loadMentorOrStartup = (id) => {
    console.log(id)
    fetch(`http://localhost:5000/user?id=${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].data.startupName)
            if (data[0].data.role === 'startUp') {
                mentorform.remove()


                startupName.value = data[0].data.startupName









            }
            // startupForm.remove()


        })
        .catch(error => console.log(error))
}
loadMentorOrStartup(id)

// Get a reference to the radio buttons
var redRadio = document.querySelector('input[value="red"]');
var greenRadio = document.querySelector('input[value="green"]');

// Check the red radio button dynamically
