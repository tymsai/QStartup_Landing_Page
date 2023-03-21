console.log('Forget pass js connected')




// onsubmit of login form
document.getElementById('ResetForm').onsubmit = ((event) => {
    event.preventDefault()

    const form = event.target
    const email = form.email.value;






    fetch("https://qstartup-server.vercel.app/sendResetLinkEmail", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            form.reset()
        })
        .catch(error => { console.log(error) })




}




)
// onsubmit end.




// forget password function emplement
// const handleResetPassword = () => {
//     const email = document.getElementById('email').value;
//     if (!email) {
//         alert('please enter email')
//         return
//     } else if (email) {
//         console.log('reset clicked')



//         fetch("https://qstartup-server.vercel.app/sendResetLinkEmail", {
//             method: "POST",
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(email)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//             })
//             .catch(error => { console.log(error) })




//     }

// }
// // forget password button and eventlistener
// const resetbtn = document.getElementById('resetPass')

// resetbtn.addEventListener('click', handleResetPassword)
// console.log('login clicked')


const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user)
