console.log('home js connected')

const subscribeEmail = document.getElementById('subscribeEmail')
const subscribeButton = document.getElementById('subscribeButton')

subscribeButton.addEventListener('click', () => {
    const email = subscribeEmail.value;
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
        })
        .catch(error => console.log(error))

    console.log(email)
})