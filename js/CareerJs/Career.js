
console.log('career js connected')

const careerForm = document.querySelector('.careerForm');
console.log(careerForm)
const imgbbKey = 'a95a8e5bfa79deda8fe4df67e21b4f26';
const fileInput = document.querySelector('#sturtupFile');


// get the currently signed in user
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user)

// set default value of mentor name and email;
// document.getElementById('startupUserEmail').value = user.email
// document.getElementById('username').value = user.username;




// collect image url 
let imageurl;

// submit handler
careerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(careerForm)
    formData.delete('Photo');
    const payload = Object.fromEntries(formData)
    console.log(payload)
    // const startupData = { role: 'startUp', ...payload, imageurl }


    fetch(`http://localhost:5000/career`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })


});

// image upload by onchange set the url to let imageurl; at the top of submithandler
// fileInput.addEventListener('change', () => {
//     const file = fileInput.files[0];
//     const formData = new FormData();
//     formData.append('image', file);

//     fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             // image url set to top of onsubmit handler
//             imageurl = data.data.url;
//         })
//         .catch(error => {
//             console.error(error);

//         });
// });