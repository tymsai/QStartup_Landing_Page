

console.log('Admins edit connected')

// get query parameters from url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString)
let email = urlParams.get('email')
console.log(email)



// get search form
const searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const searchEmil = event.target.searchEmil.value;
    console.log(searchEmil)
    loadMentorOrStartup(searchEmil)
})




const startupName = document.querySelector('#startupName')
const startupForm = document.querySelector('.startupForm')
const mentorform = document.querySelector('.form')


// loading user data by email
const loadMentorOrStartup = (email) => {
    console.log('function run and email', email)
    fetch(`http://localhost:5000/user?email=${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0]?.data)

            if (data[0]?.role === 'startUp') {

                startupForm.style.display = 'block'

                for (const prop in data[0].data) {

                    const formField = document.getElementsByName(prop)[0];

                    console.log(formField, prop)
                    if (formField) {
                        formField.value = data[0].data[prop];
                    }
                }



            } else if (data[0]?.role === 'mentor') {

                mentorform.style.display = 'block'
                for (const prop in data[0].data) {

                    const formField = document.getElementsByName(prop)[0];

                    console.log(formField, prop)
                    if (formField) {
                        formField.value = data[0].data[prop];
                    }
                }
            }

        })
        .catch(error => console.log(error))
}


// calling the function if email available in query
if (email) {
    loadMentorOrStartup(email)
}

