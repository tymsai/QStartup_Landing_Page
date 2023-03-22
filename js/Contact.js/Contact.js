console.log('contact js connected')



// onsubmit of login form
document.getElementById('contactForm').onsubmit = ((event) => {
    event.preventDefault()

    console.log('clicked')

    const form = event.target
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const information = {
        email, subject, message
    }
    console.log(information)



    fetch("https://qstartup-server.vercel.app/contact", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(information)
    })
        .then(res => res.json())
        .then(data => {

            console.log(data)
            // form.reset()
        })
        .catch(error => { console.log(error) })






})

const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user)
