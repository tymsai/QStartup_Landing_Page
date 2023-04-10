console.log('home js connected')

console.log('cookie', document.cookie)

const subscribeEmail = document.getElementById('subscribeEmail')
const subscribeForm = document.getElementById('subscribeForm')

subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const email = subscribeEmail.value;
    console.log(email)
    // fetch('https://qstartupserver.onrender.com/api/subscribe', {
    fetch('http://localhost:5000/api/subscribe', {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Toastify({
                text: data.message,
                className: "info",
                position: 'center',
                style: {
                    background: data.success === true ? "linear-gradient(to right, #00b09b, #96c93d)" : 'red',
                },
            }).showToast();
            if (data.success = true) {
                subscribeForm.reset()
            }
        })
        .catch(error => console.log(error))

    console.log(email)
})