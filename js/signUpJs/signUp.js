console.log('js connected')

// signUp Onsubmit function
document.getElementById('form').onsubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmPassword.value;

    const createdUser = {
        username,
        email,
        password,
        confirmpassword,


    }

    console.log(createdUser)


    // saveUserToDatabase
    fetch(`https://qstartupserver.onrender.com/signup`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(createdUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (!data.token) {
                Toastify({
                    text: data.message,
                    className: "info",
                    position: 'center',
                    style: {
                        background: "linear-gradient(to right, #FF0000, #FF0000)",
                        font: 'bold'


                    },

                }).showToast();
            }
            if (data.token) {
                localStorage.setItem('currentUser', JSON.stringify(data))
                Toastify({
                    text: data.message + '  ' + 'as' + "  " + data.username,
                    className: "info",
                    position: 'center',
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
                form.reset()
                window.location.href = '/registration.html'
            }
        })

        .catch((error) => {

            console.log(error)
        });



}




const loginBtn = document.getElementById("login")

const logoutBtn = document.getElementById("logout")
const accessToken = localStorage.getItem('accessToken')
const LocalCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
const email = localStorage.getItem('email')
console.log(LocalCurrentUser)



// logout function
const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/login.html'

}

// conditional rendering of login and logout button
if (LocalCurrentUser?.token) {
    logoutBtn.innerHTML = `<a  class="nav-item nav-link cursor-pointer" id="login">Logout</a>`

} else {
    loginBtn.innerHTML = `<a  class="nav-item nav-link cursor-pointer" id="login">Login</a>`
}

logoutBtn.addEventListener('click', handleLogout);



const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('currentUser', currentUser)

