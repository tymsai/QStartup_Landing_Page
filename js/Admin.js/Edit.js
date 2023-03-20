

console.log('Admins edit connected')

// get query parameters from url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString)
let email = urlParams.get('email')



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
const mentorform = document.querySelector('.Mentorform')
console.log(email)
// loading user data by email
const loadMentorOrStartup = (email) => {
    console.log('function run', email)
    fetch(`http://localhost:5000/user?email=${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0]?.data)
            if (data[0]?.data?.role === 'startUp') {

                startupForm.style.display = 'block'
                // startupName.value = data[0]?.data?.startupName
                for (const prop in data[0].data) {
                    // const formField = document.querySelector(`#${prop}`);
                    const formField = document.getElementsByName(prop)[0];
                    // const formField = document.querySelector(`input[name="${prop}"]`);
                    console.log(formField, prop)
                    if (formField) {
                        formField.value = data[0].data[prop];
                    }
                }

                const email = document.querySelector(`input[name="email"]`);
                email.value = 'email'

            } else if (data[0]?.data?.role === 'mentor') {

                mentorform.style.display = 'block'
            }

        })
        .catch(error => console.log(error))
}


// calling the function if email available in query
if (email) {

    loadMentorOrStartup(email)
}

