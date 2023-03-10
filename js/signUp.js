console.log('js connected')


document.getElementById('form').onsubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmPassword.value;

    const user = {
        username, email, password, confirmpassword
    }

    console.log(user)
    saveUserToDatabase(user)
        .then(data => {
            console.log(data)
            localStorage.setItem('accessToken', data.token);

        })
        .catch(error => console.log(error))

}

const saveUserToDatabase = async (user) => {
    const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data;
}

const loginBtn = document.getElementById("login")
const logoutBtn = document.getElementById("logout")
const accessToken = localStorage.getItem('accessToken')
console.log(accessToken)
if (accessToken) {
    loginBtn.innerHTML = `<a onClick="handleLogout()" class="nav-item nav-link" id="login">Logout</a>`
}
else {
    logoutBtn.innerHTML = `<a onClick="handleLogout()" class="nav-item nav-link" id="login">Login</a>`
}

const handleLogout = () => {
    localStorage.removeItem('accessToken')
    console.log('clicked')
}