
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



    fetch(`https://qstartupserver.onrender.com/registration`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status === 200) {
                console.log(data.data.id)
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                delete currentUser.password

                let newCurrentUser = { ...currentUser, id: data.data.id, role: data.data.role }


                localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));

                window.location.href = '/userPanel/mentorPanel/index.html'

            }

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
