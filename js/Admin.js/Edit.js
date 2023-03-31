

console.log('Admins edit connected')

// get query parameters from url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString)
let id = urlParams.get('id')
console.log(id)



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


// loading user data by id
const loadMentorOrStartup = (id) => {
    console.log('function run and id', id)
    // fetch(`https://qstartupserver.onrender.com/user?id=${id}`)
    fetch(`http://localhost:5000/user?id=${id}`)
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

// ---startup edit __________


const imgbbKey = 'a95a8e5bfa79deda8fe4df67e21b4f26';
const fileInput = document.querySelector('#sturtupFile');


// get the currently signed in user
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user)

// set default value of mentor name and email;
document.getElementById('startupUserEmail').value = user.email
document.getElementById('username').value = user.username;




// collect image url 
let imageurl;

// submit handler
startupForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(startupForm)
    formData.delete('Photo');
    const payload = Object.fromEntries(formData)
    console.log(payload)


    const startupData = { role: 'startUp', ...payload, imageurl }

    console.log(imageurl, startupData)

    // data save to database
    fetch(`http://localhost:5000/EditUser?id=${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(startupData)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Toastify({
                text: data.message
                ,
                className: "info",
                position: 'center',
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();

        })


});

// image upload by onchange set the url to let imageurl; at the top of submithandler
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // image url set to top of onsubmit handler
            imageurl = data.data.url;
        })
        .catch(error => {
            console.error(error);

        });
});




// mentor Edit function


console.log('registration js connected')
const form = document.querySelector('.form');

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// set default value of mentor name and email;
document.getElementById('mentorEmail').value = currentUser.email
document.getElementById('username').value = currentUser.username;

let photUrl;



form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    formData.delete('Photo');
    const payload = Object.fromEntries(formData)
    const mentor = { ...payload, 'imageurl': photUrl, role: "mentor" }



    fetch(`http://localhost:5000/EditUser?id=${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Toastify({
                text: data.message
                ,
                className: "info",
                position: 'center',
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();

            // localStorage.setItem('currentUser', JSON.stringify(data))
        })


});

const imageFile = document.querySelector('input[type="file"]');

imageFile.addEventListener('change', () => {

    const imgbbKey = 'a95a8e5bfa79deda8fe4df67e21b4f26';


    const file = imageFile.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            photUrl = data.data.url;
        })
        .catch(error => {
            console.error(error);

        });
});





// calling the function if id available in query
if (id) {
    loadMentorOrStartup(id)
}

