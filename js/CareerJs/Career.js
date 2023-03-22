
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

let pdfUrl;
// submit handler
careerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(careerForm)
    formData.delete('Photo');
    const payload = Object.fromEntries(formData)

    console.log(payload)



    fetch(`https://qstartup-server.vercel.app/career`, {
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

